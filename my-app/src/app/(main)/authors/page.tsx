// app/albums/page.tsx
'use client'
import React from 'react';

import Card from '@/components/blog/card';
import AuthorCard from '@/components/profile/AuthorCard';

interface IAuthors {
    profileImage : string,
    name : string,
    title : string,
    description : string,
}

// Fetch the data inside the page component
const Authors = async () => {
    // Fetching data from jsonplaceholder
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/authors`, { cache : 'no-store' });
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/all`, { next: { revalidate: 3600 } });
    const authors = await res.json();

    // Map titles from the fetched data
    const allAuthors: IAuthors[] = authors.data

    return (
        <div className='flex justify-center gap-10 flex-wrap py-10 p-10 md:p-20'>
            {allAuthors.map((author : IAuthors, idx) => <AuthorCard name={author.name} location={author.profileImage} title={author.title} description={author.description} key={idx} />)}
        </div>
    );
};

export default Authors;
