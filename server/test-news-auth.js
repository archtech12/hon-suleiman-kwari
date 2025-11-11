const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
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
    // Find admin user
    const user = await User.findOne({ email: 'admin@ghalipanda.gov.ng' });
    if (user) {
      console.log('User found:', user.email);
      
      // Generate a token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      console.log('Generated token:', token);
    } else {
      console.log('Admin user not found');
    }
  } catch (error) {
    console.error('Error:', error);
  }
  
  // Close connection
  mongoose.connection.close();
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});