import BookOverview from '@/components/BookOverview'
import React from 'react'
import BookList from '@/components/BookList'
// import { db } from '@/db/drizzle';
// import { books } from '@/db/schema';

function Home() {
  // const bookArray = await db.select().from(books).limit(1);
  //   console.log(bookArray);
  //   const bookData = bookArray[0];
  //   console.log('homepagebook',bookData)

  return (
    <div className='text-white w-full'>
      <BookOverview/>
      {/* <div className='relative w-[300px]'><BookCover coverImage={book.coverUrl} coverColor={book.coverColor} /></div> */}
      <div>
        <BookList limit={true} title={'Latest Books'}/>
      </div>
    </div>
  )
}

export default Home