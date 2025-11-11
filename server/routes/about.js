const express = require('express');
const router = express.Router();
const { getAbout, createAbout, updateAbout } = require('../controllers/aboutController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.route('/').get(getAbout);

// Private routes
router.route('/').post(protect, admin, createAbout);
router.route('/:id').put(protect, admin, updateAbout);

module.exports = router;