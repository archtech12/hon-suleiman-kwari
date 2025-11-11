const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect middleware
const protect = async (req, res, next) => {
  try {
    console.log('Protect middleware called');
    // Get token from header
    const authHeader = req.header('Authorization');
    console.log('Auth header:', authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No valid auth header');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    // Extract token
    const token = authHeader.replace('Bearer ', '');
    console.log('Token extracted:', token);
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', decoded);
    
    // Add user to request object
    req.user = await User.findById(decoded.userId).select('-password');
    console.log('User found:', req.user);
    
    if (!req.user) {
      console.log('No user found');
      return res.status(401).json({ message: 'Token is not valid' });
    }
    
    console.log('Authentication successful');
    next();
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Admin middleware
const admin = (req, res, next) => {
  console.log('Admin middleware called');
  console.log('User role:', req.user?.role);
  if (req.user && req.user.role === 'admin') {
    console.log('Admin access granted');
    next();
  } else {
    console.log('Admin access denied');
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

module.exports = { protect, admin };