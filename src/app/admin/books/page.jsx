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
    <div className='p-8'>
        <h1 className='text-2xl font-semibold text-primary-admin'>All Books</h1>
        <Button className={'bg-primary-admin text-white mt-4'}><PlusIcon /> <Link href='/admin/addBook'>Add New Book</Link></Button>
        <div className='py-4 px-8'>
        <BookListTable bookList={bookList}/>
        </div>
    </div>
  )
}

export default AllBooks