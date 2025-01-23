import React from 'react';
import { PlusIcon } from 'lucide-react';
import BorrowRqstCard from './BorrowRqstCard';
import AccountRqstCard from './AccountRqstCard';
import { Button } from '../ui/button';
import Link from 'next/link';
import AddBookCard from './AddBookCard';
import { db } from '@/db/drizzle';
import { books } from '@/db/schema';
import { users } from '@/db/schema';
import { count } from 'drizzle-orm';
import { getBorrowedBooks } from '@/lib/getBorrowedBooks';
import { AlertDialogDemo } from './editform';
import { getBorrowedBook } from '@/lib/drizzleActions';

async function Dashboard() {
  const booklist = await db.select().from(books).limit(7);
  const userList = await db.select().from(users).limit(4);
  const user = await db.select({ count: count() }).from(users);
  const book = await db.select({ count: count() }).from(books);
  const totalBooks = book[0].count
  const totalUsers = user[0].count
  const totalBorrowedBooks = await getBorrowedBooks();
  const borrowedBooks = await getBorrowedBook();
  console.log('total borrowed books :', totalBorrowedBooks);
  return (
    <div className={` flex flex-col bg-slate-100/80 lg:px-8 px-[6px] lg:py-4 py-1 lg:gap-4 gap-0`}>

      <div className="gap-8 p-2 justify-between items-center lg:flex hidden">
        <div className={`p-4 bg-white w-1/3 h-24 flex flex-col justify-between rounded-lg`}>

          <p className='text-xl'>Borrowed Books</p>
          <p className='text-2xl font-bold'>{totalBorrowedBooks}</p>
        </div>
        <div className='p-4 bg-white w-1/3 h-24 flex flex-col justify-between rounded-lg'>
          <p className='text-xl'>Total Users</p>
          <p className='text-2xl font-bold'>{totalUsers}</p>
        </div>
        <div className='p-4 bg-white w-1/3 h-24 flex flex-col justify-between rounded-lg'>
          <p className='text-xl'>Total Books</p>
          <p className='text-2xl font-bold'>{totalBooks}</p>
        </div>
      </div>


      <div className='flex lg:flex-row flex-col gap-4 rounded-lg '>
        <div className='flex flex-col gap-2 lg:p-3 p-0'>
          <div>
            <div className='flex items-center justify-between mb-2'>
              <h1 className='font-semibold'>Borrow Requests</h1>
              <Button variant='link' className={'text-primary-admin'}><Link href={'/admin/borrowrequests'}>View All</Link></Button>
            </div>
            <div className='bookrqstcard lg:w-[550px] w-full overflow-scroll flex flex-col gap-2'>
              {borrowedBooks.data.map((borrowRecord) => (
                <BorrowRqstCard user ={borrowRecord.users} book={borrowRecord.books} record={borrowRecord.borrow_records}/>
              ))}
            </div>
          </div>
          <div className='mt-2'>
            <div className='flex items-center justify-between mb-2'>
              <h1 className='font-semibold'>Account Requests</h1>
              <Button variant='link' className={'text-primary-admin'}><Link href={'/admin/accountrequests'}>View All</Link></Button>
            </div>
            <div className='bookrqstcard max-w-[550px] flex justify-center flex-wrap gap-2 '>
              {userList.map((user) => (<AccountRqstCard key={user.id} user={user} />))}
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2 flex-1'>
          <h1 className='font-semibold mb-1'>All Books</h1>
          <div className='mb-2 flex items-center justify-between'>
            <Button className={'bg-primary-admin text-white'}><PlusIcon /> <Link href='/admin/addBook'>Add New Books</Link></Button>
            <Button variant='link' className={'text-primary-admin'}><Link href={'/admin/books'}>View All</Link></Button>
          </div>
          <div className='flex flex-col gap-2'>
            {booklist.map((book) => (<AddBookCard key={book.id} book={book} />))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
