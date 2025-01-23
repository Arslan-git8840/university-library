import BookListTable from '@/components/admin/bookListTable'
import { Button } from '@/components/ui/button'
import { db } from '@/db/drizzle'
import { books } from '@/db/schema'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

async function AllBooks() {
  const bookList = await db.select().from(books);
  return (
    <div className='lg:p-8 px-3 py-6'>
        <h1 className='text-2xl font-semibold text-primary-admin'>All Books</h1>
        <Button className={'bg-primary-admin text-white mt-4'}><PlusIcon /> <Link href='/admin/addBook'>Add New Book</Link></Button>
        <div className='lg:py-4 lg:px-8 px-2'>
        <BookListTable bookList={bookList}/>
        </div>
    </div>
  )
}

export default AllBooks