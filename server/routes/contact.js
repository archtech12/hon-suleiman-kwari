const express = require('express');
const router = express.Router();
const { getContact, createContact, updateContact } = require('../controllers/contactController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.route('/').get(getContact);

// Private routes
router.route('/').post(protect, admin, createContact);
router.route('/:id').put(protect, admin, updateContact);

module.exports = router;