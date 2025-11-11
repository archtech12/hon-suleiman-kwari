async function testFetch() {
  try {
    console.log('Testing fetch to http://localhost:5000/api/news');
    const response = await fetch('http://localhost:5000/api/news');
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Data received:', JSON.stringify(data, null, 2));
    } else {
      console.log('Error response:', await response.text());
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

testFetch();