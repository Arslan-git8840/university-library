'use client';
import React from 'react';
import BookCover from '@/components/BookCover2';

function AddBookCard({ book }) {
  const createdAt = new Date(book.createdAt);

  // Format it as a readable date string
  const date = createdAt.toLocaleDateString('en-US', {
    weekday: 'long', // Day of the week (e.g., Monday)
    year: 'numeric',
    month: 'long', // Full month name (e.g., January)
    day: 'numeric'
  });
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
              Added by <span className="font-medium text-gray-800">{book.author}</span>
            </p>
            <p className="text-sm text-gray-500">on <span className="font-medium">{date}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBookCard;
