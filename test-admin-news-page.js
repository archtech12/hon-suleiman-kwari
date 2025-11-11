// Test what happens when accessing admin news page without token
async function testAdminNewsPage() {
  try {
    console.log('Testing admin news page behavior...');
    
    // Simulate what happens in the admin news page component
    const response = await fetch('http://localhost:5000/api/news/admin', {
      headers: {
        'Authorization': `Bearer ${null}` // Simulate no token
      }
    });
    
    console.log('Admin API response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Admin API returned', data.length, 'items');
    } else {
      const errorText = await response.text();
      console.log('Admin API error:', errorText);
      
      // This is what would trigger the "Failed to fetch news items" error
      if (response.status === 401) {
        console.log('This would cause the "Failed to fetch news items" error in the admin page');
      }
    }
  } catch (error) {
    console.error('Admin page test error:', error);
  }
}

testAdminNewsPage();