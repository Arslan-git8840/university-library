import React from 'react'
import BookCover from '@/components/BookCover2'
import { db } from '@/db/drizzle';
import { books } from '@/db/schema';

async function BookList() {
    const booklist = await db.select().from(books).limit(11);
  return (
    <div>
      <p className='text-3xl font-bold text-slate-200 p-4 '>POPULAR BOOKS</p>
      <div className='flex flex-wrap justify-evenly gap-6 pb-8'>
        {booklist.map((book) => (
          <div key={book.title} className='lg:max-w-64 sm:w-52 w-48 whitespace-nowrap p-2 mt-2'>
            <BookCover coverImage={book.coverUrl} coverColor={book.coverColor}/>
            <div className='p-2 overflow-hidden'>
              <p className='text-slate-200 text-sm'><span className='text-primary-gold font-semibold'>BookName: </span>{book.title}</p>
              <p className='text-slate-200 text-sm'><span className='text-primary-gold font-semibold'>Author: </span>{book.author}</p>
              <p className='text-slate-200 text-sm'><span className='text-primary-gold font-semibold'>Category: </span>{book.genre}</p>  </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookList