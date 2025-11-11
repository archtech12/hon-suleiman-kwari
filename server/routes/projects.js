const express = require('express');
const router = express.Router();
const { 
  getProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject 
} = require('../controllers/projectsController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.route('/').get(getProjects);
router.route('/:id').get(getProjectById);

// Private routes
router.route('/').post(protect, admin, createProject);
router.route('/:id').put(protect, admin, updateProject).delete(protect, admin, deleteProject);

module.exports = router;