const Media = require('../models/Media');

// @desc    Get all media
// @route   GET /api/media
// @access  Public
const getMedia = async (req, res) => {
  try {
    const { category, type, tag } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (type) filter.type = type;
    if (tag) filter.tags = { $in: [tag] };

    const media = await Media.find(filter).sort({ createdAt: -1 });
    res.json(media);
  } catch (error) {
    console.error('Get media error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get media by ID
// @route   GET /api/media/:id
// @access  Public
const getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }
    
    res.json(media);
  } catch (error) {
    console.error('Get media error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create media
// @route   POST /api/media
// @access  Private
const createMedia = async (req, res) => {
  try {
    const {
      title,
      description,
      url,
      type,
      category,
      tags
    } = req.body;

    const media = new Media({
      title,
      description,
      url,
      type,
      category,
      tags
    });

    const createdMedia = await media.save();
    res.status(201).json(createdMedia);
  } catch (error) {
    console.error('Create media error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update media
// @route   PUT /api/media/:id
// @access  Private
const updateMedia = async (req, res) => {
  try {
    const {
      title,
      description,
      url,
      type,
      category,
      tags
    } = req.body;

    const media = await Media.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        url,
        type,
        category,
        tags
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    res.json(media);
  } catch (error) {
    console.error('Update media error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete media
// @route   DELETE /api/media/:id
// @access  Private
const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);

    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    await media.remove();
    res.json({ message: 'Media removed' });
  } catch (error) {
    console.error('Delete media error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia
};