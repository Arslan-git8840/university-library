import React from 'react'
import { CheckCircle } from "lucide-react";
function Formsuccess({message}) {
  return (
    <div className='mt-4 p-4 bg-primary-gold flex items-center gap-x-3 rounded-lg font-semibold'><CheckCircle size={20} color='green'/>{message}</div>
  )
}

export default Formsuccess