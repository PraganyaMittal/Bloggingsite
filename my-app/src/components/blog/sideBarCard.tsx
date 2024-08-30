import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function SideBarCard({location, name, email} : {location:string, name:string, email:string} ) {
  return (
    <div>
         <Link href='#' className="flex items-center justify-between pb-3 pt-3 min-w-[14rem] border-black last:pb-0">
                            <div className="flex items-center gap-x-3">
                                <Image width={500} height={350}
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/${location}`}
                                    alt={name}
                                    className="relative inline-block h-10 w-10 rounded-full object-cover object-center"
                                />
                                <div>
                                    <h6
                                        className="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased"
                                    >
                                        {name}
                                    </h6>
                                    <p
                                        className="block font-sans text-sm font-light leading-normal text-gray-700 antialiased"
                                    >
                                        {email}
                                    </p>
                                </div>
                            </div>
                        </Link>
    </div>
  )
}
