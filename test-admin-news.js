// Test the admin news endpoint
async function testAdminNews() {
  try {
    console.log('Testing admin news endpoint...');
    
    // Test without token
    const response1 = await fetch('http://localhost:5000/api/news/admin');
    console.log('Without token - Status:', response1.status);
    if (!response1.ok) {
      console.log('Without token - Error:', await response1.text());
    }
    
    // Test with invalid token
    const response2 = await fetch('http://localhost:5000/api/news/admin', {
      headers: {
        'Authorization': 'Bearer invalid-token'
      }
    });
    console.log('With invalid token - Status:', response2.status);
    if (!response2.ok) {
      console.log('With invalid token - Error:', await response2.text());
    }
    
  } catch (error) {
    console.error('Admin test error:', error);
  }
}

testAdminNews();