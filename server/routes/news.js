const express = require('express');
const router = express.Router();
const { 
  getNews, 
  getAllNewsAdmin,
  getNewsById, 
  createNews, 
  updateNews, 
  deleteNews 
} = require('../controllers/newsController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.route('/').get(getNews);

// Private routes (must be before /:id route)
router.route('/admin').get(protect, admin, getAllNewsAdmin);
router.route('/').post(protect, admin, createNews);

// Dynamic ID route (must be last)
router.route('/:id').get(getNewsById);
router.route('/:id').put(protect, admin, updateNews).delete(protect, admin, deleteNews);

module.exports = router;