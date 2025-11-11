const mongoose = require('mongoose');
const User = require('./server/models/User');

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ghali-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

const checkAdminUser = async () => {
  try {
    // Find admin user
    const adminUser = await User.findOne({ email: 'admin@ghalipanda.gov.ng' });
    
    if (adminUser) {
      console.log('Admin user found:');
      console.log('Email:', adminUser.email);
      console.log('Role:', adminUser.role);
      console.log('Password hash length:', adminUser.password.length);
    } else {
      console.log('Admin user not found');
      
      // List all users
      const allUsers = await User.find({}, 'email role');
      console.log('All users in database:');
      allUsers.forEach(user => {
        console.log(`- ${user.email} (${user.role})`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error checking admin user:', error);
    process.exit(1);
  }
};

// Run check after a short delay to ensure DB connection
setTimeout(checkAdminUser, 2000);