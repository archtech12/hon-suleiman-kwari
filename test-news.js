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

const testNews = async () => {
  try {
    // Find all news items
    const news = await News.find().sort({ createdAt: -1 });
    
    console.log('News items found:', news.length);
    
    if (news.length > 0) {
      console.log('Latest news item:');
      console.log('Title:', news[0].title);
      console.log('Published:', news[0].published);
      console.log('Category:', news[0].category);
    } else {
      console.log('No news items found in database');
      
      // Create a sample news item
      const sampleNews = new News({
        title: 'Sample News Article',
        excerpt: 'This is a sample news article excerpt.',
        content: 'This is the full content of the sample news article. It contains more detailed information about the news item.',
        category: 'Announcement',
        author: 'Hon. Dr. Ghali Mustapha Tijjani Phanda',
        published: true
      });
      
      const savedNews = await sampleNews.save();
      console.log('Created sample news item:', savedNews.title);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

// Run test after a short delay to ensure DB connection
setTimeout(testNews, 2000);