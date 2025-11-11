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
    // Check if there are any news documents
    const count = await News.countDocuments();
    console.log('Total news documents:', count);
    
    if (count > 0) {
      // Try to fetch one document to see its structure
      const newsItem = await News.findOne();
      console.log('Sample news item:', JSON.stringify(newsItem, null, 2));
    }
    
    // Try to create a test news item
    const testNews = new News({
      title: 'Test News',
      excerpt: 'This is a test news item',
      content: 'This is the full content of the test news item',
      category: 'Announcement',
      author: 'Test Author'
    });
    
    const savedNews = await testNews.save();
    console.log('Test news created:', savedNews._id);
    
    // Clean up - delete the test news
    await News.findByIdAndDelete(savedNews._id);
    console.log('Test news deleted');
    
  } catch (error) {
    console.error('Database error:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
  }
  
  // Close connection
  mongoose.connection.close();
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});