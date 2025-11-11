const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
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
    enum: ['Infrastructure', 'Education', 'Healthcare', 'Social Welfare', 'Economic Empowerment', 'Other']
  },
  status: {
    type: String,
    enum: ['Draft', 'Pending', 'Approved', 'Rejected', 'Completed'],
    default: 'Draft'
  },
  priority: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  author: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  location: {
    type: String
  },
  images: [{
    type: String
  }],
  supportCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for searching applications
applicationSchema.index({ title: 'text', description: 'text' });
applicationSchema.index({ status: 1 });
applicationSchema.index({ category: 1 });
applicationSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Application', applicationSchema);