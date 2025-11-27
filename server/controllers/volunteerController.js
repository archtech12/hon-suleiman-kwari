const Volunteer = require('../models/Volunteer');

// @desc    Register new volunteer
// @route   POST /api/volunteers/register
// @access  Public
const registerVolunteer = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
      volunteerType,
      skills,
      interests,
      availability,
      socialMedia,
      occupation,
      education,
      emergencyContact,
      referredBy,
      motivation,
      previousExperience,
      dataConsent,
      newsletterConsent
    } = req.body;

    // Check if volunteer already exists
    const existingVolunteer = await Volunteer.findOne({ 
      $or: [{ email }, { phone }] 
    });

    if (existingVolunteer) {
      return res.status(400).json({ 
        message: 'A volunteer with this email or phone number already exists' 
      });
    }

    // Create new volunteer
    const volunteer = await Volunteer.create({
      fullName,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
      volunteerType,
      skills,
      interests,
      availability,
      socialMedia,
      occupation,
      education,
      emergencyContact,
      referredBy,
      motivation,
      previousExperience,
      dataConsent,
      newsletterConsent,
      status: 'Pending'
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful! We will contact you soon.',
      volunteer: {
        id: volunteer._id,
        fullName: volunteer.fullName,
        email: volunteer.email,
        volunteerType: volunteer.volunteerType,
        registrationDate: volunteer.registrationDate
      }
    });
  } catch (error) {
    console.error('Volunteer registration error:', error);
    res.status(500).json({ 
      message: 'Registration failed. Please try again.',
      error: error.message 
    });
  }
};

// @desc    Get all volunteers (Admin)
// @route   GET /api/volunteers/admin
// @access  Private/Admin
const getAllVolunteers = async (req, res) => {
  try {
    const { 
      status, 
      volunteerType, 
      constituency,
      search,
      page = 1,
      limit = 50
    } = req.query;

    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (volunteerType) filter.volunteerType = volunteerType;
    if (constituency) filter['address.constituency'] = constituency;
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const volunteers = await Volunteer.find(filter)
      .sort({ registrationDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Volunteer.countDocuments(filter);

    res.json({
      volunteers,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Get volunteers error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get volunteer statistics
// @route   GET /api/volunteers/stats
// @access  Private/Admin
const getVolunteerStats = async (req, res) => {
  try {
    const total = await Volunteer.countDocuments();
    const pending = await Volunteer.countDocuments({ status: 'Pending' });
    const approved = await Volunteer.countDocuments({ status: 'Approved' });
    const active = await Volunteer.countDocuments({ status: 'Active' });

    // Group by volunteer type
    const byType = await Volunteer.aggregate([
      { $group: { _id: '$volunteerType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Group by constituency
    const byConstituency = await Volunteer.aggregate([
      { $group: { _id: '$address.constituency', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Recent registrations (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentRegistrations = await Volunteer.countDocuments({
      registrationDate: { $gte: sevenDaysAgo }
    });

    res.json({
      total,
      pending,
      approved,
      active,
      byType,
      byConstituency,
      recentRegistrations
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update volunteer status
// @route   PUT /api/volunteers/:id/status
// @access  Private/Admin
const updateVolunteerStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status, lastActive: Date.now() },
      { new: true }
    );

    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    res.json({ message: 'Status updated successfully', volunteer });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single volunteer
// @route   GET /api/volunteers/:id
// @access  Private/Admin
const getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    res.json(volunteer);
  } catch (error) {
    console.error('Get volunteer error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update volunteer
// @route   PUT /api/volunteers/:id
// @access  Private/Admin
const updateVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    res.json({ message: 'Volunteer updated successfully', volunteer });
  } catch (error) {
    console.error('Update volunteer error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete volunteer
// @route   DELETE /api/volunteers/:id
// @access  Private/Admin
const deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByIdAndDelete(req.params.id);

    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    res.json({ message: 'Volunteer deleted successfully' });
  } catch (error) {
    console.error('Delete volunteer error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Export volunteers to CSV
// @route   GET /api/volunteers/export/csv
// @access  Private/Admin
const exportVolunteersCSV = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().sort({ registrationDate: -1 });

    // CSV headers
    const headers = [
      'Full Name', 'Email', 'Phone', 'Gender', 'Date of Birth',
      'Street', 'City', 'LGA', 'State', 'Constituency',
      'Volunteer Type', 'Availability', 'Occupation', 'Education',
      'Skills', 'Facebook', 'Twitter', 'Instagram', 'WhatsApp',
      'Emergency Contact Name', 'Emergency Contact Phone',
      'Referred By', 'Status', 'Registration Date'
    ];

    // CSV rows
    const rows = volunteers.map(v => [
      v.fullName,
      v.email,
      v.phone,
      v.gender,
      v.dateOfBirth ? v.dateOfBirth.toISOString().split('T')[0] : '',
      v.address?.street || '',
      v.address?.city || '',
      v.address?.lga || '',
      v.address?.state || '',
      v.address?.constituency || '',
      v.volunteerType,
      v.availability,
      v.occupation || '',
      v.education || '',
      v.skills?.join('; ') || '',
      v.socialMedia?.facebook || '',
      v.socialMedia?.twitter || '',
      v.socialMedia?.instagram || '',
      v.socialMedia?.whatsapp || '',
      v.emergencyContact?.name || '',
      v.emergencyContact?.phone || '',
      v.referredBy || '',
      v.status,
      v.registrationDate.toISOString().split('T')[0]
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=volunteers-${Date.now()}.csv`);
    res.send(csvContent);
  } catch (error) {
    console.error('Export CSV error:', error);
    res.status(500).json({ message: 'Export failed', error: error.message });
  }
};

module.exports = {
  registerVolunteer,
  getAllVolunteers,
  getVolunteerStats,
  updateVolunteerStatus,
  getVolunteerById,
  updateVolunteer,
  deleteVolunteer,
  exportVolunteersCSV
};
