import BookDetails from '@/components/BookDetails'
import BookList from '@/components/BookList'
import React from 'react'

async function Page({params}) {
    const id = await params.id;
  return (
    <div className='text-white'>
        <BookDetails id={id}/>
        <div>
            <BookList limit={false} title='Related Books' excludedBook={id}/>
        </div>
    </div>
  )
}

export default Page