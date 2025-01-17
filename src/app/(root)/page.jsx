import BookOverview from '@/components/BookOverview'
import React from 'react'
import BookList from '@/components/BookList'

function Home() {

  return (
    <div className='text-white w-full'>
      <BookOverview />
      {/* <div className='relative w-[300px]'><BookCover coverImage={book.coverUrl} coverColor={book.coverColor} /></div> */}
      <div>
        <BookList />
      </div>
    </div>
  )
}

export default Home