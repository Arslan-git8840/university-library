"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"; // Replace with the correct path to your form components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "../FileUpload";
import { toast } from "@/hooks/use-toast";
import { addBook } from "@/lib/drizzleActions";


const AddBookForm = () => {
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
  const [filePath, setFilePath] = React.useState(''); // State for file path

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    const response = await addBook({ ...data, coverUrl: filePath, createdBy: "Arslan" });
    form.reset();
    if (response.success) {
      const date = new Date();
      const createdAt = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      toast({
        title: "Book Added",
        description: `Book has been added on ${createdAt}`,
        variant: "default",
        success: "true",
      })
    } else {
      toast({
        title: "Book Not Added",
        description: "Book has not been added",
        variant: "destructive",
        success: "false",
      })
    }
  }

  return (
    <Form {...form} className='rounded-lg'>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

        {/* Title */}
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter Title" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Author */}
        <FormField
          name="author"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Enter Author Name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Genre */}
        <FormField
          name="genre"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre</FormLabel>
              <FormControl>
                <Input placeholder="Enter Genre" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Rating */}
        <FormField
          name="rating"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input type="number" step="0.1" placeholder="Enter Rating (1-5)" {...field} />
              </FormControl>
            </FormItem>
          )}
        />


        {/* Cover Color */}
        <FormField
          name="coverColor"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Color</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter Book Description" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Total Copies */}
        <FormField
          name="totalCopies"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Copies</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter Total Copies" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Available Copies */}
        <FormField
          name="availableCopies"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available Copies</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter Available Copies" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Summary */}
        <FormField
          name="summary"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter Book Summary" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="text-white">
          <FileUpload accept="image/*" folder="books" placeholder="Upload book cover" type="image" backGroundColor={"bg-primary-admin"} onFileUpload={(path) => setFilePath(path)} />
        </div>


        <Button type="submit" className="font-bebasNeue text-lg w-full text-white bg-primary-admin">
          Add Book
        </Button>
      </form>
    </Form>
  );
};

export default AddBookForm;
