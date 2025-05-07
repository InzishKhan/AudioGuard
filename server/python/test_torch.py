import os
import torch
from model import EnhancedASTModel  # Import the class from model.py

# Get the absolute path to the model file
model_dir = os.path.join(os.path.dirname(__file__), "model")
model_path = os.path.join(model_dir, "best_model_trials.pth")

# Verify the path exists
print(f"Looking for model at: {model_path}")
print(f"File exists: {os.path.exists(model_path)}")  # Should print True

# Load the model
model = EnhancedASTModel()
model.load_state_dict(torch.load(model_path, map_location="cpu"))
print("Model loaded successfully!")
print(model)  # Shows the model's layers and parameters