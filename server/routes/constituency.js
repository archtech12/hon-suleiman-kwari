const express = require('express');
const router = express.Router();
const { getConstituencyContent, updateConstituencyContent } = require('../controllers/constituencyController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.get('/', getConstituencyContent);

// Admin routes
router.post('/', protect, admin, updateConstituencyContent);

module.exports = router;