const fs = require('fs');
const path = require('path');

console.log('🔍 Checking deployment readiness...\n');

// Check if required files exist
const requiredFiles = [
  '.env',
  'package.json',
  'server/server.js',
  'vercel.json'
];

let allFilesExist = true;
console.log('📁 Checking required files:');
requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} (MISSING)`);
    allFilesExist = false;
  }
});

console.log('');

// Check environment variables manually
console.log('🔑 Checking environment variables:');
const envContent = fs.readFileSync('.env', 'utf8');
const envLines = envContent.split('\n');

let mongodbUri = '';
let jwtSecret = '';
let port = '';

envLines.forEach(line => {
  if (line.startsWith('MONGODB_URI=')) {
    mongodbUri = line.split('=')[1];
  } else if (line.startsWith('JWT_SECRET=')) {
    jwtSecret = line.split('=')[1];
  } else if (line.startsWith('PORT=')) {
    port = line.split('=')[1];
  }
});

if (mongodbUri) {
  console.log('  ✅ MONGODB_URI');
  if (mongodbUri.includes('mongodb.net')) {
    console.log('    🟢 MongoDB Atlas connection string detected');
  } else if (mongodbUri.includes('localhost')) {
    console.log('    🟡 MongoDB localhost connection string detected - change to Atlas for production');
  } else {
    console.log('    🔵 MongoDB connection string format unknown');
  }
} else {
  console.log('  ❌ MONGODB_URI (NOT SET)');
}

if (jwtSecret) {
  console.log('  ✅ JWT_SECRET');
} else {
  console.log('  ❌ JWT_SECRET (NOT SET)');
}

if (port) {
  console.log('  ✅ PORT');
} else {
  console.log('  ❌ PORT (NOT SET)');
}

console.log('');

// Check if deployment scripts exist
console.log('🚀 Checking deployment scripts:');
const deploymentScripts = [
  'test-atlas.js',
  'migrate-to-atlas.js',
  'DEPLOYMENT-GUIDE.md'
];

deploymentScripts.forEach(script => {
  const fullPath = path.join(__dirname, script);
  if (fs.existsSync(fullPath)) {
    console.log(`  ✅ ${script}`);
  } else {
    console.log(`  ❌ ${script} (MISSING)`);
  }
});

console.log('');

// Final assessment
console.log('📋 Final Assessment:');
if (allFilesExist && mongodbUri && jwtSecret && port) {
  console.log('  🎉 All required files and environment variables are present!');
  console.log('  🚀 You are ready to deploy to Vercel!');
  console.log('  📖 Check DEPLOYMENT-GUIDE.md for detailed deployment instructions.');
} else {
  console.log('  ⚠️  Some required files or environment variables are missing.');
  console.log('  📖 Please check the output above and ensure all requirements are met.');
}

console.log('');
console.log('💡 Deployment Tips:');
console.log('  1. Make sure your MongoDB Atlas connection string is correct');
console.log('  2. Verify all environment variables are set in Vercel dashboard');
console.log('  3. Test the Atlas connection with: npm run test-atlas');
console.log('  4. Migrate data to Atlas with: npm run migrate-atlas');
console.log('  5. Deploy with: npm run deploy');