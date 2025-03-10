import BorrowRqstCard from '@/components/admin/BorrowRqstCard'
import { getBorrowedBook } from '@/lib/drizzleActions';
import React from 'react'

async function BorrowBookPage() {
    const borrowedBooks = await getBorrowedBook();
    return (
        <div className='lg:p-8 px-2 py-6 w-full'>
            <h1 className='text-2xl font-semibold text-primary-admin'>Borrow Requests</h1>
            <div className='lg:py-4 lg:px-8 px-2 flex flex-col space-y-2 w-full'>
                {borrowedBooks.data.map((borrowRecord) => (
                    <BorrowRqstCard user={borrowRecord.users} book={borrowRecord.books} record={borrowRecord.borrow_records} />
                ))}
            </div>
        </div>
    )
}

export default BorrowBookPage