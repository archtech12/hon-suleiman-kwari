// Simple test to verify the news page is working
async function testNewsPage() {
  try {
    // Test the API endpoint directly first
    console.log('Testing API endpoint...');
    const apiResponse = await fetch('http://localhost:5000/api/news');
    console.log('API Status:', apiResponse.status);
    
    if (apiResponse.ok) {
      const apiData = await apiResponse.json();
      console.log('API returned', apiData.length, 'news items');
      
      // Test the frontend page by making a request to it
      console.log('Testing frontend page...');
      // Note: We can't easily test the frontend page from Node.js without a browser
      // But we can verify the data structure is correct
      console.log('Sample news item structure:');
      if (apiData.length > 0) {
        console.log('- ID:', apiData[0]._id);
        console.log('- Title:', apiData[0].title);
        console.log('- Excerpt:', apiData[0].excerpt);
        console.log('- Category:', apiData[0].category);
        console.log('- Created At:', apiData[0].createdAt);
      }
    } else {
      console.log('API Error:', await apiResponse.text());
    }
  } catch (error) {
    console.error('Test error:', error);
  }
}

testNewsPage();