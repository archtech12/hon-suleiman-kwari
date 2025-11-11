const mongoose = require('mongoose');
const Constituency = require('./models/Constituency');

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ghali-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Sample constituency data
const sampleConstituencyData = {
  name: "Gaya / Ajingi / Albasu Federal Constituency",
  representative: "Hon. Dr. Ghali Mustapha Tijjani Phanda",
  party: "New Nigeria Peoples Party (NNPP)",
  electionYear: "2023",
  communities: ["Gaya", "Ajingi", "Albasu"],
  population: "Approximately 200,000 residents",
  initiatives: [
    {
      title: "Economic Empowerment Programs",
      description: "Initiatives to reduce import dependency and make essential goods more affordable for local communities.",
      icon: "trending_down"
    },
    {
      title: "Infrastructure Development",
      description: "Projects focused on improving transportation networks and addressing fuel scarcity issues.",
      icon: "local_shipping"
    },
    {
      title: "Local Manufacturing Support",
      description: "Supporting domestic production to create jobs and reduce reliance on foreign goods.",
      icon: "factory"
    },
    {
      title: "Community Health Programs",
      description: "Free medical checkups and health education programs for underserved rural communities.",
      icon: "local_hospital"
    }
  ],
  visionContent: "Dr. Ghali's vision for Gaya, Ajingi, and Albasu is rooted in sustainable development that creates opportunities for all residents. His approach combines grassroots community engagement with strategic policy advocacy at the federal level. By focusing on economic reforms that reduce the cost of living, improving infrastructure that connects communities to markets and services, and supporting local entrepreneurship, we aim to build a constituency that serves as a model for development across Nigeria."
};

// Seed the database
const seedConstituencyData = async () => {
  try {
    // Check if data already exists
    const existingData = await Constituency.findOne();
    
    if (existingData) {
      console.log('Constituency data already exists. Updating...');
      await Constituency.findByIdAndUpdate(existingData._id, sampleConstituencyData);
    } else {
      // Create new data
      const newData = new Constituency(sampleConstituencyData);
      await newData.save();
    }
    
    console.log('Constituency data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding constituency data:', error);
    process.exit(1);
  }
};

seedConstituencyData();