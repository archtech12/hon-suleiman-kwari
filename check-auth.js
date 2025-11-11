// Check authentication status
function checkAuth() {
  console.log('Checking authentication status...');
  
  // Check if admin token exists in localStorage
  const token = localStorage.getItem('adminToken');
  
  if (token) {
    console.log('Admin token found');
    console.log('Token length:', token.length);
    
    // Try to decode the token (basic check)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Token payload:', payload);
      console.log('Token expires:', new Date(payload.exp * 1000));
      
      if (payload.exp * 1000 < Date.now()) {
        console.log('Token has expired!');
      } else {
        console.log('Token is still valid');
      }
    } catch (e) {
      console.log('Invalid token format');
    }
  } else {
    console.log('No admin token found in localStorage');
  }
  
  // Check if we're on admin page
  if (window.location.pathname.startsWith('/admin')) {
    console.log('Currently on admin page');
    if (!token) {
      console.log('Redirecting to login page...');
      // window.location.href = '/admin/login';
    }
  }
}

// Run the check
checkAuth();