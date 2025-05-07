// server/models/Detection.js
const mongoose = require('mongoose');

const DetectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  result: {
    type: String,
    required: true,
    enum: ['Real', 'SceneFake']
  },
  confidence: {
    type: Number,
    required: true
  },
  analysis: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Detection', DetectionSchema);