const Application = require('../models/Application');
const ApplicationSupport = require('../models/ApplicationSupport');

// @desc    Get all applications
// @route   GET /api/applications
// @access  Public
const getApplications = async (req, res) => {
  try {
    const { status, category, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    
    // Get applications with pagination
    const applications = await Application.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    // Get total count for pagination
    const totalCount = await Application.countDocuments(filter);
    
    res.json({
      applications,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: parseInt(page),
      totalCount
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single application
// @route   GET /api/applications/:id
// @access  Public
const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json(application);
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new application
// @route   POST /api/applications
// @access  Public
const createApplication = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      author,
      email,
      phone,
      location,
      images
    } = req.body;
    
    const application = new Application({
      title,
      description,
      category,
      author,
      email,
      phone,
      location,
      images
    });
    
    const createdApplication = await application.save();
    res.status(201).json(createdApplication);
  } catch (error) {
    console.error('Create application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update application
// @route   PUT /api/applications/:id
// @access  Private/Admin
const updateApplication = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      status,
      priority
    } = req.body;
    
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    application.title = title || application.title;
    application.description = description || application.description;
    application.category = category || application.category;
    application.status = status || application.status;
    application.priority = priority || application.priority;
    application.updatedAt = Date.now();
    
    const updatedApplication = await application.save();
    res.json(updatedApplication);
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Private/Admin
const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    await application.remove();
    res.json({ message: 'Application removed' });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add support to application
// @route   POST /api/applications/:id/support
// @access  Public
const addSupport = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Check if user already supported this application
    const existingSupport = await ApplicationSupport.findOne({
      applicationId: application._id,
      $or: [
        { userId: req.user ? req.user._id : null },
        { ipAddress: req.ip }
      ]
    });
    
    if (existingSupport) {
      return res.status(400).json({ message: 'You have already supported this application' });
    }
    
    // Create support record
    const support = new ApplicationSupport({
      applicationId: application._id,
      userId: req.user ? req.user._id : undefined,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });
    
    await support.save();
    
    // Update application support count
    application.supportCount += 1;
    await application.save();
    
    res.json({
      message: 'Support added successfully',
      supportCount: application.supportCount
    });
  } catch (error) {
    console.error('Add support error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get support count for application
// @route   GET /api/applications/:id/support
// @access  Public
const getSupportCount = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json({ supportCount: application.supportCount });
  } catch (error) {
    console.error('Get support count error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
  addSupport,
  getSupportCount
};