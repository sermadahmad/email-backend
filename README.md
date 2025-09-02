# 🚨 Smart Security Email Backend API

A Node.js email backend service that sends formatted security alert emails with embedded images. Deployed on Vercel's free tier.

## 🌐 Live API
- **Production URL:** `https://email-backend-liard.vercel.app`
- **API Endpoint:** `https://email-backend-liard.vercel.app/api/send-security-alert`

## � Usage

### Send Security Alert Email
```javascript
fetch('https://email-backend-liard.vercel.app/api/send-security-alert', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    to: 'recipient@email.com',
    eventType: 'Motion Detected',
    date: '2025-09-02',
    time: '15:30:25',
    mapsUrl: 'https://maps.google.com/...',
    image1: 'data:image/png;base64,...', // optional
    image2: 'data:image/png;base64,...'  // optional
  })
})
```

### Required Parameters
- `to` - Recipient email address
- `eventType` - Type of security event
- `date` - Date of the event (YYYY-MM-DD)
- `time` - Time of the event (HH:MM:SS)

### Optional Parameters
- `mapsUrl` - Google Maps location URL
- `image1` - Base64 encoded image
- `image2` - Base64 encoded image

## 🛠️ Local Development

### Prerequisites
- Node.js installed
- Gmail account with App Password enabled

### Setup
1. **Clone and install:**
   ```bash
   git clone https://github.com/sermadahmad/email-backend.git
   cd email-backend
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file:
   ```
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-gmail-app-password
   PORT=5000
   ```

3. **Run locally:**
   ```bash
   npm start
   # Server runs on: http://localhost:5000
   # API endpoint: http://localhost:5000/send-security-alert
   ```

## 🚀 Deployment

### Vercel (Current)
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `EMAIL_USER`
   - `EMAIL_PASS`
3. Auto-deploys on git push

### Gmail App Password Setup
1. Enable 2-Factor Authentication on Gmail
2. Go to Google Account → Security → 2-Step Verification → App passwords
3. Generate app password for "Mail"
4. Use this password in `EMAIL_PASS` environment variable

## 📁 Project Structure
```
email-backend/
├── api/
│   └── send-security-alert.js    # Main API endpoint
├── public/
│   └── index.html                # API documentation page
├── .env.example                  # Environment template
├── package.json
├── server.js                     # Local development server
└── vercel.json                   # Vercel configuration
```

## ✅ Features
- ✅ Formatted HTML email templates
- ✅ Embedded image support (Base64)
- ✅ CORS enabled
- ✅ Error handling
- ✅ Gmail integration
- ✅ Free Vercel hosting
- ✅ Local development support

## 📊 Free Tier Limits (Vercel)
- 1000 function invocations per day
- 10 second execution timeout
- 100 GB bandwidth per month
- Perfect for security systems!

## 🔧 Tech Stack
- **Backend:** Node.js, Express
- **Email:** Nodemailer with Gmail
- **Hosting:** Vercel Serverless Functions
- **Frontend:** Simple HTML documentation

---
*Smart Security System Email Backend - Ready for production! 🎯*
