const mongoose = require('mongoose');
const News = require('./server/models/News');

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ghali-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

const checkNews = async () => {
  try {
    // Find all news items
    const news = await News.find().sort({ createdAt: -1 });
    
    console.log('Total news items in database:', news.length);
    
    if (news.length > 0) {
      console.log('News items:');
      news.forEach((item, index) => {
        console.log(`${index + 1}. ${item.title}`);
        console.log(`   Published: ${item.published}`);
        console.log(`   Category: ${item.category}`);
        console.log(`   Created: ${item.createdAt}`);
        console.log('---');
      });
    } else {
      console.log('No news items found in database');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error checking news:', error);
    process.exit(1);
  }
};

// Run check after a short delay to ensure DB connection
setTimeout(checkNews, 2000);