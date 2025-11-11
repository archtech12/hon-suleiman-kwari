const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ghali-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  try {
    // Find the admin user
    const user = await User.findOne({ email: 'admin@ghalipanda.gov.ng' });
    
    if (user) {
      console.log('User found');
      
      // Test password comparison
      const isMatch = await user.comparePassword('Admin123!');
      console.log('Password matches:', isMatch);
      
      // Test with wrong password
      const isMatchWrong = await user.comparePassword('WrongPassword');
      console.log('Wrong password matches:', isMatchWrong);
    } else {
      console.log('User not found');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});