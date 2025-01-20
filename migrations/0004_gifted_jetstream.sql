ALTER TABLE "books" ADD COLUMN "created_by" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "book_borrowed" integer DEFAULT 0;