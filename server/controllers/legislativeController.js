const Legislative = require('../models/Legislative');

// @desc    Get legislative content
// @route   GET /api/legislative
// @access  Public
const getLegislative = async (req, res) => {
  try {
    const legislative = await Legislative.findOne().sort({ createdAt: -1 });
    
    if (!legislative) {
      return res.status(404).json({ message: 'Legislative content not found' });
    }
    
    res.json(legislative);
  } catch (error) {
    console.error('Get legislative error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create/update legislative content
// @route   POST /api/legislative
// @access  Private
const createLegislative = async (req, res) => {
  try {
    const {
      title,
      content,
      bills,
      achievements,
      imageUrl
    } = req.body;

    const legislativeData = {
      title,
      content,
      bills,
      achievements,
      imageUrl
    };

    // Check if legislative content already exists
    let legislative = await Legislative.findOne();
    
    if (legislative) {
      // Update existing
      legislative = await Legislative.findByIdAndUpdate(legislative._id, legislativeData, {
        new: true,
        runValidators: true
      });
    } else {
      // Create new
      legislative = new Legislative(legislativeData);
      await legislative.save();
    }

    res.status(201).json(legislative);
  } catch (error) {
    console.error('Create legislative error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update legislative content
// @route   PUT /api/legislative/:id
// @access  Private
const updateLegislative = async (req, res) => {
  try {
    const {
      title,
      content,
      bills,
      achievements,
      imageUrl
    } = req.body;

    const legislative = await Legislative.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        bills,
        achievements,
        imageUrl
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!legislative) {
      return res.status(404).json({ message: 'Legislative content not found' });
    }

    res.json(legislative);
  } catch (error) {
    console.error('Update legislative error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getLegislative,
  createLegislative,
  updateLegislative
};