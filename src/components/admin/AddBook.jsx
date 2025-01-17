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

const AddBookForm = () => {
  const form = useForm({
    defaultValues: {
      id: "",
      title: "",
      author: "",
      genre: "",
      rating: "",
      coverUrl: "",
      coverColor: "",
      description: "",
      totalCopies: "",
      availableCopies: "",
      videoUrl: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

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

        {/* Cover URL */}
        <FormField
          name="coverUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter Cover Image URL" {...field} />
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
                <Input type="color" {...field} />
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

        {/* Video URL */}
        <FormField
          name="videoUrl"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter Video URL" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full text-white bg-primary-admin">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddBookForm;
