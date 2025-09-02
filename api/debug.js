// Simple debug endpoint for testing
module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle both GET and POST for debugging
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: "API endpoint is working!",
      timestamp: new Date().toISOString(),
      environment: "Vercel",
      hasEmailUser: !!process.env.EMAIL_USER,
      hasEmailPass: !!process.env.EMAIL_PASS
    });
  }

  if (req.method === 'POST') {
    const { to, eventType, date, time } = req.body;
    
    return res.status(200).json({
      success: true,
      message: "POST request received successfully",
      receivedData: { to, eventType, date, time },
      timestamp: new Date().toISOString(),
      hasEmailUser: !!process.env.EMAIL_USER,
      hasEmailPass: !!process.env.EMAIL_PASS
    });
  }

  return res.status(405).json({ 
    success: false, 
    error: 'Method not allowed' 
  });
};
