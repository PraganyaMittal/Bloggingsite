'use client'
import { UserContext } from '@/context/userContext';
import React, { useContext, useEffect, useState } from 'react'
import Card from '@/components/blog/card';
import Image from 'next/image';

interface IBlogs {
    imagePath: string,
    title: string,
    paragraph: string,
}

export default function Profile() {

    const [allBlogs, setBlogs] = useState<IBlogs[] | null>(null)
    const context = useContext(UserContext)
    const name = context?.user?.name;
    const location = context?.user?.profileImage;
    const email = context?.user?.email;
    const description = context?.user?.description;
    const title = context?.user?.title;

    const userId = context?.user?._id;
    

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/user`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        userId: userId
                    })
                })

            const blog = await res.json();
            console.log(blog)
            setBlogs(blog.data)
        }
        fetchData();
    }, [userId])
    // var allBlogs:  = blog.data
    return (

        <div className='min-h-screen w-full flex flex-col items-center bg-white text-black'>
            <div
                className="relative flex w-full max-w-[20rem] md:max-w-[34rem] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
                <div
                    className="relative flex items-center gap-4 pt-0 pb-4 mx-0 mt-4 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border">
                    <Image width={500} height={350}
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${location}`}
                        alt={location!}
                        className="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center" />
                    <div className="flex w-full flex-col gap-0.5">
                        <div className="flex items-center justify-between">
                            <h5
                                className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                                {name}
                            </h5>


                        </div>

                        <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
                            {email}
                        </p>
                        <p className="block font-sans text-base antialiased font-light leading-relaxed text-blue-gray-900">
                            {title}
                        </p>
                    </div>
                </div>
                <div className="p-0 mb-6">
                    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit ">
                        {description}
                    </p>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <h4>Your Blogs</h4>
                <div className='flex justify-center gap-11 flex-wrap py-10 md:p-20'>
                    {allBlogs?.map((blog: IBlogs, idx: number) => <Card key={idx} location={blog.imagePath} title={blog.title} paragraph={blog.paragraph} />)}
                </div>
            </div>
        </div>
    )
}
