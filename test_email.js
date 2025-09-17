require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
  console.log('Testing email configuration...');
  console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not set');
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('EMAIL_USER or EMAIL_PASS not set in .env');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    // Verify connection
    await transporter.verify();
    console.log('SMTP connection successful');

    // Send test email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'kavyasiddharthan07@gmail.com',
      subject: 'Test Email from Portfolio Backend',
      text: 'This is a test email to verify the email configuration is working.'
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Test email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Email test failed:', error.message);
    if (error.response) {
      console.error('SMTP response:', error.response);
    }
    if (error.responseCode) {
      console.error('SMTP response code:', error.responseCode);
    }
  }
}

testEmail();
