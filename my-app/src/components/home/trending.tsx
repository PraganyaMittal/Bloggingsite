// app/albums/page.tsx
import React from 'react';

import Card from '@/components/blog/card';

interface IBlogs {
    imagePath : string,
    title : string,
    paragraph : string,
}

// Fetch the data inside the page component
const Trending = async () => {
    // Fetching data from jsonplaceholder
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/all`, { cache : 'no-store'});
    const blog = await res.json();

    // Map titles from the fetched data
    const allBlogs: IBlogs[] = blog.data?.slice(0,6)

    return (
        <div className='flex gap-x-3 flex-wrap '>
            {allBlogs ? allBlogs?.map((blog : IBlogs, idx) => <Card key={idx} location={blog.imagePath} title={blog.title} paragraph={blog.paragraph}/>)  : <div>Loading</div>}
        </div>
    );
};

export default Trending;
