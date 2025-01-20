import UserAccountTable from '@/components/admin/UserAccountsTable'
import { db } from '@/db/drizzle'
import { users } from '@/db/schema'
import React from 'react'

async function AccountRequestsPage() {
  const userList = await db.select().from(users);
  return (
    <div>
        <div className='p-8'>
            <h1 className='text-2xl font-semibold text-primary-admin'>Account Requests</h1>
            <div className='py-4 px-8 flex flex-col space-y-2'>
                <UserAccountTable userList={userList}/>
            </div>
        </div>
    </div>
  )
}

export default AccountRequestsPage