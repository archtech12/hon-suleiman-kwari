const mongoose = require('mongoose');
const News = require('./models/News');

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
    // Try to fetch news items
    const news = await News.find().sort({ createdAt: -1 });
    console.log('News items found:', news.length);
    console.log('First news item:', news[0]);
  } catch (error) {
    console.error('Error fetching news:', error);
  }
  
  // Close connection
  mongoose.connection.close();
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});