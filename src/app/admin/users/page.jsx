import UserTable from '@/components/admin/userTable'
import React from 'react'

function Users() {
  return (
    <div className='p-8'>
        <h1 className='text-2xl font-semibold mb-4 text-primary-admin'>All Users</h1>
        <div className='py-4 px-8'>
            <UserTable/>
        </div>
    </div>
  )
}

export default Users