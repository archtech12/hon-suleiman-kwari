// Test to see what the frontend receives
async function testFrontendNews() {
  try {
    console.log('Testing frontend news fetch...');
    
    // Simulate what the frontend does
    const response = await fetch('http://localhost:5000/api/news');
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Number of news items received:', data.length);
      console.log('First news item:', JSON.stringify(data[0], null, 2));
      
      // Check if items are published
      const publishedItems = data.filter(item => item.published === true);
      console.log('Published items:', publishedItems.length);
      
      const unpublishedItems = data.filter(item => item.published !== true);
      console.log('Unpublished items:', unpublishedItems.length);
    } else {
      console.log('Error response:', await response.text());
    }
  } catch (error) {
    console.error('Frontend test error:', error);
  }
}

testFrontendNews();