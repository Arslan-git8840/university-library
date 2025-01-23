import React from 'react'
import BookCover from '@/components/BookCover2'
import { db } from '@/db/drizzle';
import { books } from '@/db/schema';
import Link from 'next/link';
import { ne } from 'drizzle-orm';

async function BookList({ limit, title, excludedBook }) {
  console.log('excluded book id', excludedBook)
  let booklist;
  if (limit) {
    booklist = await db.select().from(books).limit(10);
  } else {
    booklist = await db.select().from(books).where(ne(books.id, excludedBook)).orderBy('RANDOM()').limit(10);
  }
  return (
    <div>
      <p className='text-3xl font-bold text-primary-gold p-4 '>{title}</p>
      <div className='flex flex-wrap justify-evenly sm:gap-6 gap-0 pb-8'>
        {booklist.map((book) => (
          <div key={book.title} className='lg:max-w-64 sm:w-52 w-32 whitespace-nowrap p-2 mt-2'>
            <Link href={`/book/${book.id}`}>
              <BookCover coverImage={book.coverUrl} coverColor={book.coverColor} />
              <div className='p-2 overflow-hidden'>
                <p className='text-slate-200 sm:text-sm text-xs'><span className='text-primary-gold font-semibold'>BookName: </span>{book.title}</p>
                <p className='text-slate-200 sm:text-sm text-xs'><span className='text-primary-gold font-semibold'>Author: </span>{book.author}</p>
                <p className='text-slate-200 sm:text-sm text-xs'><span className='text-primary-gold font-semibold'>Category: </span>{book.genre}</p>  </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BookList