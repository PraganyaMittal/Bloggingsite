import Image from 'next/image'
import React from 'react'

export default function AuthorCard({location, description, title, name} : {name : string, location : string, description : string, title:string }) {

  let desc  = description?.slice(0, 150).concat('.....')
  return (
    <div
  className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-lg shadow-gray-400 px-4">
  <div
    className="relative flex items-center gap-4 pt-0 pb-8 mx-0 mt-4 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
    <Image width={500} height={350}
    src={`${process.env.NEXT_PUBLIC_API_URL}/${location}`}
    alt={location}
    className="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center" />
    <div className="flex w-full flex-col gap-0.5">
      <div className="flex items-center justify-between">
        <h5
          className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {name}
        </h5>
        
      </div>
      <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
{title}      </p>
    </div>
  </div>
  <div className="p-0 mb-6">
    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
      {desc}
    </p>
  </div>
</div>  
  )
}
