const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser, 
  getUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  changePassword
} = require('../controllers/authController');
const { protect, admin } = require('../middleware/auth');

router.post('/register', protect, admin, registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/change-password', protect, changePassword);

// Admin routes
router.route('/users')
  .get(protect, admin, getUsers)
  .post(protect, admin, registerUser);

router.route('/users/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

module.exports = router;