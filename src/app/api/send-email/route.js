import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { email } = await req.json(); 
    
    // if (!email) {
    //   return NextResponse.json({ error: "Email is required" }, { status: 400 });
    // }

    // // Create a transporter
    // const transporter = nodemailer.createTransport({
    //   host: "sandbox.smtp.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });

    // // Send email
    // await transporter.sendMail({
    //   from: '"Your App" <noreply@yourapp.com>',
    //   to: email,
    //   subject: "Login Notification",
    //   text: `Hello ${email}, we noticed a new login to your account.`,
    //   html: `<p>Hello ${email},</p><p>We noticed a new login to your account.</p>`,
    // });
    return NextResponse.redirect(new URL('/library', req.url));
    // return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
