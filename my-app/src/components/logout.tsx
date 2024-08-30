import toast from 'react-hot-toast';
import { UserContext } from '@/context/userContext'
import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'

export default function Logout() {
    const userContext = useContext(UserContext)
    const router = useRouter();

    function handleLogout(){
        userContext?.setUser(null);
        localStorage.removeItem('user');
        toast.success("logout successful")
        router.push('/')
    }
  return (
    <button className='hidden select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block' onClick={()=>handleLogout()}>Logout</button>
  )
}
