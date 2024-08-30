'use client'
import React, { FormEvent, useContext } from 'react'
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import { UserContext } from '@/context/userContext';

export default function Create() {

    const context = useContext(UserContext)
    
    const router = useRouter();
    const [load, setLoad] = useState(false);

    const paragraphRef = useRef<HTMLTextAreaElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<File | null>(null);
    const userId = context?.user?._id

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (titleRef.current && paragraphRef.current && image && userId) {
            // Access the current values of the form elements
            const title = titleRef.current.value;
            const paragraph = paragraphRef.current.value;
            console.log("Hello")

            console.log(title, paragraph, image.name, image.type, image.size);

            setLoad(true);

            const formData = new FormData();
            formData.append('paragraph', paragraph);
            formData.append('title', title);
            formData.append('userId', userId);6
            formData.append('image', image);
            console.log("form data : ", formData);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/create`,{
                body : formData,
                method : 'POST',
              }
            )
            
            const data = await response.json();
            
            // Use FormData to send data including the image
            
            
            if (response.status === 200) {
                
                toast.success(data.message)

                titleRef.current.value = ''
                paragraphRef.current.value = ''


            } else {
                toast.error(data.message)
            }
            setLoad(false)

        }
        else{
            toast.error("Please put all the fields")
        }
    };
    return (
        <div className='min-h-screen bg-white md:py-10'>

        <form  onSubmit={(e)=>handleSubmit(e)}>
            <div className='flex flex-col gap-y-5 md:w-1/2 p-5 mx-auto text-gray-800 self-center justify-center bg-sky-200 rounded-xl drop-shadow-lg shadow-xl'>
                <h1 className='text-gray-600 font-serif font-bold text-3xl mx-auto '>Create Your Blog here</h1>
                <div className="relative w-full min-w-[200px] h-10">
                    <input
                        ref={titleRef}
                        className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                        placeholder=" " /><label
                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] peer-focus:text-gray-900 before:border-blue-gray-800 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900 text-gray-900">Title
                    </label>
                </div>
                <div className="relative w-full min-w-[200px]">
                    <textarea
                    ref={paragraphRef}
                    className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" ">
                    </textarea>
                    <label
                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Paragraph
                    </label>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Upload Thumbnail</label>
                    <input onChange={(e)=>handleImageChange(e)} className="block w-full text-sm text-gray-700 cursor-pointer bg-gray-50  focus:outline-none dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" /> 

                    <p className="mt-1 text-sm text-gray-600" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                </div>
                <button 
                    className="md:w-1/2  self-center align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="submit"
                    >
                    Create
                </button>
            </div>
        </form>
    </div>
    )
}
