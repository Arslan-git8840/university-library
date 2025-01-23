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
import { Trash2, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { updateUser, deleteUser } from "@/lib/drizzleActions";
import { useRouter } from "next/navigation";



function UserAccountTable({ userList }) {
    const router = useRouter();
    const approveUser = async (id) => {
        const response = await updateUser(id);
        if (response.success) {
            toast({
                title: 'User Approved',
                description: 'User has been approved.',
                variant: 'default',
                success: "true",
            })
            router.refresh();
        } else {
            toast({
                title: 'User Not Approved',
                description: 'User has not been approved.',
                variant: 'destructive',
                success: "false",
            })
        }
    }


    const deletedUser = async (id) => {
        const response = await deleteUser(id);
        if (response.success) {
            toast({
                title: 'User Deleted',
                description: 'User has been deleted.',
                variant: 'default',
                success: "true",
            })
            router.refresh();
        } else {
            toast({
                title: 'User Not Deleted',
                description: 'User has not been deleted.',
                variant: 'destructive',
                success: "false",
            })
        }
    }


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
                {userList.map((user) => {
                    const date = new Date(user.createdAt);
                    const createdAt = date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        day: 'numeric',
                        month: 'long'
                    })
                    return (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium flex items-center space-x-4 whitespace-nowrap w-[200px]">
                                <img
                                    src="/icons/user.svg"
                                    alt="John Doe"
                                    className="h-8 w-8 rounded-full"
                                />
                                <span>{user.fullName}</span>
                            </TableCell>
                            <TableCell className="w-[150px] whitespace-nowrap">{user.role}</TableCell>
                            <TableCell className="w-[150px] whitespace-nowrap">{createdAt}</TableCell>
                            <TableCell className="w-[150px] whitespace-nowrap">{user.universityId}</TableCell>
                            <TableCell className="w-[150px] whitespace-nowrap">
                                <Button variant="link" className="text-blue-500 hover:underline">
                                    <Link href={`/admin/view-id?id=${user.libraryCardUrl}`}>View ID Card </Link><ExternalLink />
                                </Button>
                            </TableCell>
                            <TableCell className="w-[150px] whitespace-nowrap">{user.status}</TableCell>
                            {user.status === "PENDING" ? (
                                <TableCell className="w-[150px] whitespace-nowrap flex gap-2 items-center"><Button className="bg-green-700 text-white mb-2" aria-label="Delete" onClick={() => approveUser(user.id)}>Approve</Button>
                                </TableCell>
                            ) : <TableCell className="whitespace-nowrap text-center"><p className="bg-green-500 p-2 text-white rounded-lg ">Approved</p></TableCell>}

                            <TableCell className="w-[150px] text-right whitespace-nowrap">
                                <Button
                                    aria-label="Delete"
                                    onClick={() => deletedUser(user.id)}
                                >
                                    <Trash2 className="h-5 w-5 text-red-800" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    );
}

export default UserAccountTable;
