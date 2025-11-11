const express = require('express');
const router = express.Router();
const {
  getApplicationSettings,
  updateApplicationSettings
} = require('../controllers/applicationSettingsController');
const { protect, admin } = require('../middleware/auth');

// Public route
router.route('/')
  .get(getApplicationSettings)
  .put(protect, admin, updateApplicationSettings);

module.exports = router;