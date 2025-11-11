const mongoose = require('mongoose');
const About = require('./models/About');

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ghali-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Sample about data
const sampleAboutData = {
  title: "About Hon. Dr. Ghali Mustapha Tijjani Phanda",
  content: `<p>Dr. Ghali Mustapha Tijjani was born on June 13, 1980, in Kano State, Nigeria. A dedicated advocate for community development and participatory leadership, Dr. Ghali entered national public service in 2023 when he was elected to represent the Ajingi / Albasu / Gaya Federal Constituency in the House of Representatives on the platform of the New Nigeria Peoples Party (NNPP).</p>
  <p>His tenure is anchored in empowering youth, women, and families across his constituency—delivering vital support such as food aid, education infrastructure, and economic-opportunity programmes. With a strong commitment to transparent access and service, Dr. Ghali brings scholastic insight (including doctoral level study) together with boots-on-the-ground community engagement to fulfil his vision of leadership "by the people, for the people."</p>
  <p>Off the chamber floor, Dr. Ghali believes in harnessing the power of collective effort: his work builds on family values, indigenous heritage and the aspiration of a better future for Kano's communities. His story is one of service, integrity and hope.</p>`,
  imageUrl: "/ghaliphoto.jpg",
  quickFacts: [
    { icon: 'badge', label: 'Position', value: 'Representative, House of Representatives' },
    { icon: 'location_on', label: 'Constituency', value: 'Ajingi / Albasu / Gaya Federal Constituency' },
    { icon: 'calendar_today', label: 'Years of Service', value: '2023 - Present' },
    { icon: 'groups', label: 'Party', value: 'New Nigeria Peoples Party (NNPP)' },
    { icon: 'cake', label: 'Born', value: 'June 13, 1980' },
    { icon: 'school', label: 'Education', value: 'Doctoral Level Study' }
  ],
  visionItems: [
    { icon: 'school', title: 'Youth Empowerment', description: 'Comprehensive skills acquisition and entrepreneurship training for young people in underserved communities.' },
    { icon: 'local_hospital', title: 'Community Health', description: 'Free medical checkups and health education programs for rural communities with limited healthcare access.' },
    { icon: 'home', title: 'Infrastructure', description: 'Building modern infrastructure to connect communities and drive economic development.' }
  ],
  coreValues: [
    'Integrity in all actions and decisions',
    'Transparency in governance and operations',
    'Accountability to constituents and stakeholders',
    'Equity in resource distribution and opportunity creation',
    'Sustainability in development initiatives',
    'Community empowerment through participatory leadership'
  ]
};

// Seed the database
const seedAboutData = async () => {
  try {
    // Check if data already exists
    const existingData = await About.findOne();
    
    if (existingData) {
      console.log('About data already exists. Updating...');
      await About.findByIdAndUpdate(existingData._id, sampleAboutData);
    } else {
      // Create new data
      const newData = new About(sampleAboutData);
      await newData.save();
    }
    
    console.log('About data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding about data:', error);
    process.exit(1);
  }
};

seedAboutData();