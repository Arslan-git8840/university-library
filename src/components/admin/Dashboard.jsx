import React from 'react';
import { Input } from '../ui/input';
import { SearchIcon, PlusIcon } from 'lucide-react';
import BorrowRqstCard from './BorrowRqstCard';
import AccountRqstCard from './AccountRqstCard';
import { Button } from '../ui/button';
import Link from 'next/link';
import AddBookCard from './AddBookCard';

function Dashboard() {
  return (
    <div className="flex flex-col bg-slate-100/80 px-8 py-4 gap-4">
      {/* Header Section */}
      {/* <div className="p-4 bg-white flex justify-between items-center rounded-lg"> */}
        {/* <h1 className="text-lg">
          Welcome to bookwise, <span className="text-xl font-semibold text-blue-500">Adrian</span>
        </h1> */}
        {/* Search Input */}
        {/* <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
          <Input
            className="pl-10 pr-4 py-2 w-96 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 focus:border-blue-500"
            placeholder="Search books..."
          />
        </div> */}
      {/* </div> */}

      <div className="flex gap-8 justify-between items-center">
        <div className='p-4 bg-white w-1/3 h-24 flex flex-col justify-between rounded-lg'>
          <p className='font-semibold'>Borrowed Books</p>
          <p className='text-2xl font-bold'>145</p>
        </div>
        <div className='p-4 bg-white w-1/3 h-24 flex flex-col justify-between rounded-lg'>
          <p className='font-semibold'>Total Users</p>
          <p className='text-2xl font-bold'>145</p>
        </div>
        <div className='p-4 bg-white w-1/3 h-24 flex flex-col justify-between rounded-lg'>
          <p className='font-semibold'>Total Books</p>
          <p className='text-2xl font-bold'>145</p>
        </div>
      </div>


      <div className='flex gap-4 rounded-lg'>
        <div className='flex flex-col gap-2 p-3'>
          <div>
            <div className='flex items-center justify-between mb-2'>
            <h1 className='font-semibold'>Borrow Requests</h1>
            <Button variant='link' className={'text-primary-admin'}><Link href={'/admin/borrowrequests'}>View All</Link></Button>
            </div>
            <div className='bookrqstcard w-[550px] overflow-scroll flex flex-col gap-2'>
              <BorrowRqstCard />
              <BorrowRqstCard />
              <BorrowRqstCard />
              <BorrowRqstCard />
              <BorrowRqstCard />
            </div>
          </div>
          <div className='mt-2'>
          <div className='flex items-center justify-between mb-2'>
            <h1 className='font-semibold'>Account Requests</h1>
            <Button variant='link' className={'text-primary-admin'}><Link href={'/admin/accountrequests'}>View All</Link></Button>
            </div>
            <div className='bookrqstcard max-w-[550px] flex justify-center flex-wrap gap-2 '>
              <AccountRqstCard />
              <AccountRqstCard />
              <AccountRqstCard />
              <AccountRqstCard />
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2 flex-1'>
            <h1 className='font-semibold mb-1'>All Books</h1>
            <div className='mb-2 flex items-center justify-between'>
              <Button className={'bg-primary-admin text-white'}><PlusIcon /> Add New Books</Button>
              <Button variant='link' className={'text-primary-admin'}><Link href={'/admin/books'}>View All</Link></Button>
            </div>
            <div className='flex flex-col gap-2'>
            <AddBookCard />
            <AddBookCard />
            <AddBookCard />
            <AddBookCard />
            <AddBookCard />
            <AddBookCard />
            <AddBookCard />
            </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
