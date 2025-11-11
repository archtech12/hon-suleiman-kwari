const mongoose = require('mongoose');
const Legislative = require('./models/Legislative');

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ghali-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Sample legislative data
const sampleLegislativeData = {
  title: "Legislative Work",
  content: `<p>Dr. Ghali's legislative work focuses on fundamental economic reforms that would benefit all Nigerians. His approach centers on reducing dependency on imports, improving infrastructure, and supporting local manufacturing.</p>
  <p>Key to his vision is creating an environment where essential goods become more affordable through policy interventions that address the root causes of high prices - from transportation costs to import barriers.</p>
  <p>By advocating for streamlined import procedures and improved infrastructure, Dr. Ghali aims to create a more competitive economic environment that benefits consumers, local businesses, and the broader Nigerian economy.</p>`,
  bills: [
    {
      name: "Import Policy Reform Initiative",
      description: "Leading efforts to streamline import procedures and reduce costs for essential goods.",
      status: "In Committee"
    },
    {
      name: "Transportation Infrastructure Bill",
      description: "Advocating for improved road networks and transportation systems in rural communities.",
      status: "Proposed"
    },
    {
      name: "Local Manufacturing Incentives",
      description: "Proposing tax incentives and support programs for local manufacturing enterprises.",
      status: "In Committee"
    }
  ],
  achievements: [
    {
      title: "Fuel Subsidy Reform Support",
      description: "Played a key role in supporting legislation to reform Nigeria's fuel subsidy system.",
      date: "2023"
    },
    {
      title: "Rural Electrification Initiative",
      description: "Championed funding for rural electrification projects in Northern Nigeria.",
      date: "2024"
    }
  ]
};

// Seed the database
const seedLegislativeData = async () => {
  try {
    // Check if data already exists
    const existingData = await Legislative.findOne();
    
    if (existingData) {
      console.log('Legislative data already exists. Updating...');
      await Legislative.findByIdAndUpdate(existingData._id, sampleLegislativeData);
    } else {
      // Create new data
      const newData = new Legislative(sampleLegislativeData);
      await newData.save();
    }
    
    console.log('Legislative data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding legislative data:', error);
    process.exit(1);
  }
};

seedLegislativeData();