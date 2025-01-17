'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react'
function SesProvider({ children }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default SesProvider