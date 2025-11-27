const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

console.log('Testing MongoDB Atlas Connection...');
console.log('Connection String:', process.env.MONGODB_URI ? 'Found' : 'Not Found');

const testConnection = async () => {
  try {
    console.log('\nAttempting to connect to MongoDB Atlas...');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // 10 second timeout
    });
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    console.log('Database:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
    
    // Close connection
    await mongoose.connection.close();
    console.log('\n✅ Connection test completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Connection failed!');
    console.error('Error:', error.message);
    
    if (error.message.includes('IP')) {
      console.log('\n⚠️  IP WHITELIST ISSUE DETECTED');
      console.log('\nTo fix this:');
      console.log('1. Go to https://cloud.mongodb.com/');
      console.log('2. Navigate to Network Access (left sidebar)');
      console.log('3. Click "Add IP Address"');
      console.log('4. Click "Allow Access from Anywhere" (0.0.0.0/0)');
      console.log('5. Click "Confirm" and wait 1-2 minutes');
      console.log('6. Run this test again\n');
    } else if (error.message.includes('authentication')) {
      console.log('\n⚠️  AUTHENTICATION ISSUE DETECTED');
      console.log('\nTo fix this:');
      console.log('1. Check your username and password in .env file');
      console.log('2. Make sure the password doesn\'t contain special characters that need URL encoding');
      console.log('3. Verify the database user exists in MongoDB Atlas\n');
    } else {
      console.log('\n⚠️  OTHER CONNECTION ISSUE');
      console.log('Check your connection string format in .env file\n');
    }
    
    process.exit(1);
  }
};

testConnection();
