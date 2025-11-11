const mongoose = require('mongoose');

// Load environment variables
require('dotenv').config();

console.log('Testing MongoDB Atlas connection...');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Found' : 'Not found');

if (process.env.MONGODB_URI) {
  console.log('Attempting to connect to MongoDB Atlas...');
  
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas');
    console.log('Connection details:');
    console.log('- Host:', mongoose.connection.host);
    console.log('- Database:', mongoose.connection.name);
    
    // Test by listing collections
    mongoose.connection.db.listCollections().toArray()
      .then(collections => {
        console.log(`- Collections found: ${collections.length}`);
        collections.forEach(collection => {
          console.log(`  • ${collection.name}`);
        });
        mongoose.connection.close();
        process.exit(0);
      })
      .catch(err => {
        console.error('Error listing collections:', err);
        mongoose.connection.close();
        process.exit(1);
      });
  })
  .catch((err) => {
    console.error('❌ MongoDB Atlas connection error:', err.message);
    process.exit(1);
  });
} else {
  console.log('❌ MONGODB_URI not found in environment variables');
  console.log('Please add your MongoDB Atlas connection string to the .env file');
  process.exit(1);
}