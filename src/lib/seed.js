"use server";
import { db } from "@/db/drizzle";
import { books } from "@/db/schema";
import ImageKit from "imagekit";
import booklist from "../data/dummyBooks.json";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
  privateKey: process.env.PRIVATE_KEY,
});
const uploadImageToImageKit = async (fileUrl, fileName, folder ) => {
  try {
    console.log('files are', fileUrl, fileName, folder);
    // Upload the file to ImageKit
    const response = await imagekit.upload({
      file: fileUrl, // Use the buffer here
      fileName,
      folder,
    });
    return response.filePath;
  } catch (error) {
    console.error("Error uploading image to ImageKit:", error);
  }
};

export const seed = async () => {
  console.log("Seeding data...");
  try {
    for (const book of booklist) {
      const coverUrl = await uploadImageToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "/books/covers"
      );
      console.log(book.coverUrl);
      await db.insert(books).values({
        ...book,
        coverUrl,
      });
    }
    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};
