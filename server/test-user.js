const User = require('./models/User');

async function testUser() {
  try {
    console.log('Testing User model...');
    
    const testUser = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: '123456'
    });
    
    await testUser.save();
    console.log('✅ User created successfully!');
    console.log('User:', testUser);
    
  } catch (error) {
    console.error('❌ Error creating user:', error);
  }
}

testUser();
