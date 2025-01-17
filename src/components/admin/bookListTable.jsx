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
import BookCover from "../BookCard";

function BookListTable() {
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
                <TableRow>
                    <TableCell className="font-medium text-base flex items-center space-x-6 whitespace-nowrap w-[200px]">
                        <BookCover
                            coverUrl="/books/covers/React_in_Action_lEnUcul5_.jpg?updatedAt=1737001284754"
                            coverColor="#302428"
                        />
                        <span>React Basics</span>
                    </TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">John Doe</TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">Programming</TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">2024-01-10</TableCell>
                    <TableCell className="w-[150px] text-right whitespace-nowrap">
                        <Button
                            className="text-blue-500 hover:text-blue-700"
                            aria-label="Edit"
                        >
                            <Edit3 className="h-5 w-5" />
                        </Button>
                        <Button
                            className="text-red-500 hover:text-red-700 ml-2"
                            aria-label="Delete"
                        >
                            <Trash2 className="h-5 w-5" />
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium text-base flex items-center space-x-6 whitespace-nowrap w-[200px]">
                        <BookCover
                            coverUrl="/books/covers/React_in_Action_lEnUcul5_.jpg?updatedAt=1737001284754"
                            coverColor="#302428"
                        />
                        <span>CSS Mastery</span>
                    </TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">Jane Smith</TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">Design</TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">2023-11-15</TableCell>
                    <TableCell className="w-[150px] text-right whitespace-nowrap">
                        <Button
                            className="text-blue-500 hover:text-blue-700"
                            aria-label="Edit"
                        >
                            <Edit3 className="h-5 w-5" />
                        </Button>
                        <Button
                            className="text-red-500 hover:text-red-700 ml-2"
                            aria-label="Delete"
                        >
                            <Trash2 className="h-5 w-5" />
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export default BookListTable;
