const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase limit for base64 images

// Function to create security alert email HTML
function createSecurityAlertEmail(data) {
  const { eventType, date, time, mapsUrl, hasImages } = data;
  
  const imageSection = hasImages ? `
    <div style="margin: 20px 0;">
      <p><strong>📸 Captured Images:</strong></p>
      ${data.hasImage1 ? `
        <div style="margin: 10px 0;">
          <p>Image 1:</p>
          <img src="cid:image1" alt="Security Alert Image 1" style="max-width: 100%; height: auto; border: 2px solid #ff4444; border-radius: 5px; padding: 10px">
        </div>
      ` : ''}
      ${data.hasImage2 ? `
        <div style="margin: 10px 0;">
          <p>Image 2:</p>
          <img src="cid:image2" alt="Security Alert Image 2" style="max-width: 100%; height: auto; border: 2px solid #ff4444; border-radius: 5px; padding: 10px">
        </div>
      ` : ''}
    </div>
  ` : '';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
            .alert-header { background: #ff4444; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .alert-content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; border: 2px solid #ff4444; }
            .event-details { background: white; padding: 15px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #ff4444; }
            .maps-button { display: inline-block; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin: 15px 0; border-width: 1; border-style: solid; border-color: #ff4444; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="alert-header">
            <h1>🚨 SECURITY ALERT</h1>
            <p>Smart Security System</p>
        </div>
        <div class="alert-content">
            <h2>Security Event Detected</h2>
            <p>This is an email from Smart Security System</p>
            
            <div class="event-details">
                <strong>Event Type:</strong> ${eventType}<br>
                <strong>Date:</strong> ${date}<br>
                <strong>Time:</strong> ${time}
            </div>
            
            <p>Immediate action may be required.</p>
            ${mapsUrl ? `<a href="${mapsUrl}" class="maps-button">📍 View Location on Maps</a>` : ''}
            
            <div style="margin: 20px 0;" id="image-section">
              ${imageSection}
            </div>
                        
        </div>
        <div class="footer">
            <p>Smart Security System - Automated Alert</p>
        </div>
    </body>
    </html>
  `;
}

// POST /send-security-alert
app.post("/send-security-alert", async (req, res) => {
  const { to, eventType, date, time, mapsUrl, image1, image2 } = req.body;

  // Validate required fields
  if (!to || !eventType || !date || !time) {
    return res.status(400).json({ 
      success: false, 
      error: "Missing required fields: to, eventType, date, time" 
    });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Check if images are provided
    const hasImages = image1 || image2;

    // Create email content
    const htmlContent = createSecurityAlertEmail({ 
      eventType, 
      date, 
      time, 
      mapsUrl, 
      hasImages,
      hasImage1: !!image1,
      hasImage2: !!image2
    });

    // Prepare attachments array with CID
    const attachments = [];
    
    if (image1) {
      try {
        const base64Data = image1.startsWith('data:image/') ? image1.split(',')[1] : image1;
        attachments.push({
          filename: `security_alert_image_1_${date}_${time.replace(/:/g, '-')}.png`,
          content: base64Data,
          encoding: 'base64',
          cid: 'image1' // Content-ID for referencing in HTML
        });
      } catch (err) {
        console.error('Error processing image1:', err);
      }
    }
    
    if (image2) {
      try {
        const base64Data = image2.startsWith('data:image/') ? image2.split(',')[1] : image2;
        attachments.push({
          filename: `security_alert_image_2_${date}_${time.replace(/:/g, '-')}.png`,
          content: base64Data,
          encoding: 'base64',
          cid: 'image2' // Content-ID for referencing in HTML
        });
      } catch (err) {
        console.error('Error processing image2:', err);
      }
    }

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: `🚨 SECURITY ALERT FROM SMART SECURITY SYSTEM`,
      html: htmlContent,
      text: `SECURITY ALERT from Smart Security System\n\nEvent: ${eventType}\nDate: ${date}\nTime: ${time}${mapsUrl ? `\nLocation: ${mapsUrl}` : ''}\n\n${hasImages ? 'Images included in email.\n\n' : ''}This is an automated alert. Take immediate action if unauthorized.`,
      attachments: attachments
    };

    // Send mail
    await transporter.sendMail(mailOptions);
    
    const imageInfo = hasImages ? ` with ${attachments.length} embedded image(s)` : '';
    res.status(200).json({ 
      success: true, 
      message: `Security alert sent successfully${imageInfo}`,
      imagesEmbedded: attachments.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to send security alert" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Smart Security System Email Server running on port ${PORT}`));
