const axios = require('axios');

async function testNewsAPI() {
  try {
    console.log('Testing news API endpoint...');
    const response = await axios.get('http://localhost:5000/api/news/admin');
    console.log('Status:', response.status);
    console.log('Data:', response.data);
  } catch (error) {
    console.log('Error:', error.message);
    if (error.response) {
      console.log('Response status:', error.response.status);
      console.log('Response data:', error.response.data);
    }
  }
}

testNewsAPI();