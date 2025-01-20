import React from 'react'
import BookCover from './BookCover2'

function BookDisplay({coverColor, coverImage}) {
  return (
    <div className='relative'>
      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage= {coverImage}
          />

          <div className="absolute left-[5.1rem] top-[3.2rem] rotate-[18deg]  scale-[1.2] opacity-40 max-sm:hidden">
            {/* scale 1.2 rotate 18deg left 5.1rem top3.4rem */}
            <BookCover
              variant="wide"
              coverColor= {coverColor}
              coverImage= {coverImage}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDisplay