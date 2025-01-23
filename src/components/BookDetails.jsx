import React from 'react';
import { FaStar } from 'react-icons/fa'; // Importing star icon from react-icons
import BookDisplay from './BookDisplay';
import { db } from '@/db/drizzle';
import { books } from '@/db/schema';
import { eq } from 'drizzle-orm';
import BorrowBook from './BorrowBook';
import { auth } from '@/auth';

async function BookDetails({id}) {
  const session = await auth();
  const bookArray = await db.select().from(books).where(eq(books.id, id));
  console.log(bookArray);
  const book = bookArray[0];

  return (
    <div className='text-slate-200 rounded-lg shadow-lg flex flex-col lg:flex-row w-full'>
      {/* Book details */}
      <div className='lg:p-12 lg:pt-16 pt-4 lg:mr-8 mr-0 lg:w-2/3 order-2 lg:order-1 w-full '>
        <p className='text-4xl font-bold mb-2'>{book.title}</p>
        <div className='flex sm:gap-4 gap-2 mb-2 flex-col sm:flex-row'>
          <p className='flex gap-1 items-center whitespace-nowrap'><span className='font-semibold text-primary-gold'>By </span><span>{book.author}</span></p>
          <p className='flex items-center gap-1 whitespace-nowrap'><span className='font-semibold text-primary-gold'>Genre </span><span>{book.genre}</span></p>
          <p className='flex items-center whitespace-nowrap'><span className='font-semibold text-primary-gold'>Rating</span>
            <span className='flex items-center ml-1'>
              {/* Render star icons based on rating */}
              {[...Array(Math.round(Number(book.rating) || 0))].map((_, index) => (
                <FaStar key={index} className='text-yellow-400' />
              ))}
            </span>

          </p>
        </div>
        <div className='flex gap-4 mb-2'>
          <p className='flex items-center gap-1'><span className='font-semibold text-primary-gold'>Total books</span>  <span>{book.totalCopies}</span></p>
          <p className='flex items-center gap-1'><span className='font-semibold text-primary-gold'>Available books</span>   <span>{book.availableCopies}</span></p>
        </div>
        <p className='mt-2'>{book.description}</p>
       <BorrowBook userId={session.user.id} bookId={book.id} />
      </div>
      {/* Book image with cover */}
      <div className='lg:m-4 mx-auto lg:mr-[50px] relative sm:w-[300px] w-[200px] order-1 lg:order-2'>
        <BookDisplay coverColor={book.coverColor} coverImage={book.coverUrl} />
        {/* <BookCoverSvg coverColor={book.coverColor} className='absolute z-20 h-full -right-[2.2px]' />
        <Image src={book.coverUrl} alt="book cover" height={450} width={440} className='relative z-50 h-[87.1%] rounded-tr-lg rounded-br-lg' />
        <div className='absolute inset-0 '>
          <BookCoverSvg coverColor={book.coverColor} className='absolute left-0 rotate-[10deg] sm:rotate-[15deg] z-10 h-full opacity-70' />
          <Image src={book.coverUrl} alt="book cover" height={450} width={440} className='absolute left-[57px] top-2 h-[88.1%] opacity-70 rotate-[10deg] sm:rotate-[15deg] z-10 rounded-tr-lg rounded-br-lg' />
        </div> */}
      </div>

    </div>
  );
}

export default BookDetails;
