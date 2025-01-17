import BorrowRqstCard from '@/components/admin/BorrowRqstCard'
import React from 'react'

function BorrowBookPage() {
    return (
        <div className='p-8'>
            <h1 className='text-2xl font-semibold text-primary-admin'>Borrow Requests</h1>
            <div className='py-4 px-8 flex flex-col space-y-2'>
                <BorrowRqstCard />
                <BorrowRqstCard />
                <BorrowRqstCard />
                <BorrowRqstCard />
            </div>
        </div>
    )
}

export default BorrowBookPage