const mongoose = require('mongoose');

const applicationSettingsSchema = new mongoose.Schema({
  applicationsEnabled: {
    type: Boolean,
    default: true
  },
  maxApplicationsPerUser: {
    type: Number,
    default: 5,
    min: 1,
    max: 50
  },
  applicationReviewRequired: {
    type: Boolean,
    default: true
  },
  defaultApplicationStatus: {
    type: String,
    enum: ['Draft', 'Pending', 'Approved'],
    default: 'Pending'
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

// Ensure there's only one settings document
applicationSettingsSchema.statics.getSettings = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = new this();
    await settings.save();
  }
  return settings;
};

// Add a pre-save hook to update the updatedAt field
applicationSettingsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('ApplicationSettings', applicationSettingsSchema);