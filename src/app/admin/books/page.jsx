import BookListTable from '@/components/admin/bookListTable'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function AllBooks() {
  return (
    <div className='p-8'>
        <h1 className='text-2xl font-semibold text-primary-admin'>All Books</h1>
        <Button className={'bg-primary-admin text-white mt-4'}><PlusIcon /> <Link href='/admin/addBook'>Add New Book</Link></Button>
        <div className='py-4 px-8'>
        <BookListTable/>
        <BookListTable/>
        </div>
    </div>
  )
}

export default AllBooks