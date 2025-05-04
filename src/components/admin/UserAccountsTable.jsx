'use client';
import {
    Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { Trash2, ExternalLink } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { updateUser, deleteUser } from "@/lib/drizzleActions";
import { useRouter } from "next/navigation";

function UserAccountTable({ userList }) {
    const [users, setUsers] = useState(userList); 
    const router = useRouter();

    const approveUser = async (id) => {
        const response = await updateUser(id);
        if (response.success) {
            toast({
                title: 'User Approved',
                description: 'User has been approved.',
                variant: 'default',
                success: "true",
            });
            // Update status locally
            setUsers(prev => prev.map(user => user.id === id ? { ...user, status: "APPROVED" } : user));
        } else {
            toast({
                title: 'User Not Approved',
                description: 'User has not been approved.',
                variant: 'destructive',
                success: "false",
            });
        }
    };

    const deletedUser = async (id) => {
        const response = await deleteUser(id);
        if (response.success) {
            toast({
                title: 'User Deleted',
                description: 'User has been deleted successfully.',
                variant: 'default',
                success: "true",
            });
            // Remove user immediately from UI
            setUsers(prev => prev.filter(user => user.id !== id));
        } else {
            toast({
                title: 'User Not Deleted',
                description: 'User has not been deleted.',
                variant: 'destructive',
                success: "false",
            });
        }
    };

    return (
        <Table>
            <TableCaption>A list of user account requests.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px]">User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead>University ID</TableHead>
                    <TableHead>University ID Card</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => {
                    const createdAt = new Date(user.createdAt).toLocaleDateString('en-US', {
                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                    });

                    return (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium flex items-center space-x-4">
                                <img src="/icons/user.svg" alt="user" className="h-8 w-8 rounded-full" />
                                <span>{user.fullName}</span>
                            </TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{createdAt}</TableCell>
                            <TableCell>{user.universityId}</TableCell>
                            <TableCell>
                                <Button variant="link" className="text-blue-500 hover:underline">
                                    <Link href={`/admin/view-id?id=${user.libraryCardUrl}`}>View ID Card <ExternalLink className="inline ml-1" /></Link>
                                </Button>
                            </TableCell>
                            <TableCell>
                                {user.status === "PENDING" ? (
                                    <span className="text-yellow-600">Pending</span>
                                ) : (
                                    <p className="bg-green-500 p-2 text-white rounded-lg">Approved</p>
                                )}
                            </TableCell>
                            <TableCell>
                                {user.status === "PENDING" && (
                                    <Button className="bg-green-700 text-white" onClick={() => approveUser(user.id)}>Approve</Button>
                                )}
                            </TableCell>
                            <TableCell className="text-right">
                                <Button onClick={() => deletedUser(user.id)}>
                                    <Trash2 className="h-5 w-5 text-red-800" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

export default UserAccountTable;
