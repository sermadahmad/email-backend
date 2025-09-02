// Test script for local development
const testLocalAPI = async () => {
  try {
    const response = await fetch('http://localhost:5000/send-security-alert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'test@example.com', // Replace with your email
        eventType: 'Motion Detected - Local Test',
        date: '2025-09-02',
        time: '15:30:25',
        mapsUrl: 'https://maps.google.com',
        // image1: 'data:image/png;base64,...', // Add if testing images
      })
    });

    const result = await response.json();
    console.log('Local API Response:', result);
  } catch (error) {
    console.error('Error testing local API:', error);
  }
};

// Uncomment to run test
// testLocalAPI();

console.log('Test script loaded. Call testLocalAPI() to test your local server.');
console.log('Make sure to:');
console.log('1. Update the "to" email address');
console.log('2. Set up your EMAIL_USER and EMAIL_PASS in .env file');
console.log('3. Run: npm start (in another terminal)');
