const express = require('express');
const router = express.Router();
const {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
  addSupport,
  getSupportCount
} = require('../controllers/applicationController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.route('/')
  .get(getApplications)
  .post(createApplication);

// Specific routes need to be defined before parametrized ones
router.route('/:id/support')
  .post(addSupport)
  .get(getSupportCount);

router.route('/:id')
  .get(getApplicationById)
  .put(protect, admin, updateApplication)
  .delete(protect, admin, deleteApplication);

module.exports = router;