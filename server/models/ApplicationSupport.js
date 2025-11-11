const mongoose = require('mongoose');

const applicationSupportSchema = new mongoose.Schema({
  applicationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate support from same user or IP for same application
applicationSupportSchema.index({ applicationId: 1, userId: 1 }, { unique: true, sparse: true });
applicationSupportSchema.index({ applicationId: 1, ipAddress: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('ApplicationSupport', applicationSupportSchema);