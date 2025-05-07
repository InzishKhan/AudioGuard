// server/routes/detection.js
const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { jsPDF } = require('jspdf');

// Configure file storage
const upload = multer({ dest: 'uploads/' });

router.post('/detect', upload.single('audio'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No audio file uploaded' });
    }

    const pythonProcess = spawn('python3', [
        path.join(__dirname, '../python/detect.py'),
        req.file.path
    ]);

    let result = '';
    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            return res.status(500).json({ error: 'Analysis failed' });
        }

        try {
            const analysis = JSON.parse(result);
            
            // Generate PDF Report
            const doc = new jsPDF();
            doc.setFontSize(16);
            doc.text('Audio Authenticity Report', 20, 20);
            
            // Add analysis results
            doc.setFontSize(12);
            doc.text(`Result: ${analysis.prediction} (${(analysis.confidence * 100).toFixed(1)}% confidence)`, 20, 40);
            doc.text('Analysis:', 20, 50);
            doc.text(analysis.explanation, 20, 60, { maxWidth: 170 });
            
            // Add waveform image if available
            if (analysis.waveform_img && fs.existsSync(analysis.waveform_img)) {
                doc.addPage();
                doc.text('Audio Waveform:', 20, 20);
                doc.addImage(analysis.waveform_img, 'PNG', 20, 30, 150, 80);
                fs.unlinkSync(analysis.waveform_img); // Cleanup
            }
            
            const pdfPath = path.join('reports', `${Date.now()}_report.pdf`);
            doc.save(pdfPath);
            
            res.json({
                ...analysis,
                pdfUrl: `/reports/${path.basename(pdfPath)}`
            });
            
        } catch (err) {
            res.status(500).json({ error: 'Result parsing failed' });
        }
    });
});