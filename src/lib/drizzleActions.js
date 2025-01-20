"use server";
import { db } from "@/db/drizzle";
import { books, users } from "@/db/schema";
import { eq } from "drizzle-orm";

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
    const user = await db.delete(users).where(eq(users.id, id));
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

export const updateBook = async ({ data, id }) => {
  try {
    await db.update(books).set().where(eq(books.id, id));
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

export const getSpecificBooks = async (offset,limit) => {
  try {
    const bookList = await db.select().from(books).offset(offset).limit(limit);
    console.log(bookList)
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
