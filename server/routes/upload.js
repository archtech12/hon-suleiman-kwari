const express = require('express');
const router = express.Router();
const { uploadImage, deleteImage } = require('../controllers/uploadController');
const upload = require('../middleware/upload');
const { protect, admin } = require('../middleware/auth');

// Upload route
router.post('/', protect, admin, upload.single('image'), uploadImage);

// Delete route
router.delete('/:filename', protect, admin, deleteImage);

module.exports = router;