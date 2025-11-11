const ApplicationSettings = require('../models/ApplicationSettings');

// @desc    Get application settings
// @route   GET /api/application-settings
// @access  Public
const getApplicationSettings = async (req, res) => {
  try {
    const settings = await ApplicationSettings.getSettings();
    res.json(settings);
  } catch (error) {
    console.error('Get application settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update application settings
// @route   PUT /api/application-settings
// @access  Private/Admin
const updateApplicationSettings = async (req, res) => {
  try {
    const {
      applicationsEnabled,
      maxApplicationsPerUser,
      applicationReviewRequired,
      defaultApplicationStatus
    } = req.body;

    let settings = await ApplicationSettings.getSettings();
    
    settings.applicationsEnabled = applicationsEnabled !== undefined ? applicationsEnabled : settings.applicationsEnabled;
    settings.maxApplicationsPerUser = maxApplicationsPerUser || settings.maxApplicationsPerUser;
    settings.applicationReviewRequired = applicationReviewRequired !== undefined ? applicationReviewRequired : settings.applicationReviewRequired;
    settings.defaultApplicationStatus = defaultApplicationStatus || settings.defaultApplicationStatus;
    settings.updatedAt = Date.now();

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    console.error('Update application settings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getApplicationSettings,
  updateApplicationSettings
};