import {
  varchar,
  uuid,
  integer,
  text,
  pgTable,
  date,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";
export const USER_ROLE = pgEnum("role", ["ADMIN", "USER"]);
export const STATUS_ENUM = pgEnum("status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  universityId: integer("university_id").notNull(),
  libraryCardUrl: text("library_card_url").notNull(),
  lastActivityDate: date("last_activity_date").defaultNow(),
  role: USER_ROLE("role").default("USER"),
  status: STATUS_ENUM("status").default("PENDING"),
  bookBorrowed: integer("book_borrowed").default(0),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});

export const books = pgTable("books", {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  author: varchar('author').notNull(),
  genre: varchar('genre').notNull(),
  rating: integer('rating').notNull(),
  coverUrl: text('cover_url').notNull(),
  coverColor: varchar('cover_color').notNull(),
  description: text('description').notNull(),
  totalCopies: integer('total_copies').notNull(),
  availableCopies: integer('available_copies').notNull(),
  summary: text('summary').notNull(),
  createdBy: text('created_by'),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});
