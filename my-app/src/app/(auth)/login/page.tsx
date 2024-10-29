'use client'

import toast from 'react-hot-toast';
import Loading from '@/components/loading';
import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation'
import React, { useRef, FormEvent } from 'react'
import Link from 'next/link';
import Cookies from 'js-cookie';
import { UserContext } from '@/context/userContext';
export default function LoginPage() {

    const userContext = useContext(UserContext)

    const router = useRouter();
    const [load, setLoad] = useState(false);

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (emailRef.current && passwordRef.current) {
            // Access the current values of the form elements
            const email = emailRef.current.value;
            const password = passwordRef.current.value;

            setLoad(true);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                method : "POST",
                body : JSON.stringify({
                    email : email,
                    password : password
                })
            })
            // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`)
            const data = await response.json();




            if(response.status === 200){
                
                toast.success("login Successful")

                const token = data.data.token

                Cookies.set('authToken', token, {
                    expires: 7,           // Cookie will expire in 7 days
                    // secure: true,          // Ensure HTTPS in production
                    sameSite: 'Strict'     // Control cookie access (cross-site)
                });


                router.push('/profile')     
                userContext?.setUser(data.data)
                localStorage.setItem('user', JSON.stringify(data.data))
                emailRef.current.value = ''
                passwordRef.current.value = ''
                
            }else{
                toast.error("Email or Password is Wrong. Login failed")
            }
            setLoad(false)
            
            
            


        }
    };
    return (
        <form className='bg-green-200 p-8 flex justify-center items-center rounded-lg shadow-xl' onSubmit={(e) => handleSubmit(e)}>
            <div className="md:w-72 flex flex-col gap-y-6 ">
                <div className="relative w-full min-w-[200px] h-10">
                    <input id='email'
                        ref={emailRef}
                        className="peer text-gray-600 w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 shadow-lg focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                        placeholder=" " /><label
                            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Email</label>
                </div>
                <div className="relative w-full min-w-[200px] h-10">
                    <input
                        id = 'password'
                        ref={passwordRef}
                        className="peer text-gray-600  w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 shadow-lg focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                        placeholder=" " type='password' /><label
                            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Password</label>
                </div>
                <button className='select-none flex flex-row justify-evenly rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' type='submit' >Login<Loading load={load}/></button>
                <div className='mx-auto  flex flex-row gap-x-1'>
                    <p className='text-gray-700'>If you have not registerd then</p><Link className='text-blue-700' href='/register' >regsiter</Link>
                </div>
            </div>
        </form>
    )
}
