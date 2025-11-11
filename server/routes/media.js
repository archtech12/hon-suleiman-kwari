const express = require('express');
const router = express.Router();
const { 
  getMedia, 
  getMediaById, 
  createMedia, 
  updateMedia, 
  deleteMedia 
} = require('../controllers/mediaController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.route('/').get(getMedia);
router.route('/:id').get(getMediaById);

// Private routes
router.route('/').post(protect, admin, createMedia);
router.route('/:id').put(protect, admin, updateMedia).delete(protect, admin, deleteMedia);

module.exports = router;