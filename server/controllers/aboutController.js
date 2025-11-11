const About = require('../models/About');

// @desc    Get about content
// @route   GET /api/about
// @access  Public
const getAbout = async (req, res) => {
  try {
    const about = await About.findOne().sort({ createdAt: -1 });
    
    if (!about) {
      return res.status(404).json({ message: 'About content not found' });
    }
    
    res.json(about);
  } catch (error) {
    console.error('Get about error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create/update about content
// @route   POST /api/about
// @access  Private
const createAbout = async (req, res) => {
  try {
    const {
      title,
      content,
      imageUrl,
      quickFacts,
      visionItems,
      coreValues
    } = req.body;

    const aboutData = {
      title,
      content,
      imageUrl,
      quickFacts,
      visionItems,
      coreValues
    };

    // Check if about content already exists
    let about = await About.findOne();
    
    if (about) {
      // Update existing
      about = await About.findByIdAndUpdate(about._id, aboutData, {
        new: true,
        runValidators: true
      });
    } else {
      // Create new
      about = new About(aboutData);
      await about.save();
    }

    res.status(201).json(about);
  } catch (error) {
    console.error('Create about error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update about content
// @route   PUT /api/about/:id
// @access  Private
const updateAbout = async (req, res) => {
  try {
    const {
      title,
      content,
      imageUrl,
      quickFacts,
      visionItems,
      coreValues
    } = req.body;

    const about = await About.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        imageUrl,
        quickFacts,
        visionItems,
        coreValues
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!about) {
      return res.status(404).json({ message: 'About content not found' });
    }

    res.json(about);
  } catch (error) {
    console.error('Update about error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAbout,
  createAbout,
  updateAbout
};