import AddBookForm from '@/components/admin/AddBook'
import React from 'react'

function AddBookPage() {
    return (
        <div className='p-8'>
            <h1 className='text-2xl font-semibold text-primary-admin mb-4'>Add New Book</h1>
            <div className='py-4 px-8 shadow-[0_2px_2px_2px_#25388c] rounded-lg'>
                <AddBookForm />
            </div>
        </div>
    )
}

export default AddBookPage