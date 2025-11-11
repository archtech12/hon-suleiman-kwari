const bcrypt = require('bcryptjs');

// Test the password comparison
async function testBcrypt() {
  try {
    // This is the hashed password from our database
    const hashedPassword = '$2a$10$xSZjF6rfUl0e9H9Zq/lfTOPxysfoempm91NG/n8.wJsQudcUQ/4oi';
    const plainPassword = 'Admin123!';
    
    console.log('Testing password comparison...');
    console.log('Plain password:', plainPassword);
    console.log('Hashed password:', hashedPassword);
    
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    console.log('Passwords match:', isMatch);
    
    // Test with wrong password
    const isMatchWrong = await bcrypt.compare('WrongPassword', hashedPassword);
    console.log('Wrong password matches:', isMatchWrong);
  } catch (error) {
    console.error('Error:', error);
  }
}

testBcrypt();