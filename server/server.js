const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const aboutRoutes = require('./routes/about');
const projectsRoutes = require('./routes/projects');
const newsRoutes = require('./routes/news');
const constituencyRoutes = require('./routes/constituency');
const legislativeRoutes = require('./routes/legislative');
const contactRoutes = require('./routes/contact');
const mediaRoutes = require('./routes/media');
const uploadRoutes = require('./routes/upload');
const volunteerRoutes = require('./routes/volunteers');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Use MongoDB Atlas for production, local for development
    const mongoURI = process.env.NODE_ENV === 'production' 
      ? process.env.MONGODB_URI
      : process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ghali-dashboard';
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`✅ Connected to MongoDB: ${process.env.NODE_ENV === 'production' ? 'Atlas' : 'Local/Atlas'}`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⚠️ Starting server without database connection...');
  }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/constituency', constituencyRoutes);
app.use('/api/legislative', legislativeRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/volunteers', volunteerRoutes);

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Ghali Dashboard API is running',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});