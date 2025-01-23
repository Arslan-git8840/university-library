import BorrowRqstCard from '@/components/admin/BorrowRqstCard'
import { getBorrowedBook } from '@/lib/drizzleActions';
import React from 'react'

async function BorrowBookPage() {
    const borrowedBooks = await getBorrowedBook();
    return (
        <div className='p-8'>
            <h1 className='text-2xl font-semibold text-primary-admin'>Borrow Requests</h1>
            <div className='py-4 px-8 flex flex-col space-y-2'>
                {borrowedBooks.data.map((borrowRecord) => (
                    <BorrowRqstCard user={borrowRecord.users} book={borrowRecord.books} record={borrowRecord.borrow_records} />
                ))}
            </div>
        </div>
    )
}

export default BorrowBookPage