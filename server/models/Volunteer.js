const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  // Personal Information
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  
  // Address Information
  address: {
    street: String,
    city: String,
    lga: String, // Local Government Area
    state: String,
    constituency: {
      type: String,
      enum: ['Gaya', 'Ajingi', 'Albasu', 'Other'],
      default: 'Gaya'
    }
  },
  
  // Volunteer Category
  volunteerType: {
    type: String,
    enum: [
      'Social Media Volunteer',
      'Field Mobilizer',
      'Community Organizer',
      'Youth Leader',
      'Women Leader',
      'Campaign Coordinator',
      'Event Volunteer',
      'General Supporter',
      'Other'
    ],
    required: true
  },
  
  // Skills & Interests
  skills: [{
    type: String
  }],
  interests: [{
    type: String
  }],
  
  // Availability
  availability: {
    type: String,
    enum: ['Full Time', 'Part Time', 'Weekends Only', 'Flexible'],
    default: 'Flexible'
  },
  
  // Social Media Handles
  socialMedia: {
    facebook: String,
    twitter: String,
    instagram: String,
    whatsapp: String
  },
  
  // Professional Info
  occupation: String,
  education: {
    type: String,
    enum: ['Primary', 'Secondary', 'Diploma', 'Undergraduate', 'Graduate', 'Postgraduate', 'Other']
  },
  
  // Emergency Contact
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  
  // Campaign Specific
  referredBy: String,
  motivation: String, // Why they want to volunteer
  previousExperience: String, // Previous political/volunteer experience
  
  // Status
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Active', 'Inactive'],
    default: 'Pending'
  },
  
  // Engagement
  assignedTasks: [{
    task: String,
    assignedDate: Date,
    completedDate: Date,
    status: String
  }],
  
  // Metadata
  registrationDate: {
    type: Date,
    default: Date.now
  },
  lastActive: Date,
  notes: String, // Admin notes
  
  // Consent
  dataConsent: {
    type: Boolean,
    required: true,
    default: false
  },
  newsletterConsent: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for fast searching
volunteerSchema.index({ email: 1 });
volunteerSchema.index({ phone: 1 });
volunteerSchema.index({ volunteerType: 1 });
volunteerSchema.index({ 'address.constituency': 1 });
volunteerSchema.index({ status: 1 });

module.exports = mongoose.model('Volunteer', volunteerSchema);
