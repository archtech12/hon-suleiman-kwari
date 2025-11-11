const http = require('http');

// Test the news admin endpoint
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/news/admin',
  method: 'GET',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTEwOWFlNGIyNTM1M2UwZTRmMmFiYjkiLCJpYXQiOjE3NjI2OTc4NTIsImV4cCI6MTc2MzMwMjY1Mn0.J4Jx6GBz7F1N6O-HQ2NuoqLyxl5t-xJh1z5MMYHhpSY'
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  
  res.on('data', (chunk) => {
    console.log(`Body: ${chunk}`);
  });
  
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end();