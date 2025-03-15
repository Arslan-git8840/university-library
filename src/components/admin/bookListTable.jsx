'use client';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React from "react";
import { Trash2, Edit3 } from "lucide-react";
import { Button } from "../ui/button";
import BookCover from "@/components/BookCover2";
import { toast } from "@/hooks/use-toast";
import { bookToDelete } from "@/lib/drizzleActions";
import EditForm from "./editform";
import { useRouter } from "next/navigation";

function BookListTable({ bookList }) {
    const router = useRouter();
    const deleteBook = async (id) => {
        const response = await bookToDelete(id);
        if (response.success) {
            const date = new Date();
            const deleteDate = date.toLocaleDateString('en-US', {
                weekday: "long",
                year: "numeric",
                day: 'numeric',
                month: "long"
            })
            router.refresh();
            router.replace('/admin/books');
            toast({
                title: "Book deleted successfully!",
                description: deleteDate,
            })
        } else {
            toast({
                title: "Book deletion failed!",
                description: "Book has not been deleted",
            })
        }
    }
    return (
        <Table>
            <TableCaption>A list of books in your library.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px] whitespace-nowrap">Book Title</TableHead>
                    <TableHead className="w-[150px] whitespace-nowrap">Author</TableHead>
                    <TableHead className="w-[150px] whitespace-nowrap">Genre</TableHead>
                    <TableHead className="w-[150px] whitespace-nowrap">Date Created</TableHead>
                    <TableHead className="w-[150px] text-right whitespace-nowrap">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bookList.map((book) => {
                    const date = new Date(book.createdAt);
                    const createdAt = date.toLocaleDateString('en-US', {
                        weekday: 'long', // Day of the week (e.g., Monday)
                        year: 'numeric',
                        month: 'long', // Full month name (e.g., January)
                        day: 'numeric'
                    });
                    return (
                        <TableRow key={book.id}>
                            <TableCell className="font-medium text-base flex items-center space-x-6 whitespace-nowrap ">
                                <div className="w-[64px]">
                                    <BookCover
                                        coverImage={book.coverUrl}
                                        coverColor={book.coverColor}
                                    />
                                </div>

                                <span>{book.title}</span>
                            </TableCell>
                            <TableCell className="w-[100px]">{book.author}</TableCell>
                            <TableCell className="w-[150px] whitespace-nowrap">{book.genre}</TableCell>
                            <TableCell className="w-[150px] whitespace-nowrap">{createdAt}</TableCell>
                            <TableCell className="w-[150px] text-right whitespace-nowrap">
                                {/* <Button
                                    className="text-blue-500 hover:text-blue-700"
                                    aria-label="Edit"
                                >
                                    <Edit3 className="h-5 w-5" />
                                </Button> */}

                                <EditForm id={book.id}/>

                                <Button
                                    className="text-red-500 hover:text-red-700 ml-2"
                                    aria-label="Delete"
                                    onClick={() => deleteBook(book.id)}
                                >
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    );
}

export default BookListTable;
