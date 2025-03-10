"use server";
// lib/sendEmail.js
import nodemailer from "nodemailer";

export async function sendEmail(message, email) {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "qNp6F@example.com",
      to: email,
      subject: message,
      text: message, // Plain text version
      html: `<p>${message}</p>`, // HTML version
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}: ${message}`);
  } catch (error) {
    console.error("Error sending email to ${email}:", error);
    throw error; // Re-throw the error for workflow handling
  }
}
