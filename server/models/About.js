const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  quickFacts: [{
    icon: String,
    label: String,
    value: String
  }],
  visionItems: [{
    icon: String,
    title: String,
    description: String
  }],
  coreValues: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('About', aboutSchema);