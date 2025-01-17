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
import { Trash2, ExpandIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

function UserTable() {
    return (
        <Table>
            <TableCaption>A list of your recent users.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[150px] whitespace-nowrap">Name</TableHead>
                    <TableHead className="w-[150px] whitespace-nowrap">Date Joined</TableHead>
                    <TableHead className="w-[150px] whitespace-nowrap">Role</TableHead>
                    <TableHead className="w-[150px] whitespace-nowrap">University ID</TableHead>
                    <TableHead className="w-[150px] whitespace-nowrap">Book Borrowed</TableHead>
                    <TableHead className="w-[150px] whitespace-nowrap">University ID Card</TableHead>
                    <TableHead className="w-[150px] text-right whitespace-nowrap">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium flex items-center space-x-2 whitespace-nowrap w-[150px]">
                        <img src="/icons/user.svg" alt="John Doe" className="h-8 w-8 rounded-full" />
                        <span>John Doe</span>
                    </TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">2024-01-10</TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">Student</TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">12345678</TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">Introduction to React</TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">
                        <Button variant="link" className='flex items-center space-x-1'>
                            <Link
                                href="/view-id/12345678"
                                className="text-blue-500 hover:underline"
                            >
                                View ID Card
                            </Link>
                            <ExpandIcon className="h-4 w-4" />
                        </Button>
                    </TableCell>
                    <TableCell className="w-[150px] text-right whitespace-nowrap">
                        <Button
                            className="text-red-500 hover:text-red-700"
                            aria-label="Delete"
                        >
                            <Trash2 className="h-5 w-5" />
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium flex items-center space-x-2 whitespace-nowrap w-[150px]">
                        <img src="/icons/user.svg" alt="Jane Smith" className="h-8 w-8 rounded-full" />
                        <span>Jane Smith</span>
                    </TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">2023-11-15</TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">Librarian</TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">87654321</TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">Advanced CSS Techniques</TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">
                        <Button variant="link" className='flex items-center space-x-1'>
                            <Link
                                href="/view-id/87654321"
                                className="text-blue-500 hover:underline"
                            >
                                View ID Card
                            </Link>
                            <ExpandIcon className="h-4 w-4" />
                        </Button>
                    </TableCell>
                    <TableCell className="w-[150px] text-right whitespace-nowrap">
                        <Button
                            className="text-red-500 hover:text-red-700"
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

export default UserTable;
