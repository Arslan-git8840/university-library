import React from 'react'
import BookCover from './BookCard'
function BookEffect() {
  return (
    <div className='relative z-20'>
        <BookCover />
        <div className='absolute left-[50px] top-0 rotate-12 opacity-60 z-0'>
            <BookCover/>
        </div>
    </div>
  )
}   

export default BookEffect