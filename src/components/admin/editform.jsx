"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit3 } from "lucide-react";
import FileUpload from "../FileUpload";
import { toast } from "@/hooks/use-toast";
import { updateBook } from "@/lib/drizzleActions"; 
import { useRouter } from "next/navigation";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({
    subsets: ['latin'],
    weight: ['500', '600']
})


export default function EditForm({id}) {
  const [filePath, setFilePath] = React.useState(""); // State for file path
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      rating: "",
      coverColor: "",
      description: "",
      totalCopies: "",
      availableCopies: "",
      summary: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    const response = await updateBook({ ...data, coverUrl: filePath, createdBy: "Arslan" });
    form.reset();
    if (response.success) {
      router.refresh();
      const date = new Date();
      const createdAt = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      toast({
        title: "Book Updates",
        description: `Book has been Updated on ${createdAt}`,
        variant: "default",
        success: "true",
      });
    } else {
      toast({
        title: "Book Not updated",
        description: "Book has not been updated",
        variant: "destructive",
        success: "false",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="text-blue-500 hover:text-blue-700"
          aria-label="Edit"
        >
          <Edit3 className="h-5 w-5" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className={`${urbanist.className} md:max-w-[800px] w-full mx-auto rounded-lg`}>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Book Details</AlertDialogTitle>
          <AlertDialogDescription>
            Please provide the book details to add to the system.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Form inside AlertDialog */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 grid md:grid-cols-2 gap-x-4">
          {/* Title */}
          <div>
            <label htmlFor="title">Title</label>
            <Input id="title" name="title" placeholder="Enter Book Title" {...form.register('title')} required />
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author">Author</label>
            <Input id="author" name="author" placeholder="Enter Author Name" {...form.register('author')} required />
          </div>

          {/* Genre */}
          <div>
            <label htmlFor="genre">Genre</label>
            <Input id="genre" name="genre" placeholder="Enter Genre" {...form.register('genre')} required />
          </div>

          {/* Rating */}
          <div>
            <label htmlFor="rating">Rating</label>
            <Input type="number" step="0.1" id="rating" name="rating" placeholder="Enter Rating (1-5)" {...form.register('rating')} required />
          </div>

          {/* Cover Color */}
          <div>
            <label htmlFor="coverColor">Cover Color</label>
            <Input id="coverColor" name="coverColor" placeholder="Enter Cover Color" {...form.register('coverColor')} />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description">Description</label>
            <Textarea id="description" name="description" placeholder="Enter Book Description" {...form.register('description')} />
          </div>

          {/* Total Copies */}
          <div>
            <label htmlFor="totalCopies">Total Copies</label>
            <Input type="number" id="totalCopies" name="totalCopies" placeholder="Enter Total Copies" {...form.register('totalCopies')} required />
          </div>

          {/* Available Copies */}
          <div>
            <label htmlFor="availableCopies">Available Copies</label>
            <Input type="number" id="availableCopies" name="availableCopies" placeholder="Enter Available Copies" {...form.register('availableCopies')} required />
          </div>

          {/* Summary */}
          <div className="mb-2 col-span-2">
            <label htmlFor="summary">Summary</label>
            <Textarea id="summary" name="summary" placeholder="Enter Book Summary" {...form.register('summary')} />
          </div>

          {/* File Upload */}
          <div className="text-white col-span-2">
            <FileUpload
              accept="image/*"
              folder="books"
              placeholder="Update Book Cover"
              type="image"
              backGroundColor={"bg-primary-admin"}
              onFileUpload={(path) => setFilePath(path)}
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2">
            <Button type="submit" className="font-bebasNeue text-lg w-full text-white bg-primary-admin">
              Add Book
            </Button>
          </div>
        </form>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
