const mongoose = require('mongoose');

// Test MongoDB connection
const testConnection = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect('mongodb+srv://ismailibrahimgaya5_db_user:3r8vv7tjzF3a1SKC@gmt.ecwicek.mongodb.net/?appName=GMT', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

testConnection();