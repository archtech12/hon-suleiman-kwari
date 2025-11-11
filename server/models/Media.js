const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  url: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['image', 'video', 'document']
  },
  category: {
    type: String,
    required: true,
    enum: ['Stickers', 'Events', 'Projects', 'Achievements', 'Press', 'Other']
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Media', mediaSchema);