const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import User model
const User = require('./models/User');

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ghali-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Create admin user
const createAdminUser = async () => {
  try {
    // Check if admin user already exists
    const existingUser = await User.findOne({ email: 'admin@ghalipanda.gov.ng' });
    
    if (existingUser) {
      console.log('Admin user already exists. Deleting and recreating...');
      await User.deleteOne({ email: 'admin@ghalipanda.gov.ng' });
    }
    
    // Create new admin user (password will be hashed by Mongoose pre-save hook)
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@ghalipanda.gov.ng',
      password: 'Admin123!', // Plain text - will be hashed automatically
      role: 'admin'
    });
    
    await adminUser.save();
    console.log('Admin user created successfully!');
    console.log('Email: admin@ghalipanda.gov.ng');
    console.log('Password: Admin123!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();