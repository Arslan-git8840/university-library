export const dynamic = "force-dynamic";
import UserTable from '@/components/admin/userTable'
import { db } from '@/db/drizzle'
import { users } from '@/db/schema'
import React from 'react'

async function Users() {
  const userList = await db.select().from(users);
  return (
    <div className='lg:p-8 px-3 py-6'>
      <h1 className='text-2xl font-semibold mb-4 text-primary-admin'>All Users</h1>
      <div className='lg:py-4 lg:px-8 px-2'>
        <UserTable userList={userList} />
      </div>
    </div>
  )
}

export default Users