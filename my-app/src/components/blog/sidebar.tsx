// app/albums/page.tsx
import React from 'react';

import Card from '@/components/blog/card';
import AuthorCard from '@/components/profile/AuthorCard';
import SideBarCard from './sideBarCard';

interface IAuthors {
    profileImage : string,
    name : string,
    title : string,
    description : string,
    email : string
}

// Fetch the data inside the page component
const SideBar = async () => {
    // Fetching data from jsonplaceholder
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/authors`, { cache : 'no-store' });
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/all`, { next: { revalidate: 3600 } });
    const authors = await res.json();

    // Map titles from the fetched data
    const allAuthors: IAuthors[] = authors.data.splice(0,7)

    return (
        <div className='flex flex-col gap-y-4 justify-center '>
            {allAuthors.map((author : IAuthors, idx) => <SideBarCard name={author.name} location={author.profileImage} email={author.email} key={idx} />)}
        </div>
    );
};

export default SideBar;
