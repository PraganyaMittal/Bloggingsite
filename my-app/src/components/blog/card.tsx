import Image from 'next/image'
import React from 'react'

export default function Card({ location, title, paragraph }: { location: string, title: string, paragraph: string }) {

    let pgh = paragraph[0].slice(0, 150).concat('.....')

    return (
        <div>
            <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-lg shadow-black/20 bg-clip-border rounded-xl w-64">
                <div
                    className="h-32 mx-4 overflow-clip items-center text-white shadow-lg rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                    <Image className="object-center " width={500} height={350}
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${location}`}
                        alt={`${process.env.NEXT_PUBLIC_API_URL}/${location}`} />
                </div>
                <div className="px-6 py-2">
                    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        {title}
                    </h5>
                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                        {pgh}
                    </p>
                </div>
                <div className="p-6 pt-0">
                    <button
                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                        type="button">
                        Read More
                    </button>
                </div>
            </div>
        </div>
    )
}
