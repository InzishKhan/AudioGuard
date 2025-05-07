import torch
import torch.nn.functional as F
import librosa
import numpy as np
import sys
import os

# Set device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Audio configuration
sr = 16000
n_fft = 512
hop_length = 256
n_mels = 128
max_length = 128
max_wave_length = 16000

# Resolve paths relative to script directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model", "best_model_trials.pth")
AUDIO_DIR = os.path.join(BASE_DIR, "audio_samples")

# Model class
class EnhancedASTModel(torch.nn.Module):
    def __init__(self, num_classes=2):
        super(EnhancedASTModel, self).__init__()
        self.spec_conv1 = torch.nn.Conv2d(1, 64, kernel_size=3, stride=1, padding=1)
        self.spec_bn1 = torch.nn.BatchNorm2d(64)
        self.spec_conv2 = torch.nn.Conv2d(64, 128, kernel_size=3, stride=1, padding=1)
        self.spec_bn2 = torch.nn.BatchNorm2d(128)
        self.spec_pool = torch.nn.MaxPool2d(2, 2)
        self.dropout = torch.nn.Dropout(0.5)

        self.wave_conv1 = torch.nn.Conv1d(1, 32, kernel_size=5, stride=2, padding=2)
        self.wave_bn1 = torch.nn.BatchNorm1d(32)
        self.wave_conv2 = torch.nn.Conv1d(32, 64, kernel_size=5, stride=2, padding=2)
        self.wave_bn2 = torch.nn.BatchNorm1d(64)

        self.projection = torch.nn.Linear(419840, 256)
        encoder_layer = torch.nn.TransformerEncoderLayer(d_model=256, nhead=8, dim_feedforward=1024, dropout=0.5, batch_first=True)
        self.transformer_encoder = torch.nn.TransformerEncoder(encoder_layer, num_layers=4)

        self.classifier = torch.nn.Sequential(
            torch.nn.Linear(256, 128),
            torch.nn.ReLU(),
            torch.nn.Dropout(0.5),
            torch.nn.Linear(128, num_classes)
        )

    def forward(self, spec, waveform):
        spec = spec.unsqueeze(1)
        spec = self.spec_pool(self.dropout(F.relu(self.spec_bn1(self.spec_conv1(spec)))))
        spec = self.spec_pool(self.dropout(F.relu(self.spec_bn2(self.spec_conv2(spec)))))
        spec = spec.view(spec.size(0), -1)

        waveform = waveform.unsqueeze(1)
        wave = F.relu(self.wave_bn1(self.wave_conv1(waveform)))
        wave = F.relu(self.wave_bn2(self.wave_conv2(wave)))
        wave = wave.view(wave.size(0), -1)

        x = torch.cat([spec, wave], dim=1)
        x = self.projection(x).unsqueeze(1)
        x = self.transformer_encoder(x)
        x = x.mean(dim=1)
        return self.classifier(x)

# Load model
model = EnhancedASTModel().to(device)
model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
model.eval()

# Process one audio file
def process_audio(file_path):
    audio, _ = librosa.load(file_path, sr=sr)

    if len(audio) < max_wave_length:
        audio = np.pad(audio, (0, max_wave_length - len(audio)), mode='constant')
    else:
        audio = audio[:max_wave_length]

    mel_spec = librosa.feature.melspectrogram(y=audio, sr=sr, n_fft=n_fft, hop_length=hop_length, n_mels=n_mels)
    mfcc = librosa.feature.mfcc(S=librosa.power_to_db(mel_spec), n_mfcc=80)
    spectral_centroid = librosa.feature.spectral_centroid(y=audio, sr=sr, n_fft=n_fft, hop_length=hop_length)

    features = np.vstack([mfcc, librosa.feature.delta(mfcc), spectral_centroid])
    if features.shape[1] < max_length:
        features = np.pad(features, ((0, 0), (0, max_length - features.shape[1])), mode='reflect')
    else:
        features = features[:, :max_length]

    features = (features - np.mean(features)) / (np.std(features) + 1e-7)

    spec_tensor = torch.tensor(features).float().unsqueeze(0).to(device)
    wave_tensor = torch.tensor(audio).float().unsqueeze(0).to(device)

    return spec_tensor, wave_tensor

# Run prediction
def predict(file_path):
    spec, wave = process_audio(file_path)
    with torch.no_grad():
        output = model(spec, wave)
        pred = torch.argmax(output, dim=1).item()
        confidence = torch.softmax(output, dim=1).squeeze()[pred].item()
        return pred, confidence

# MAIN
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python detect.py <audio_filename>")
        sys.exit(1)

    audio_filename = sys.argv[1]
    audio_path = os.path.join(AUDIO_DIR, audio_filename)

    if not os.path.exists(audio_path):
        print(f"Audio file not found: {audio_path}")
        sys.exit(1)

    prediction, confidence = predict(audio_path)
    label_map = {0: "REAL", 1: "FAKE"}
    print(f"Prediction: {label_map[prediction]} (Confidence: {confidence:.4f})")
