'use client'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { toast } from '@/hooks/use-toast'
import { borrowBook } from '@/lib/drizzleActions'

const BorrowBook = ({ userId, bookId }) => {
    console.log(userId, bookId)
    const date = new Date();
    const borrowedAt = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const handleBookBorrow = async () => {
        try {
            const response = await borrowBook(userId, bookId);
            if (response.success) {
                toast({
                    title: 'Book Borrowed',
                    description: `Book has been borrowed successfully on ${borrowedAt}.`,
                    variant: 'default',
                    success: "true",
                })
            } else {
                toast({
                    title: 'Book Not Borrowed',
                    description: `You are not eligible to borrow this book.`,
                    variant: 'destructive',
                    success: "false",
                })
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: `An error occurred while borrowing the book.`,
                variant: 'destructive',
                success: "false",
            })
        }
    }

    return (
        <div>
            <Button className='mt-4 bg-primary-gold text-black font-bebasNeue text-lg sm:w-fit w-full' onClick={handleBookBorrow}>
                <Image src='/icons/book.svg' alt='book icon' width={20} height={20} className='mr-2'></Image>
                Borrow Book
            </Button>
        </div>
    )
}

export default BorrowBook