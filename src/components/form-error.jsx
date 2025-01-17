import React from 'react'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

function Formerror({message}) {
  return (
    <div className='mt-4 p-4 bg-destructive/20 flex items-center gap-x-3 rounded-lg'><ExclamationTriangleIcon color='red'/>{message}</div>
  )
}

export default Formerror