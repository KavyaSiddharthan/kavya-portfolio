const fetch = require('node-fetch');

const baseUrl = 'http://localhost:3003';

async function testContact() {
  const response = await fetch(baseUrl + '/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test User',
      email: 'testuser@example.com',
      message: 'Hello from API test'
    })
  });
  const data = await response.json();
  console.log('Contact API response:', data);
}

async function testNote() {
  const response = await fetch(baseUrl + '/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sender: 'Test Sender',
      note: 'This is a test note'
    })
  });
  const data = await response.json();
  console.log('Note API response:', data);
}

async function testLike() {
  const response = await fetch(baseUrl + '/api/like', {
    method: 'POST'
  });
  const data = await response.json();
  console.log('Like API response:', data);
}

async function runTests() {
  try {
    await testContact();
    await testNote();
    await testLike();
  } catch (error) {
    console.error('Error during API tests:', error);
  }
}

runTests();
