'use client';
import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { deleteUser } from "@/lib/drizzleActions";

function UserTable({ userList }) {
    const [users, setUsers] = useState(userList);

    const deletedUser = async (id) => {
        const response = await deleteUser(id);
        if (response.success) {
            toast({
                title: 'User Deleted',
                description: 'User has been deleted.',
                variant: 'default',
                success: "true",
            });

            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
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
                {users.map((user) => {
                    const date = new Date(user.createdAt);
                    const createdAt = date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });

                    return (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium flex items-center space-x-2 whitespace-nowrap w-[150px]">
                                <img src="/icons/user.svg" alt="User Avatar" className="h-8 w-8 rounded-full" />
                                <span>{user.fullName}</span>
                            </TableCell>
                            <TableCell className="w-[150px] whitespace-nowrap">{createdAt}</TableCell>
                            <TableCell className="w-[150px] whitespace-nowrap">{user.role}</TableCell>
                            <TableCell className="w-[150px] whitespace-nowrap">{user.universityId}</TableCell>
                            <TableCell className="w-[150px] whitespace-nowrap">
                                {user.bookBorrowed ? user.bookBorrowed : "No Book Borrowed"}
                            </TableCell>
                            <TableCell className="w-[150px] whitespace-nowrap">
                                <Button variant="link" className='flex items-center space-x-1 p-0'>
                                    <Link
                                        href={`/admin/view-id/?id=${user.libraryCardUrl}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        View ID Card
                                    </Link>
                                    <ExternalLink className="h-4 w-4 ml-1" />
                                </Button>
                            </TableCell>
                            <TableCell className="w-[150px] text-right whitespace-nowrap">
                                <Button
                                    className="text-red-500 hover:text-red-700"
                                    aria-label="Delete"
                                    onClick={() => deletedUser(user.id)}
                                >
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

export default UserTable;



// 'use client';
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";
// import React from "react";
// import { Trash2, ExternalLink } from "lucide-react";
// import Link from "next/link";
// import { Button } from "../ui/button";
// import { toast } from "@/hooks/use-toast";
// import { deleteUser } from "@/lib/drizzleActions";
// import { useRouter } from "next/navigation";

// function UserTable({ userList }) {
//     const router = useRouter();
//     const deletedUser = async (id) => {
//         const response = await deleteUser(id);
//         if (response.success) {
//             toast({
//                 title: 'User Deleted',
//                 description: 'User has been deleted.',
//                 variant: 'default',
//                 success: "true",
//             })
//             router.refresh();
//             // router.replace('/admin/users');

//         } else {
//             toast({
//                 title: 'User Not Deleted',
//                 description: 'User has not been deleted.',
//                 variant: 'destructive',
//                 success: "false",
//             })
//         }
//     }
//     return (
//         <Table>
//             <TableCaption>A list of your recent users.</TableCaption>
//             <TableHeader>
//                 <TableRow>
//                     <TableHead className="w-[150px] whitespace-nowrap">Name</TableHead>
//                     <TableHead className="w-[150px] whitespace-nowrap">Date Joined</TableHead>
//                     <TableHead className="w-[150px] whitespace-nowrap">Role</TableHead>
//                     <TableHead className="w-[150px] whitespace-nowrap">University ID</TableHead>
//                     <TableHead className="w-[150px] whitespace-nowrap">Book Borrowed</TableHead>
//                     <TableHead className="w-[150px] whitespace-nowrap">University ID Card</TableHead>
//                     <TableHead className="w-[150px] text-right whitespace-nowrap">Action</TableHead>
//                 </TableRow>
//             </TableHeader>
//             <TableBody>
//                 {userList.map((user) => {
//                     const date = new Date(user.createdAt);
//                     const createdAt = date.toLocaleDateString('en-US', {
//                         weekday: 'long', // Day of the week (e.g., Monday)
//                         year: 'numeric',
//                         month: 'long', // Full month name (e.g., January)
//                         day: 'numeric'
//                     })
//                     return (
//                         <TableRow key={user.id}>
//                             <TableCell className="font-medium flex items-center space-x-2 whitespace-nowrap w-[150px]">
//                                 <img src="/icons/user.svg" alt="John Doe" className="h-8 w-8 rounded-full" />
//                                 <span>{user.fullName}</span>
//                             </TableCell>
//                             <TableCell className="w-[150px] whitespace-nowrap">{createdAt}</TableCell>
//                             <TableCell className="w-[150px] whitespace-nowrap">{user.role}</TableCell>
//                             <TableCell className="w-[150px] whitespace-nowrap">{user.universityId}</TableCell>
//                             {/* <TableCell className="w-[150px] whitespace-nowrap">Introduction to React</TableCell> */}
//                             <TableCell className="w-[150px] whitespace-nowrap">{user.bookBorrowed ? user.bookBorrowed : "No Book Borrowed"}</TableCell>
//                             <TableCell className="w-[150px] whitespace-nowrap">
//                                 <Button variant="link" className='flex items-center space-x-1'>
//                                     <Link
//                                         href={`/admin/view-id/?id=${user.libraryCardUrl}`}
//                                         className="text-blue-500 hover:underline"
//                                     >
//                                         View ID Card
//                                     </Link>
//                                     <ExternalLink className="h-4 w-4" />
//                                 </Button>
//                             </TableCell>
//                             <TableCell className="w-[150px] text-right whitespace-nowrap">
//                                 <Button
//                                     className="text-red-500 hover:text-red-700"
//                                     aria-label="Delete" onClick={() => deletedUser(user.id)}
//                                 >
//                                     <Trash2 className="h-5 w-5" />
//                                 </Button>
//                             </TableCell>
//                         </TableRow>
//                     )
//                 })}

//             </TableBody>
//         </Table>
//     );
// }

// export default UserTable;
