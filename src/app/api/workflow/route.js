// import { serve } from "@upstash/workflow/nextjs";
// import axios from "axios";

// export const { POST } = serve(async (context) => {
//   const { email } = context.requestPayload;

//   // Send a welcome email
//   await context.run("new-signup", async () => {
//     await axios.post("/api/send-email", { email, subject: "Welcome to the platform" });
//   });

//   // Wait for 3 days
//   await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

//   while (true) {
//     // Fetch all users' states
//     const users = await context.run("check-user-state", async () => {
//       const { data } = await axios.get("/api/userState");
//       return data; // Expecting an array of users with { email, status }
//     });

//     // Separate active and inactive users
//     const activeUsers = users.filter(user => user.status === "active");
//     const inactiveUsers = users.filter(user => user.status !== "active");

//     // Send email to inactive users
//     if (inactiveUsers.length > 0) {
//       await context.run("send-email-non-active", async () => {
//         await Promise.all(
//           inactiveUsers.map(user =>
//             axios.post("/api/send-email", { email: user.email, subject: "Hey, we missed you" })
//           )
//         );
//       });
//     }

//     // Send email to active users
//     if (activeUsers.length > 0) {
//       await context.run("send-email-active", async () => {
//         await Promise.all(
//           activeUsers.map(user =>
//             axios.post("/api/send-email", { email: user.email, subject: "Hey, we have a new book" })
//           )
//         );
//       });
//     }

//     // Wait for 1 month before checking again
//     await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
//   }
// });

import { serve } from "@upstash/workflow/nextjs";
import axios from "axios";

export const { POST } = serve(async (context) => {
  // const { email } = context.requestPayload;

  // // Send a welcome email (Testing Immediately)
  // await context.run("new-signup", async () => {
  //   console.log(`📧 Sending welcome email to: ${email}`);
  //   await axios.post("/api/send-email", {
  //     email,
  //     subject: "Welcome to the platform",
  //   });
  // });

  // Wait for only 10 seconds (For testing instead of 3 days)
  await context.sleep("wait-for-testing", 10);
  console.log("resumed after sleep")
  for (let i = 0; i < 3; i++) {
    // Run the loop 3 times for testing
    // Fetch user states
    const users = await context.run("check-user-state", async () => {
      console.log("Fetching users...");
      const { data } = await axios.get("https://university-library-tan.vercel.app/api/userState");
      console.log("Fetched users:", data.userStates);
      return data.userStates; // Expecting an array of users with { email, status }
    });

    // Separate active and inactive users
    const activeUsers = users.filter((user) => user.status === "active");
    const inactiveUsers = users.filter((user) => user.status !== "active");

    // Send email to inactive users
    if (inactiveUsers.length > 0) {
      await context.run("send-email-non-active", async () => {
        console.log(
          `📧 Sending 'miss you' email to inactive users:`,
          inactiveUsers.map((u) => u.email)
        );
        await Promise.all(
          inactiveUsers.map((user) =>
            axios.post("https://university-library-tan.vercel.app/api/send-email", {
              email: user.email,
              subject: "Hey, we missed you",
            })
          )
        );
      });
    }

    // Send email to active users
    if (activeUsers.length > 0) {
      await context.run("send-email-active", async () => {
        console.log(
          `📧 Sending newsletter to active users:`,
          activeUsers.map((u) => u.email)
        );
        await Promise.all(
          activeUsers.map((user) =>
            axios.post("https://university-library-tan.vercel.app/api/send-email", {
              email: user.email,
              subject: "Hey, we have a new book",
            })
          )
        );
      });
    }

    // Wait for 10 seconds instead of 1 month (For testing)
    await context.sleep("wait-for-next-check", 10);
  }

  console.log("✅ Testing completed. Emails sent successfully.");
});
