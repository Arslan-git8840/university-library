import TooManyRequests from '@/components/rate-limit-error'
import React from 'react'

function ErrorPage() {
  return (
    <div><TooManyRequests/></div>
  )
}

export default ErrorPage