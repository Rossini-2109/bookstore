async function testAuth() {
  try {
    console.log('Testing register endpoint...');
    
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser',
        email: 'test@test.com',
        password: 'test123'
      })
    });

    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', data);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAuth();
