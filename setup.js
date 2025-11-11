// Setup script to initialize the application
const fs = require('fs');
const path = require('path');

console.log('Setting up Ghali Political Campaign Website...');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'server', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✓ Created uploads directory');
}

// Check if .env file exists in server directory
const envPath = path.join(__dirname, 'server', '.env');
if (!fs.existsSync(envPath)) {
  const envExamplePath = path.join(__dirname, 'server', '.env.example');
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✓ Created .env file from example');
  }
}

console.log('\nSetup complete! Next steps:');
console.log('1. Update the .env file in the server directory with your configuration');
console.log('2. Run "npm install" in both the root and server directories');
console.log('3. Start the backend server: cd server && npm run dev');
console.log('4. Start the frontend: npm run dev');
console.log('5. Access the application at http://localhost:3000');