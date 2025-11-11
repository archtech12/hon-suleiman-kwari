const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Application = require('../models/Application');
const ApplicationSettings = require('../models/ApplicationSettings');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ghali-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Sample applications data
const sampleApplications = [
  {
    title: "Community Health Center Construction",
    description: "Proposal to build a new health center in the Gaya community to provide better healthcare access to residents. The center would include basic medical facilities, maternity services, and a pharmacy.",
    category: "Healthcare",
    status: "Approved",
    priority: 8,
    author: "Amina Bello",
    email: "amina.bello@example.com",
    phone: "+234 801 234 5678",
    location: "Gaya Community",
    supportCount: 125
  },
  {
    title: "Youth Entrepreneurship Training Program",
    description: "A comprehensive training program to equip young people with entrepreneurial skills and provide micro-loans to start small businesses. This initiative aims to reduce youth unemployment in our constituency.",
    category: "Economic Empowerment",
    status: "Pending",
    priority: 7,
    author: "Yusuf Ibrahim",
    email: "yusuf.ibrahim@example.com",
    phone: "+234 802 345 6789",
    location: "Ajingi Community",
    supportCount: 89
  },
  {
    title: "Solar-Powered Water Pumping System",
    description: "Installation of solar-powered water pumping systems in rural areas to provide clean water access. This project would benefit over 2,000 residents who currently walk long distances to fetch water.",
    category: "Infrastructure",
    status: "Completed",
    priority: 9,
    author: "Fatima Aliyu",
    email: "fatima.aliyu@example.com",
    phone: "+234 803 456 7890",
    location: "Albasu Community",
    supportCount: 210
  },
  {
    title: "Adult Literacy Program",
    description: "A program to teach basic literacy skills to adults in rural communities. The program would run for 6 months with classes held in community centers and mosques.",
    category: "Education",
    status: "Approved",
    priority: 6,
    author: "Sani Mohammed",
    email: "sani.mohammed@example.com",
    phone: "+234 804 567 8901",
    location: "Gaya Community",
    supportCount: 67
  },
  {
    title: "Road Rehabilitation Project",
    description: "Rehabilitation of the main road connecting Gaya to Ajingi to improve transportation and reduce travel time. The project includes filling potholes, improving drainage, and adding road signs.",
    category: "Infrastructure",
    status: "Pending",
    priority: 9,
    author: "Hassan Usman",
    email: "hassan.usman@example.com",
    phone: "+234 805 678 9012",
    location: "Gaya-Ajingi Road",
    supportCount: 156
  }
];

const seedApplications = async () => {
  try {
    // Clear existing applications
    await Application.deleteMany({});
    console.log('Cleared existing applications');
    
    // Insert sample applications
    const createdApplications = await Application.insertMany(sampleApplications);
    console.log(`Inserted ${createdApplications.length} sample applications`);
    
    // Initialize application settings
    const settings = new ApplicationSettings({
      applicationsEnabled: true,
      maxApplicationsPerUser: 5,
      applicationReviewRequired: true,
      defaultApplicationStatus: 'Pending'
    });
    
    await settings.save();
    console.log('Initialized application settings');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding applications:', error);
    process.exit(1);
  }
};

// Run the seed function
seedApplications();