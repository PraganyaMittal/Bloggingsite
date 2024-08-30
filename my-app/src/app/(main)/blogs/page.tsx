// app/albums/page.tsx
import React from 'react';

import Card from '@/components/blog/card';

interface IBlogs {
    imagePath : string,
    title : string,
    paragraph : string,
}

// Fetch the data inside the page component
const BlogPage = async () => {
    // Fetching data from jsonplaceholder
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/all`, { next: { revalidate : 60}});
    const blog = await res.json();

    // Map titles from the fetched data
    const allBlogs: IBlogs[] = blog.data

    return (
        <div className='flex justify-center gap-11 flex-wrap py-10 md:p-20'>
            {allBlogs.map((blog : IBlogs, idx) => <Card key={idx} location={blog.imagePath} title={blog.title} paragraph={blog.paragraph}/>)}
        </div>
    );
};

export default BlogPage;
