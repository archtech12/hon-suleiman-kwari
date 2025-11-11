const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generate a test admin token
const adminUser = {
  userId: '6911593fe5fbd7d0c74105d0', // This should be a real admin user ID from your database
  role: 'admin'
};

const token = jwt.sign(adminUser, process.env.JWT_SECRET, { expiresIn: '1d' });
console.log('Test Admin Token:', token);