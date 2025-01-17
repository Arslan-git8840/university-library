import React from 'react';

function AccountRqstCard() {
  return (
    <div className="p-3 bg-white rounded-lg shadow-md flex items-center gap-4 w-[48%]">
      {/* User Icon */}
      <div className="flex-shrink-0">
        <img
          src="/icons/user.svg"
          alt="User Icon"
          className="w-12 h-12 rounded-full bg-gray-100 p-2"
        />
      </div>

      {/* User Info */}
      <div>
        <p className="text-base font-semibold text-gray-800">Name</p>
        <p className="text-sm text-gray-600">email@example.com</p>
      </div>
    </div>
  );
}

export default AccountRqstCard;
