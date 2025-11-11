// Test projects API
async function testProjects() {
  try {
    console.log('Testing projects API...');
    
    const response = await fetch('http://localhost:5000/api/projects');
    
    console.log('Projects API response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Projects API returned', data.length, 'items');
      
      if (data.length > 0) {
        console.log('Sample project:');
        console.log('- Title:', data[0].title);
        console.log('- Category:', data[0].category);
        console.log('- Status:', data[0].status);
      }
    } else {
      console.log('Error:', response.status, await response.text());
    }
  } catch (error) {
    console.error('Projects API error:', error);
  }
}

testProjects();