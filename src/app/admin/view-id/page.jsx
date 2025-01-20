'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { IKImage } from 'imagekitio-next';
function ViewIdCard() {
    const params = useSearchParams();
    const id = params.get("id");
  return (
    <div className='p-4 md:w-[550px] w-full mx-auto md:mt-12 mt-10'>
        <IKImage path={id} urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT} className="w-full h-full" width={1000} height={1000}></IKImage>
    </div>
  )
}

export default ViewIdCard