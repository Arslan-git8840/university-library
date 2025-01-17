import UserAccountTable from '@/components/admin/UserAccountsTable'
import React from 'react'

function AccountRequestsPage() {
  return (
    <div>
        <div className='p-8'>
            <h1 className='text-2xl font-semibold text-primary-admin'>Account Requests</h1>
            <div className='py-4 px-8 flex flex-col space-y-2'>
                <UserAccountTable/>
            </div>
        </div>
    </div>
  )
}

export default AccountRequestsPage