// Quick test script to check Vercel API
const testVercelAPI = async () => {
  console.log('🧪 Testing Vercel API...');
  
  try {
    // Test 1: Check if debug endpoint works
    console.log('\n1️⃣ Testing debug endpoint...');
    const debugResponse = await fetch('https://email-backend-liard.vercel.app/api/debug');
    const debugData = await debugResponse.json();
    console.log('Debug Response:', debugData);
    
    // Test 2: Check if main API accepts requests
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
    
    const apiData = await apiResponse.json();
    console.log('API Response:', {
      status: apiResponse.status,
      data: apiData
    });
    
    // Analysis
    console.log('\n📊 Analysis:');
    if (debugData.hasEmailUser && debugData.hasEmailPass) {
      console.log('✅ Environment variables are set');
    } else {
      console.log('❌ Environment variables missing:');
      console.log(`   EMAIL_USER: ${debugData.hasEmailUser ? '✅' : '❌'}`);
      console.log(`   EMAIL_PASS: ${debugData.hasEmailPass ? '✅' : '❌'}`);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
};

// Run the test
testVercelAPI();
