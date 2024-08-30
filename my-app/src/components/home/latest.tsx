// app/albums/page.tsx
import React from 'react';

import Card from '@/components/blog/card';

interface IBlogs {
    imagePath : string,
    title : string,
    paragraph : string,
}

// Fetch the data inside the page component
const Latest = async () => {
    // Fetching data from jsonplaceholder
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/all`, { next: { revalidate : 60}});
    const blog = await res.json();

    // Map titles from the fetched data
    const allBlogs: IBlogs[] = blog.data.slice(-6)

    return (
        <div className='flex gap-x-3 flex-wrap  '>
            {allBlogs.map((blog : IBlogs, idx) => <Card key={idx} location={blog.imagePath} title={blog.title} paragraph={blog.paragraph}/>)}
        </div>
    );
};

export default Latest;
