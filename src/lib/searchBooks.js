"use server";
import { books } from "@/db/schema";
import { db } from "@/db/drizzle";
import { ilike, or } from "drizzle-orm";

export const SearchBook = async (text) => {
  try {
    const res = await db
      .select()
      .from(books)
      .where(
        or(
          ilike(books.title, `%${text}%`),
          ilike(books.author, `%${text}%`),
          ilike(books.description, `%${text}%`),
          ilike(books.genre, `%${text}%`),
          ilike(books.summary, `%${text}%`)
        )
      );
    return res;
  } catch (error) {
    console.error(error);
  }
};
