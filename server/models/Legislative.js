const mongoose = require('mongoose');

const legislativeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  bills: [{
    name: String,
    description: String,
    status: {
      type: String,
      enum: ['Proposed', 'In Committee', 'Passed', 'Rejected'],
      default: 'Proposed'
    }
  }],
  achievements: [{
    title: String,
    description: String,
    date: Date
  }],
  imageUrl: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Legislative', legislativeSchema);