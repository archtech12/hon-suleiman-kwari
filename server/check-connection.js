const mongoose = require('mongoose');
require('dotenv').config();

console.log('Environment Variables:');
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('NODE_ENV:', process.env.NODE_ENV || 'not set');

console.log('\nAttempting connection...');

// Parse the connection string to see what we're connecting to
if (process.env.MONGODB_URI) {
  try {
    const url = new URL(process.env.MONGODB_URI);
    console.log('\nConnection String Details:');
    console.log('- Protocol:', url.protocol);
    console.log('- Host:', url.hostname);
    console.log('- Port:', url.port || 'default');
    console.log('- Database:', url.pathname.substring(1) || 'not specified');
    console.log('- Search Params:', url.search);
  } catch (e) {
    console.log('Error parsing connection string:', e.message);
  }
} else {
  console.log('No MONGODB_URI found in environment variables');
}