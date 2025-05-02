// server.js - Main entry point for LavishEscapes backend

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer'); // for contact form
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve frontend files (make sure 'index.html' and assets are in 'frontend' folder)
app.use(express.static(path.join(__dirname, 'frontend')));

// Contact Form Route - Handles POST from contact form in script.js
app.post('/send-email', async (req, res) => {
  const { name, email, phone, message, destination } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please fill in all required fields.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or use Mailgun, SendGrid, etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
      subject: `New Inquiry from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Destination: ${destination}
Message: ${message}
            `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

// Serve static frontend first
app.use(express.static(path.join(__dirname, 'frontend')));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
