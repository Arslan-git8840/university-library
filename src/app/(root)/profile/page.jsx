import BookCover from '@/components/BookCover2';
import Link from 'next/link';
import React from 'react';
import { HiOutlineCalendar, HiOutlineClock, HiOutlineReceiptTax } from 'react-icons/hi';
import { IoReceiptOutline } from "react-icons/io5";
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { auth } from '@/auth';
import { eq } from 'drizzle-orm';
import UserInfo from '@/components/UserInfo';
import { cn } from '@/lib/utils';


async function Profile() {
  const session = await auth();
  const response = await db.select().from(users).where(eq(users.id, session?.user?.id));
  const user = response[0];
  return (
    <div className='flex gap-2 lg:flex-row flex-col justify-center mt-6'>
      <div className='lg:w-[500px] w-full'>
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
        'flex flex-1 pt-56 justify-center',
        {
          'flex gap-3 flex-1 flex-wrap justify-center': user.bookBorrowed
        }
      )}>
        {user.bookBorrowed ? (
          <>
            <div className='bg-[#2a2a2a] rounded-xl h-fit w-[300px] p-3 shrink-0'>
              {/* Book Image */}
              <div className='p-12 bg-[#50A55B]/50 rounded-xl'>
                <BookCover coverColor='#50A55B' coverImage='books/covers/Computer_Science_Distilled_SKoOT2wS7.jpg?' />
              </div>
              <div className="p-2">
                <div className='flex items-center gap-3'>
                  {/* Book Title */}
                  <h2 className="text-base font-semibold text-white">Book Name</h2>
                  <span className='text-white'>.</span>
                  {/* Category */}
                  <p className="text-gray-400 text-sm">Category</p>
                </div>

                {/* Borrowed Date */}
                <div className="flex items-center mt-2 text-gray-400">
                  <HiOutlineCalendar className="mr-2 text-sm" />
                  <p className='text-sm'>Borrowed on June 16</p>
                </div>

                {/* Due Date */}
                <div className="flex items-center mt-2 text-gray-400">
                  <HiOutlineClock className="mr-2 text-sm" />
                  <p className='text-sm'>6 days left</p>
                </div>

                {/* Receipt Icon */}
                <div className="flex justify-between items-center text-gray-400">
                  <div className='flex gap-1 items-center'>
                    <HiOutlineReceiptTax className="mr-2 text-sm" />
                    <p className='text-sm'>Receipt</p>
                  </div>

                  {/* Receipt Link */}
                  <Link href='#' className='p-2 bg-[#50A55B]/60 rounded-full'>
                    <IoReceiptOutline className='text-white' />
                  </Link>
                </div>
              </div>
            </div>

            <div className='bg-[#2a2a2a] rounded-xl h-fit w-[300px] p-3 shrink-0'>
              {/* Book Image */}
              <div className='p-12 bg-[#50A55B]/50 rounded-xl'>
                <BookCover coverColor='#50A55B' coverImage='books/covers/Computer_Science_Distilled_SKoOT2wS7.jpg?' />
              </div>
              <div className="p-2">
                {/* Book Title */}
                <h2 className="text-base font-semibold text-white">Book Name</h2>
                {/* Category */}
                <p className="text-gray-400 text-sm">Category</p>

                {/* Borrowed Date */}
                <div className="flex items-center mt-2 text-gray-400">
                  <HiOutlineCalendar className="mr-2 text-sm" />
                  <p className='text-sm'>Borrowed on June 16</p>
                </div>

                {/* Due Date */}
                <div className="flex items-center mt-2 text-gray-400">
                  <HiOutlineClock className="mr-2 text-sm" />
                  <p className='text-sm'>6 days left</p>
                </div>

                {/* Receipt Icon */}
                <div className="flex items-center mt-2 text-gray-400">
                  <HiOutlineReceiptTax className="mr-2 text-sm" />
                  <p className='text-sm'>Receipt</p>
                </div>
              </div>
            </div>

            <div className='bg-[#2a2a2a] rounded-xl h-fit w-[300px] p-3 shrink-0'>
              {/* Book Image */}
              <div className='p-12 bg-[#50A55B]/50 rounded-xl'>
                <BookCover coverColor='#50A55B' coverImage='books/covers/Computer_Science_Distilled_SKoOT2wS7.jpg?' />
              </div>
              <div className="p-2">
                {/* Book Title */}
                <h2 className="text-base font-semibold text-white">Book Name</h2>
                {/* Category */}
                <p className="text-gray-400 text-sm">Category</p>

                {/* Borrowed Date */}
                <div className="flex items-center mt-2 text-gray-400">
                  <HiOutlineCalendar className="mr-2 text-sm" />
                  <p className='text-sm'>Borrowed on June 16</p>
                </div>

                {/* Due Date */}
                <div className="flex items-center mt-2 text-gray-400">
                  <HiOutlineClock className="mr-2 text-sm" />
                  <p className='text-sm'>6 days left</p>
                </div>

                {/* Receipt Icon */}
                <div className="flex items-center mt-2 text-gray-400">
                  <HiOutlineReceiptTax className="mr-2 text-sm" />
                  <p className='text-sm'>Receipt</p>
                </div>
              </div>
            </div>

            <div className='bg-[#2a2a2a] rounded-xl h-fit w-[300px] p-3 shrink-0'>
              {/* Book Image */}
              <div className='p-12 bg-[#50A55B]/50 rounded-xl'>
                <BookCover coverColor='#50A55B' coverImage='books/covers/Computer_Science_Distilled_SKoOT2wS7.jpg?' />
              </div>
              <div className="p-2">
                {/* Book Title */}
                <h2 className="text-base font-semibold text-white">Book Name</h2>
                {/* Category */}
                <p className="text-gray-400 text-sm">Category</p>

                {/* Borrowed Date */}
                <div className="flex items-center mt-2 text-gray-400">
                  <HiOutlineCalendar className="mr-2 text-sm" />
                  <p className='text-sm'>Borrowed on June 16</p>
                </div>

                {/* Due Date */}
                <div className="flex items-center mt-2 text-gray-400">
                  <HiOutlineClock className="mr-2 text-sm" />
                  <p className='text-sm'>6 days left</p>
                </div>

                {/* Receipt Icon */}
                <div className="flex items-center mt-2 text-gray-400">
                  <HiOutlineReceiptTax className="mr-2 text-sm" />
                  <p className='text-sm'>Receipt</p>
                </div>
              </div>
            </div>

            <div className='bg-[#2a2a2a] rounded-xl h-fit w-[300px] p-3 shrink-0'>
              {/* Book Image */}
              <div className='p-12 bg-[#50A55B]/50 rounded-xl'>
                <BookCover coverColor='#50A55B' coverImage='books/covers/Computer_Science_Distilled_SKoOT2wS7.jpg?' />
              </div>
              <div className="p-2">
                {/* Book Title */}
                <h2 className="text-base font-semibold text-white">Book Name</h2>
                {/* Category */}
                <p className="text-gray-400 text-sm">Category</p>

                {/* Borrowed Date */}
                <div className="flex items-center mt-2 text-gray-400">
                  <HiOutlineCalendar className="mr-2 text-sm" />
                  <p className='text-sm'>Borrowed on June 16</p>
                </div>

                {/* Due Date */}
                <div className="flex items-center mt-2 text-gray-400">
                  <HiOutlineClock className="mr-2 text-sm" />
                  <p className='text-sm'>6 days left</p>
                </div>

                {/* Receipt Icon */}
                <div className="flex items-center mt-2 text-gray-400">
                  <HiOutlineReceiptTax className="mr-2 text-sm" />
                  <p className='text-sm'>Receipt</p>
                </div>
              </div>
            </div>

            <div className='bg-[#2a2a2a] rounded-xl h-fit w-[300px] p-3 shrink-0'>
              {/* Book Image */}
              <div className='p-12 bg-[#50A55B]/50 rounded-xl'>
                <BookCover coverColor='#50A55B' coverImage='books/covers/Computer_Science_Distilled_SKoOT2wS7.jpg?' />
              </div>
              <div className="p-2">
                {/* Book Title */}
                <h2 className="text-base font-semibold text-white">Book Name</h2>
                {/* Category */}
                <p className="text-gray-400 text-sm">Category</p>

                {/* Borrowed Date */}
                <div className="flex items-center mt-2 text-gray-400">
                  <HiOutlineCalendar className="mr-2 text-sm" />
                  <p className='text-sm'>Borrowed on June 16</p>
                </div>

                {/* Due Date */}
                <div className="flex items-center mt-2 text-gray-400">
                  <HiOutlineClock className="mr-2 text-sm" />
                  <p className='text-sm'>6 days left</p>
                </div>

                {/* Receipt Icon */}
                <div className="flex items-center mt-2 text-gray-400">
                  <HiOutlineReceiptTax className="mr-2 text-sm" />
                  <p className='text-sm'>Receipt</p>
                </div>
              </div>
            </div>
          </>
        ) : <p className='text-slate-200 text-xl text-center
        '>No Books Borrowed yet.....!</p>}



      </div>



    </div>
  )
}

export default Profile
