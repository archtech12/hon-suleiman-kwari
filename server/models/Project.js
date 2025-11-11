const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Education', 'Infrastructure', 'Social Welfare', 'Economic Empowerment', 'Healthcare', 'Other']
  },
  imageUrl: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Planned', 'Ongoing', 'Completed', 'Cancelled'],
    default: 'Planned'
  },
  year: {
    type: String,
    required: true
  },
  priority: {
    type: Number,
    default: 0 // For sorting projects
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);