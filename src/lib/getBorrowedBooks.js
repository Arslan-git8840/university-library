"use server";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";

export async function getBorrowedBooks() {
  const books = await db
    .select({ borrowedBooks: users.bookBorrowed })
    .from(users);
  let totalBooks = 0;
  for (const book of books) {
    totalBooks = totalBooks + book.borrowedBooks;
  }
  return totalBooks;
}
