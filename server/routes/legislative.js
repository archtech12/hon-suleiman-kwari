const express = require('express');
const router = express.Router();
const { getLegislative, createLegislative, updateLegislative } = require('../controllers/legislativeController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.route('/').get(getLegislative);

// Private routes
router.route('/').post(protect, admin, createLegislative);
router.route('/:id').put(protect, admin, updateLegislative);

module.exports = router;