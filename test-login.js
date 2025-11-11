// Test admin login
async function testLogin() {
  try {
    console.log('Testing admin login...');
    
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@ghalipanda.gov.ng',
        password: 'Admin123!'
      }),
    });
    
    console.log('Login response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Login successful!');
      console.log('Token received:', data.token ? 'Yes' : 'No');
      if (data.token) {
        console.log('Token length:', data.token.length);
        // Test using the token
        testAdminAPI(data.token);
      }
    } else {
      const errorData = await response.json();
      console.log('Login failed:', errorData.message);
    }
  } catch (error) {
    console.error('Login error:', error);
  }
}

async function testAdminAPI(token) {
  try {
    console.log('Testing admin API with token...');
    
    const response = await fetch('http://localhost:5000/api/news/admin', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('Admin API response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Admin API successful, found', data.length, 'news items');
    } else {
      const errorData = await response.json();
      console.log('Admin API failed:', errorData.message);
    }
  } catch (error) {
    console.error('Admin API error:', error);
  }
}

testLogin();