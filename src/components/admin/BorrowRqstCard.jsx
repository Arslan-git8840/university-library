'use client';
import React from 'react';
import BookCover from '@/components/BookCover2';

function BorrowRqstCard({user, book, record}) {
  const borrowedDate = new Date(record.borrowDate).toLocaleDateString('en-US',{
    weekday:'long',
    month:'long',
    day:'numeric',
    year:'numeric'
  })
  return (
    <div className="p-3 bg-white shadow-md rounded-md">
      <div className="flex gap-6">
        {/* Book Cover Section */}
        <div className="w-16 flex-shrink-0">
          <BookCover
            coverImage={book.coverUrl}
            coverColor={book.coverColor}
          />
        </div>

        {/* Book Info Section */}
        <div className="flex flex-col justify-between">
          {/* Title and Author */}
          <div>
            <p className="text-base font-semibold text-gray-800">{book.title}</p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">{book.author}</span> · <span>{book.genre}</span>
            </p>
          </div>

          {/* Borrow Details */}
          <div className="flex items-center gap-3 mt-3">
            <img
              src="/icons/user.svg"
              alt="User"
              height={24}
              width={24}
              className="rounded-full border border-gray-300"
            />
            <p className="text-sm text-gray-600">
              Borrowed by <span className="font-semibold text-black">{user.fullName}</span>
            </p>
            <p className="text-sm text-black"><span className='text-gray-600'>on</span> <span className="font-semibold">{borrowedDate}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BorrowRqstCard;
