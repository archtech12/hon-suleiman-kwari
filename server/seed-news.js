const mongoose = require('mongoose');
const News = require('./models/News');

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ghali-dashboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

const sampleNews = [
  {
    title: "Dr Ghali Mustapha Tijjani Phanda's Recent Community Engagement",
    excerpt: "Mai Fada Da Cikawa Muddin Yace Zaiyi To Babu Makawa Sai Yayi. Jiya Asabar Kenan 05/10/2024.",
    content: "Mai Fada Da Cikawa Muddin Yace Zaiyi To Babu Makawa Sai Yayi. Jiya Asabar Kenan 05/10/2024 Idda Dan Majalissa Mai Wakiltar Gaya Ajingi Albasu Ya Gwangwaje Shugabannin Matasa (Youth Leaders) Na Ko Wacce Mazaba Datake Gaya Ajingi Da Albasu. Shine Yasa Ya Bude Bada Tallafi Ba Dare Ba Rana Tare Da Ayyukan Alkhairi Domin Amfanuwar Al'ummarsa. Dr Ghali Mustapha Tijjani Phanda Allah Ubangiji Ya Cigaba Da Taimaka Maka.",
    category: "Announcement",
    author: "Hon. Dr. Ghali Mustapha Tijjani Phanda",
    published: true
  },
  {
    title: "Political Dialogue with Youth Leaders",
    excerpt: "Option A.Da B.Pdp Nnpp Da Injinan Malkade Dan Karkari Domin Dogaro Da Kansu.",
    content: "Option A.Da B.Pdp Nnpp Da Injinan Malkade Dan Karkari Domin Dogaro Da Kansu. Tabbas Dr Ghali Mustapha Tijjani Phanda Mutumin Kirki Ne Mai San Cigaban Al'umma Da Ayyukan Raya Kasa. Shine Yasa Ya Bude Bada Tallafi Ba Dare Ba Rana Tare Da Ayyukan Alkhairi Domin Amfanuwar Al'ummarsa. Dr Ghali Mustapha Tijjani Phanda Allah Ubangiji Ya Cigaba Da Taimaka Maka.",
    category: "Event",
    author: "Hon. Dr. Ghali Mustapha Tijjani Phanda",
    published: true
  },
  {
    title: "Continued Community Support Initiatives",
    excerpt: "Shine Yasa Ya Bude Bada Tallafi Ba Dare Ba Rana Tare Da Ayyukan Alkhairi.",
    content: "Shine Yasa Ya Bude Bada Tallafi Ba Dare Ba Rana Tare Da Ayyukan Alkhairi Domin Amfanuwar Al'ummarsa. Dr Ghali Mustapha Tijjani Phanda Allah Ubangiji Ya Cigaba Da Taimaka Maka. Mai Fada Da Cikawa Muddin Yace Zaiyi To Babu Makawa Sai Yayi. Jiya Asabar Kenan 05/10/2024 Idda Dan Majalissa Mai Wakiltar Gaya Ajingi Albasu Ya Gwangwaje Shugabannin Matasa (Youth Leaders) Na Ko Wacce Mazaba Datake Gaya Ajingi Da Albasu.",
    category: "Achievement",
    author: "Hon. Dr. Ghali Mustapha Tijjani Phanda",
    published: true
  }
];

const seedNews = async () => {
  try {
    // Clear existing news
    await News.deleteMany();
    console.log('Cleared existing news items');
    
    // Insert sample news
    const createdNews = await News.insertMany(sampleNews);
    console.log(`Created ${createdNews.length} sample news items`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding news:', error);
    process.exit(1);
  }
};

// Run seed after a short delay to ensure DB connection
setTimeout(seedNews, 2000);