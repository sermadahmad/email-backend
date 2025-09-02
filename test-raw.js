// Enhanced test to see the actual response
const testVercelAPIRaw = async () => {
  console.log('🧪 Testing Vercel API (Raw Response)...');
  
  try {
    // Test debug endpoint
    console.log('\n1️⃣ Testing debug endpoint...');
    const debugResponse = await fetch('https://email-backend-liard.vercel.app/api/debug');
    const debugText = await debugResponse.text();
    console.log('Debug Response Status:', debugResponse.status);
    console.log('Debug Response Text:', debugText.substring(0, 500) + '...');
    
    // Test main API
    console.log('\n2️⃣ Testing main API endpoint...');
    const apiResponse = await fetch('https://email-backend-liard.vercel.app/api/send-security-alert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'test@example.com',
        eventType: 'Test Event',
        date: '2025-09-02',
        time: '15:30:00'
      })
    });
    
    const apiText = await apiResponse.text();
    console.log('API Response Status:', apiResponse.status);
    console.log('API Response Text:', apiText.substring(0, 500) + '...');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
};

// Run the test
testVercelAPIRaw();
