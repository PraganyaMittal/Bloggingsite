import Sidebar from '@/components/blog/sidebar'
import React from 'react'
import Trending from '@/components/home/trending'
import Latest from '@/components/home/latest'
import Others from '@/components/home/others'
import NavigationBar from '@/components/navigation'

export default function HomePage() {
  return (
    <div className='flex md:flex-col min-h-screen w-full'>
      <NavigationBar/>
      <div className='bg-black flex '>
        <div>
          <h3 className='absolute bg-black text-5xl md:px-10 md:py-32 text-white leading-relaxed italic font-serif'>Blogging is to writing what extreme sports are to athletics: more free-form, more accident-prone, less formal, more alive...</h3>
        </div>
        <img
          className="object-center w-full md:h-screen opacity-20"
          src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2832&amp;q=80"
          alt="nature image"
        />
      </div>
      <div className='flex justify-between relative min-h-screen w-full px-4 md:px-10 py-10'>

        <div>
          <section className='border-t border-gray-600 mt-5 py-4 '>
            
            <h3 className='text-2xl   font-serif font-semibold text-black'>Trending</h3>
            <Trending/>
          </section>
          <section className='border-t border-gray-600 mt-5 py-4 '>
            
            <h3 className='text-2xl   font-serif font-semibold text-black'>Latest</h3>
            <Latest/>
          </section>
          <section className='border-t border-gray-600 mt-5 py-4 '>
            
            <h3 className='text-2xl font-serif font-semibold text-black'>Others</h3>
            <Others/>
          </section>
        </div>
        <aside className='p-4 md:py-10 border-black'>
          <h3 className='text-2xl font-serif font-semibold text-gray-800'>Famous Authors</h3>
          <Sidebar />
        </aside>
      </div>

    </div>
  )
}
