const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const User = require('./server/models/User');
const News = require('./server/models/News');
const Project = require('./server/models/Project');
const Constituency = require('./server/models/Constituency');
const Legislative = require('./server/models/Legislative');
const About = require('./server/models/About');
const Media = require('./server/models/Media');
const Contact = require('./server/models/Contact');
const Application = require('./server/models/Application');
const ApplicationSetting = require('./server/models/ApplicationSetting');
const ApplicationSupport = require('./server/models/ApplicationSupport');

console.log('Starting migration to MongoDB Atlas...');

// Connect to local database first
const localUri = 'mongodb://localhost:27017/ghali-dashboard';
console.log('Connecting to local database...');
mongoose.connect(localUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ Connected to local database');
  
  // Fetch all data from local database
  try {
    const users = await User.find();
    const news = await News.find();
    const projects = await Project.find();
    const constituencies = await Constituency.find();
    const legislatives = await Legislative.find();
    const abouts = await About.find();
    const media = await Media.find();
    const contacts = await Contact.find();
    const applications = await Application.find();
    const applicationSettings = await ApplicationSetting.find();
    const applicationSupports = await ApplicationSupport.find();
    
    console.log('Data fetched from local database:');
    console.log('- Users:', users.length);
    console.log('- News:', news.length);
    console.log('- Projects:', projects.length);
    console.log('- Constituencies:', constituencies.length);
    console.log('- Legislative:', legislatives.length);
    console.log('- About:', abouts.length);
    console.log('- Media:', media.length);
    console.log('- Contacts:', contacts.length);
    console.log('- Applications:', applications.length);
    console.log('- Application Settings:', applicationSettings.length);
    console.log('- Application Supports:', applicationSupports.length);
    
    // Close local connection
    await mongoose.connection.close();
    console.log('Disconnected from local database');
    
    // Connect to Atlas
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB Atlas');
    
    // Clear existing data in Atlas (optional - be careful!)
    console.log('Clearing existing data in Atlas...');
    await User.deleteMany();
    await News.deleteMany();
    await Project.deleteMany();
    await Constituency.deleteMany();
    await Legislative.deleteMany();
    await About.deleteMany();
    await Media.deleteMany();
    await Contact.deleteMany();
    await Application.deleteMany();
    await ApplicationSetting.deleteMany();
    await ApplicationSupport.deleteMany();
    
    console.log('✅ Cleared existing data');
    
    // Insert data to Atlas
    console.log('Inserting data to Atlas...');
    if (users.length > 0) await User.insertMany(users);
    if (news.length > 0) await News.insertMany(news);
    if (projects.length > 0) await Project.insertMany(projects);
    if (constituencies.length > 0) await Constituency.insertMany(constituencies);
    if (legislatives.length > 0) await Legislative.insertMany(legislatives);
    if (abouts.length > 0) await About.insertMany(abouts);
    if (media.length > 0) await Media.insertMany(media);
    if (contacts.length > 0) await Contact.insertMany(contacts);
    if (applications.length > 0) await Application.insertMany(applications);
    if (applicationSettings.length > 0) await ApplicationSetting.insertMany(applicationSettings);
    if (applicationSupports.length > 0) await ApplicationSupport.insertMany(applicationSupports);
    
    console.log('✅ Data migration completed successfully!');
    
    // Close Atlas connection
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB Atlas');
    
    console.log('\n🎉 Migration completed successfully!');
    console.log('You can now deploy your application to Vercel using the Atlas database.');
    
  } catch (error) {
    console.error('❌ Migration error:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
})
.catch((err) => {
  console.error('❌ Local database connection error:', err);
  process.exit(1);
});