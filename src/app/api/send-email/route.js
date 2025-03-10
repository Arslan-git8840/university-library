// api/send-email.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  const { email } = req.body;
  
  // Create a transporter
  const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
  // Send email
  try {
    await transporter.sendMail({
      from: '"Your App" <noreply@yourapp.com>',
      to: email,
      subject: "Login Notification",
      text: `Hello ${email}, we noticed a new login to your account.`,
      html: `<p>Hello ${email},</p><p>We noticed a new login to your account.</p>`
    });
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}