import UserTable from '@/components/admin/userTable'
import { db } from '@/db/drizzle'
import { users } from '@/db/schema'
import React from 'react'

async function Users() {
  const userList = await db.select().from(users);
  return (
    <div className='p-8'>
        <h1 className='text-2xl font-semibold mb-4 text-primary-admin'>All Users</h1>
        <div className='py-4 px-8'>
            <UserTable userList={userList} />
        </div>
    </div>
  )
}

export default Users