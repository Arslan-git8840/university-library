import BookCover from '@/components/BookCover2';
import Link from 'next/link';
import React from 'react';
import { HiOutlineCalendar, HiOutlineClock, HiOutlineReceiptTax } from 'react-icons/hi';
import { IoReceiptOutline } from 'react-icons/io5';
import { db } from '@/db/drizzle';
import { borrowRecords, users } from '@/db/schema';
import { auth } from '@/auth';
import { eq } from 'drizzle-orm';
import UserInfo from '@/components/UserInfo';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { signOut } from '@/auth';
import { redirect } from 'next/navigation';
import { getBorrowedBook } from '@/lib/drizzleActions';

async function Profile() {
  const borrowedBooks = await getBorrowedBook();
  console.log('borrowedBooks', borrowedBooks.data);
  const session = await auth();
  const response = await db.select().from(users).where(eq(users.id, session?.user?.id));
  const user = response[0];

  return (
    <div className='flex gap-2 lg:flex-row flex-col justify-center mt-12'>
      <div className='lg:w-[500px] w-full lg:pb-6 pb-0'>
        <div
          className="h-[650px] md:w-[500px] mx-auto w-full relative rounded-xl"
          style={{
            background: 'linear-gradient(to bottom, #1F2433, #0A0B10)',
          }}
        >
          <div
            className="h-36 w-28 bg-[#464F6F] relative bottom-[65px] left-[50%] -translate-x-[50%]"
            style={{
              borderBottomLeftRadius: '45%',
              borderBottomRightRadius: '45%',
            }}
          >
            <div className="absolute h-4 w-12 bg-[#1F2433] bottom-[20px] left-[33px] rounded-xl"></div>
          </div>
          <img
            src="/verified.png"
            alt="verify"
            className="absolute h-12 right-4 top-4"
          />
          <UserInfo url={user.libraryCardUrl} fullName={user.fullName} universityId={user.universityId} />
        </div>
      </div>

      <div className={cn(
        'flex flex-1 justify-center',
        {
          'pt-0 gap-2 flex-wrap pb-6': user.bookBorrowed,
          'lg:pt-56 pt-6 pb-10 flex-wrap': !user.bookBorrowed
        }
      )}>
        <form action={async () => {
          'use server'
          await signOut();
          redirect('/');
        }}>
          <Button type='submit' className='bg-primary-gold absolute top-[85px] right-10 text-lg font-bebasNeue tracking-wider'>Logout</Button>
        </form>

        {user.bookBorrowed ? (
          borrowedBooks.data?.map((borrowedBook) => {
            // Format the BorrowDate and DueDate here
            const BorrowDate = new Date(borrowedBook.borrow_records.borrowDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              day: 'numeric',
              month: 'long'
            });
            const DueDate = new Date(borrowedBook.borrow_records.dueDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              day: 'numeric',
              month: 'long'
            });

            return (
              <div className='bg-[#2a2a2a] rounded-xl h-fit w-[300px] p-3 shrink-0' key={borrowedBook.id}>
                {/* Book Image */}
                <div className='p-12 rounded-xl'>
                  <BookCover coverColor={borrowedBook.books.coverColor} coverImage={borrowedBook.books.coverUrl} />
                </div>
                <div className="p-2">
                  <div className='flex items-center gap-3'>
                    {/* Book Title */}
                    <h2 className="text-base font-semibold text-white">{(borrowedBook.books.title).slice(0,13)}</h2>
                    <span className='text-white'>.</span>
                    {/* Category */}
                    <p className="text-gray-400 text-sm">{borrowedBook.books.genre}</p>
                  </div>

                  {/* Borrowed Date */}
                  <div className="flex items-center mt-2 text-gray-400">
                    <HiOutlineCalendar className="mr-2 text-sm" />
                    <p className='text-sm'>{BorrowDate}</p>
                  </div>

                  {/* Due Date */}
                  <div className="flex items-center mt-2 text-gray-400">
                    <HiOutlineClock className="mr-2 text-sm" />
                    <p className='text-sm'>{DueDate}</p>
                  </div>

                  {/* Receipt Icon */}
                  <div className="flex justify-between items-center text-gray-400">
                    <div className='flex gap-1 items-center'>
                      <HiOutlineReceiptTax className="mr-2 text-sm" />
                      <p className='text-sm'>Receipt</p>
                    </div>

                    {/* Receipt Link */}
                    <Link href='#' style={{ backgroundColor: `${borrowedBook.books.coverColor}` }} className="p-2 rounded-full">
                      <IoReceiptOutline className='text-white' />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className='text-slate-200 text-xl text-center'>
            No Books Borrowed yet.....!
          </p>
        )}
      </div>
    </div>
  );
}

export default Profile;
