'use client';
import React from 'react';
import BookCover from '../BookCard';

function AddBookCard() {
  return (
    <div className="p-3 bg-white shadow-md rounded-md">
      <div className="flex gap-6">
        {/* Book Cover Section */}
        <div className="w-16 flex-shrink-0">
          <BookCover
            coverUrl="/books/covers/React_in_Action_lEnUcul5_.jpg?updatedAt=1737001284754"
            coverColor="#302428"
          />
        </div>

        {/* Book Info Section */}
        <div className="flex flex-col justify-between">
          {/* Title and Author */}
          <div>
            <p className="text-base font-semibold text-gray-800">React in Action</p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Author Name</span> · <span>Category</span>
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
              Added by <span className="font-medium text-gray-800">Username</span>
            </p>
            <p className="text-sm text-gray-500">on <span className="font-medium">Date</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBookCard;
