const mongoose = require('mongoose');
const Project = require('./server/models/Project');

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ghali-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

const sampleProjects = [
  {
    title: "Community School Construction",
    description: "Building a new community school to provide quality education for local children. This project includes construction of classrooms, library, and playground facilities.",
    category: "Education",
    status: "Ongoing",
    year: "2024",
    priority: 8
  },
  {
    title: "Rural Healthcare Initiative",
    description: "Establishing healthcare facilities in rural areas to improve access to medical services for underserved communities.",
    category: "Healthcare",
    status: "Planned",
    year: "2025",
    priority: 9
  },
  {
    title: "Road Infrastructure Development",
    description: "Construction and rehabilitation of roads to improve transportation and connectivity in the constituency.",
    category: "Infrastructure",
    status: "Completed",
    year: "2023",
    priority: 7
  }
];

const seedProjects = async () => {
  try {
    // Clear existing projects
    await Project.deleteMany();
    console.log('Cleared existing projects');
    
    // Insert sample projects
    const createdProjects = await Project.insertMany(sampleProjects);
    console.log(`Created ${createdProjects.length} sample projects`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding projects:', error);
    process.exit(1);
  }
};

// Run seed after a short delay to ensure DB connection
setTimeout(seedProjects, 2000);