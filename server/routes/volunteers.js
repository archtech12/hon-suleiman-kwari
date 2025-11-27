const express = require('express');
const router = express.Router();
const {
  registerVolunteer,
  getAllVolunteers,
  getVolunteerStats,
  updateVolunteerStatus,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
  exportVolunteersCSV
} = require('../controllers/volunteerController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.post('/register', registerVolunteer);

// Admin routes
router.get('/admin', protect, admin, getAllVolunteers);
router.get('/stats', protect, admin, getVolunteerStats);
router.get('/export/csv', protect, admin, exportVolunteersCSV);
router.get('/:id', protect, admin, getVolunteerById);
router.put('/:id', protect, admin, updateVolunteer);
router.put('/:id/status', protect, admin, updateVolunteerStatus);
router.delete('/:id', protect, admin, deleteVolunteer);

module.exports = router;
