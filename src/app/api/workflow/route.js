import { serve } from "@upstash/workflow/nextjs";
import { users } from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
export const { POST } = serve(async (context) => {
  const { email } = context.requestPayload;

  await context.run("new-signup", async () => {
    await sendEmail("Welcome to the platform", email);
  });

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail("Email to non-active users", email);
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail("Send newsletter to active users", email);
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});



async function sendEmail(subject, email) {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io", // Change this for production
    port: 2525,
    auth: {
      user: process.env.EMAIL_USER, // Set in .env file
      pass: process.env.EMAIL_PASS, // Set in .env file
    },
  });

  await transporter.sendMail({
    from: '"Your App" <noreply@yourapp.com>',
    to: email,
    subject: subject,
    text: `Hello, ${subject}`,
    html: `<p>Hello, ${subject}</p>`,
  });

  console.log(`📧 Email sent: ${subject} to ${email}`);
}


async function getUserState(email) {
  const user = await db.select().from(users).where(eq(users.email, email));

  if (!user || user.length === 0) return "non-active";

  const lastLogin = user[0].lastActivityDate;
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  return lastLogin < threeDaysAgo ? "non-active" : "active";
}



