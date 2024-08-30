'use client'
import React from 'react'

export default function AuthLayout({ children} : {children : React.ReactNode}) {
  return (
    <div className='mx-auto min-h-screen flex flex-col justify-center items-center bg-white'>
        {children}
    </div>
  )
}
