'use client'
import React from 'react'
import { UserAvatar } from './UserAvatar'
import { IKImage } from 'imagekitio-next'

export default function UserInfo({url,fullName,universityId}) {
  return (
    <div className="p-4 rounded-lg shadow-lg flex flex-col items-center space-y-4">
      {/* User Info Section */}
      <div className="flex flex-col justify-center space-y-8">
        {/* Avatar and User Info */}
        <div className="flex items-center space-x-4">
          <UserAvatar className="w-28 h-28 rounded-full border-2 border-white"  />
          <div className="text-white">
            <p className="text-xl font-semibold">{fullName}</p>
            <p className="text-gray-400 text-sm">University ID: <span className="font-semibold">{universityId}</span></p>
          </div>
        </div>

        {/* Image Section */}
        <div>
          <IKImage 
            urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT} 
            path={url}
            className="w-[26rem] h-[18rem] rounded-lg object-cover shadow-md"
            width={1000}
            height={1000}
          />
        </div>
      </div>

      {/* Additional Styling (optional) */}
      <div className="mt-8 text-center text-gray-400">
        <p className="text-sm">User Profile Information</p>
      </div>
    </div>
  )
}
