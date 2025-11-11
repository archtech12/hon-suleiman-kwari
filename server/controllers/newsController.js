const News = require('../models/News');

// @desc    Get all news
// @route   GET /api/news
// @access  Public
const getNews = async (req, res) => {
  try {
    const news = await News.find({ published: true }).sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all news (admin)
// @route   GET /api/news/admin
// @access  Private
const getAllNewsAdmin = async (req, res) => {
  try {
    console.log('getAllNewsAdmin called');
    console.log('User:', req.user);
    
    // Check if News model is properly loaded
    if (!News) {
      console.error('News model is not defined');
      return res.status(500).json({ message: 'News model not loaded' });
    }
    
    const news = await News.find().sort({ createdAt: -1 });
    console.log('News found:', news.length);
    
    res.json(news);
  } catch (error) {
    console.error('Get all news error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get news by ID
// @route   GET /api/news/:id
// @access  Public
const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    
    if (!news.published && !req.user) {
      return res.status(401).json({ message: 'Not authorized to view unpublished news' });
    }
    
    res.json(news);
  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create news
// @route   POST /api/news
// @access  Private
const createNews = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      imageUrl,
      category,
      author,
      published
    } = req.body;

    const news = new News({
      title,
      excerpt,
      content,
      imageUrl,
      category,
      author,
      published
    });

    const createdNews = await news.save();
    res.status(201).json(createdNews);
  } catch (error) {
    console.error('Create news error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update news
// @route   PUT /api/news/:id
// @access  Private
const updateNews = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      content,
      imageUrl,
      category,
      author,
      published
    } = req.body;

    const news = await News.findByIdAndUpdate(
      req.params.id,
      {
        title,
        excerpt,
        content,
        imageUrl,
        category,
        author,
        published
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.json(news);
  } catch (error) {
    console.error('Update news error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete news
// @route   DELETE /api/news/:id
// @access  Private
const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    await news.remove();
    res.json({ message: 'News removed' });
  } catch (error) {
    console.error('Delete news error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getNews,
  getAllNewsAdmin,
  getNewsById,
  createNews,
  updateNews,
  deleteNews
};