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

// Private routes
router.route('/admin').get(protect, admin, getAllNewsAdmin);
router.route('/').post(protect, admin, createNews);

// Public route for single news item (must be after /admin to avoid conflict)
router.route('/:id').get(getNewsById);

// Private routes for updating/deleting news
router.route('/:id').put(protect, admin, updateNews).delete(protect, admin, deleteNews);

module.exports = router;