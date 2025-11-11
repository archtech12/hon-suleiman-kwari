const mongoose = require('mongoose');

const constituencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  representative: {
    type: String,
    required: true
  },
  party: {
    type: String,
    required: true
  },
  electionYear: {
    type: String,
    required: true
  },
  communities: [{
    type: String
  }],
  population: {
    type: String,
    required: true
  },
  initiatives: [{
    title: String,
    description: String,
    icon: String
  }],
  visionContent: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Constituency', constituencySchema);