"use server";
import { db } from "@/db/drizzle";
import { books, borrowRecords, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Client } from "@upstash/qstash";

const client = new Client({ token: process.env.QSTASH_TOKEN });

export async function saveUser(data) {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email))
      .limit(1);
    // Check if the returned user array has any elements
    if (user.length > 0) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    const newUser = await db.insert(users).values(data).returning();
    return {
      success: true,
      message: "User created successfully",
      data: newUser,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export const updateUser = async (id) => {
  try {
    const user = await db
      .update(users)
      .set({ status: "APPROVED" })
      .where(eq(users.id, id));
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
};

export const deleteUser = async (id) => {
  try {
    console.log("Deleting user with id:", id);
    await db.delete(borrowRecords).where(eq(borrowRecords.userId, id));
    const user = await db.delete(users).where(eq(users.id, id));
    console.log("User deleted:", user);
    return {
      success: true,
    };
  } catch (error) {
    console.log("Error in deleteUser:", error);
    return {
      success: false,
    };
  }
};

export const addBook = async (data) => {
  try {
    const addedBook = await db.insert(books).values(data);
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
};

export const bookToDelete = async (id) => {
  try {
    await db.delete(books).where(eq(books.id, id));
    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
};

// export const updateBook = async ({ data, id }) => {
//   try {
//     await db.update(books).set(data).where(eq(books.id, id));
//     return {
//       success: true,
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       success: false,
//     };
//   }
// };

export const updateBook = async ({ data, id }) => {
  try {
    // Remove undefined or null fields from data
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== undefined && value !== ""
      )
    );

    if (Object.keys(cleanData).length === 0) {
      return {
        success: false,
        message: "No valid fields provided for update.",
      };
    }

    await db.update(books).set(cleanData).where(eq(books.id, id));

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Database error",
    };
  }
};

export const getSpecificBooks = async (offset, limit) => {
  try {
    const bookList = await db.select().from(books).offset(offset).limit(limit);
    console.log(bookList);
    return {
      success: true,
      data: bookList,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
};

export const borrowBook = async (userId, bookId) => {
  try {
    // Fetch user data
    const user = await db.select().from(users).where(eq(users.id, userId));
    const isEligible = user[0].status === "APPROVED";

    if (!isEligible) {
      return {
        success: false,
        message: "User is not eligible to borrow books.",
      };
    }

    // Update user's book borrowed count
    const response = await db
      .update(users)
      .set({ bookBorrowed: user[0].bookBorrowed + 1 })
      .where(eq(users.id, userId));

    // Set the borrow date (current date)
    const borrowDate = new Date();

    // Calculate the due date (6 days from the borrow date)
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + 6); // 6 days from the borrow date

    // Calculate the return date (6 days from borrow date)
    const returnDate = new Date(borrowDate);
    returnDate.setDate(returnDate.getDate() + 6); // You can adjust this logic if you want dynamic calculation

    // Insert new borrow record with the calculated dueDate and returnDate
    await db.insert(borrowRecords).values({
      userId,
      bookId,
      borrowDate: borrowDate,
      dueDate: dueDate, // 6 days from borrowDate
      returnDate: returnDate, // 6 days from borrowDate
      status: "BORROWED",
    });

    if (response) {
      return {
        success: true,
        message: "Book borrowed successfully.",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong while borrowing the book.",
    };
  }
};

// Function to check days remaining until the due date
export const getDaysLeft = async (borrowRecordId) => {
  try {
    const borrowRecord = await db
      .select()
      .from(borrowRecords)
      .where(eq(borrowRecords.id, borrowRecordId))
      .limit(1);

    if (!borrowRecord || borrowRecord.length === 0) {
      return { success: false, message: "Borrow record not found." };
    }

    const { dueDate } = borrowRecord[0];
    const currentDate = new Date();

    // Calculate the difference in days between dueDate and currentDate
    const timeDiff = dueDate - currentDate;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert ms to days

    return {
      success: true,
      daysLeft,
      message:
        daysLeft >= 0
          ? `${daysLeft} days left to return the book.`
          : `${Math.abs(daysLeft)} days late`,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong while fetching days left.",
    };
  }
};

export const getBorrowedBook = async () => {
  try {
    const response = await db
      .select()
      .from(borrowRecords)
      .innerJoin(users, eq(borrowRecords.userId, users.id)) // Join users on userId
      .innerJoin(books, eq(borrowRecords.bookId, books.id)); // Join books on bookId;

    console.log("Borrowed Books Response:", response);

    // Schedule a task to trigger an event
    // await client.schedules.create({
    //   destination: `https://university-library-tan.vercel.app/api/send-email`,
    //   cron: "*/5 * * * *", // Runs every 5 minutes (for testing purposes),
    //   body: JSON.stringify({
    //     email: response[0]?.users?.email,
    //   }),
    // });

    // Schedule a task to trigger an event
    // await client.schedules.create({
    //   destination: "https://university-library-tan.vercel.app/api/workflow", // Your API endpoint
    //   cron: "*/5 * * * *", // Runs every 5 minutes (for testing)
    //   method: "POST", // Ensure this matches your API method
    //   body: JSON.stringify({
    //     message: "This is a test trigger", // Adjust payload as needed
    //   }),
    // });

    if (!response || response.length === 0) {
      return { success: false, message: "No borrowed books found." };
    } else {
      return { success: true, data: response };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong while fetching borrowed books.",
    };
  }
};
