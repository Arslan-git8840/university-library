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
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

function UserAccountTable() {
    return (
        <Table>
            <TableCaption>A list of user account requests.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px] whitespace-nowrap">User</TableHead>
                    <TableHead className="w-[150px] whitespace-nowrap">Role</TableHead>
                    <TableHead className="w-[150px] whitespace-nowrap">Created At</TableHead>
                    <TableHead className="w-[150px] whitespace-nowrap">University ID</TableHead>
                    <TableHead className="w-[150px] whitespace-nowrap">University ID Card</TableHead>
                    <TableHead className="w-[150px] whitespace-nowrap">Status</TableHead>
                    <TableHead className="w-[150px] whitespace-nowrap">Action</TableHead>
                    <TableHead className="w-[150px] text-right whitespace-nowrap">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium flex items-center space-x-4 whitespace-nowrap w-[200px]">
                        <img
                            src="/icons/user.svg"
                            alt="John Doe"
                            className="h-8 w-8 rounded-full"
                        />
                        <span>John Doe</span>
                    </TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">Student</TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">2024-01-10</TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">12345678</TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">
                        <Button variant="link" className="text-blue-500 hover:underline">
                            View ID Card
                        </Button>
                    </TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">Pending</TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap flex gap-2"><Button className="bg-green-700 text-white" aria-label="Delete">Approve</Button>
                        <Button className="bg-red-700 text-white" aria-label="Delete">Reject</Button></TableCell>
                    <TableCell className="w-[150px] text-right whitespace-nowrap">
                        <Button
                            aria-label="Delete"
                        >
                            <Trash2 className="h-5 w-5 text-red-800" />
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium flex items-center space-x-4 whitespace-nowrap w-[200px]">
                        <img
                            src="/icons/user.svg"
                            alt="Jane Smith"
                            className="h-8 w-8 rounded-full"
                        />
                        <span>Jane Smith</span>
                    </TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">Faculty</TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">2023-12-15</TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">87654321</TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">
                        <Button variant="link" className="text-blue-500 hover:underline">
                            View ID Card
                        </Button>
                    </TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap">Approved</TableCell>
                    <TableCell className="w-[150px] whitespace-nowrap flex gap-2"><Button className="bg-green-700 text-white" aria-label="Delete">Approve</Button>
                        <Button className="bg-red-700 text-white" aria-label="Delete">Reject</Button></TableCell>
                    <TableCell className="w-[150px] text-right whitespace-nowrap">
                        <Button
                            aria-label="Delete"
                        >
                            <Trash2 className="h-5 w-5 text-red-700" />
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export default UserAccountTable;
