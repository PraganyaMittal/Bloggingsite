'use client'
import { UserContext } from '@/context/userContext'
import Logout from './logout'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import Avatar from './profile/avatar'


export default function NavigationBar() {

    const context = useContext(UserContext)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const contextUser = localStorage.getItem('user');
            if (contextUser && !context?.user) {
                context?.setUser(JSON.parse(contextUser));
            }
        }
    }, [context]);

    return (
        <nav
            className="sticky top-0 z-10 block w-full max-w-full px-4 py-2 text-white bg-slate-900 rounded-none shadow-lg shadow-black/50 h-max  bg-opacity-90 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Link href='/'
                    className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased">
                    Bloghere
                </Link>
                <div className="flex items-center gap-4">
                    <div className="hidden mr-4 lg:block">
                        <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                <Link href="/home" className="flex items-center">
                                    Home
                                </Link>
                            </li>
                            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                <Link href="/blogs" className="flex items-center">
                                    Blogs
                                </Link>
                            </li>
                            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                <Link href="/authors" className="flex items-center">
                                    Authors
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {!context?.user ?
                        <div className="flex items-center gap-x-1">
                            <Link href='/login'
                                className="hidden px-4 py-2 font-sans text-xs font-bold text-center text-white uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                                type="button">
                                <span>Log In</span>
                            </Link>
                            <Link href='/register'
                                className="hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                                 >
                                <span>Sign in</span>
                            </Link>
                        </div>
                        :
                        <div className='flex gap-x-5'>
                            <Link href='/create' className='px-4 py-2 flex items-center font-sans text-xs font-bold  bg-green-500 text-white uppercase transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none '>Create Blog</Link>
                            <Logout />
                            <Avatar location={context?.user.profileImage} />
                        </div>
                    }
                    <button
                        className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
                        type="button">
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor"
                                strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </nav>

    )
}
