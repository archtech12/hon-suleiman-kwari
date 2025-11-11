const Contact = require('../models/Contact');

// @desc    Get contact information
// @route   GET /api/contact
// @access  Public
const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne().sort({ createdAt: -1 });
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact information not found' });
    }
    
    res.json(contact);
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create/update contact information
// @route   POST /api/contact
// @access  Private
const createContact = async (req, res) => {
  try {
    const {
      officeAddress,
      phone,
      email,
      officeHours,
      socialMedia,
      mapEmbedUrl
    } = req.body;

    const contactData = {
      officeAddress,
      phone,
      email,
      officeHours,
      socialMedia,
      mapEmbedUrl
    };

    // Check if contact information already exists
    let contact = await Contact.findOne();
    
    if (contact) {
      // Update existing
      contact = await Contact.findByIdAndUpdate(contact._id, contactData, {
        new: true,
        runValidators: true
      });
    } else {
      // Create new
      contact = new Contact(contactData);
      await contact.save();
    }

    res.status(201).json(contact);
  } catch (error) {
    console.error('Create contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update contact information
// @route   PUT /api/contact/:id
// @access  Private
const updateContact = async (req, res) => {
  try {
    const {
      officeAddress,
      phone,
      email,
      officeHours,
      socialMedia,
      mapEmbedUrl
    } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        officeAddress,
        phone,
        email,
        officeHours,
        socialMedia,
        mapEmbedUrl
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact information not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getContact,
  createContact,
  updateContact
};