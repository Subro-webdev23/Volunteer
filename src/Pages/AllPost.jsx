import React, { useEffect, useState } from 'react';
import VolunteerCard from '../Component/HomeComponent/VolunteerCard';
import { Helmet } from 'react-helmet';

const AllPost = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([])
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        fetch('http://localhost:3000/allPost')
            .then(res => res.json())
            .then(data => {
                setPosts(data)
                setLoading(false)
            })
    }, [])
    if (loading) {
        return (
            <div className='flex justify-center items-center'>
                <span className="loading loading-spinner min-h-svh loading-xl"></span>
            </div>
        );
    }
    // console.log(posts);
    const filteredTitles = posts.filter(post => {
        return post.title.toLowerCase().includes(searchText.trim().toLowerCase())
    })
    const displayPosts = searchText ? filteredTitles : posts;

    return (
        <div className='max-w-6xl mx-auto'>
            <Helmet>
                <title>All Post</title>
            </Helmet>
            <div className='py-5'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-4xl font-bold my-5'>All volunteer need posts</h2>
                    <form onChange={e => setSearchText(e.target.value)} >
                        <input type="text" className='p-2 border rounded' placeholder='Search by Title' />
                    </form>
                </div>
                <div className='grid grid-cols-3 gap-5'>
                    {
                        displayPosts.length === 0 ? (
                            <p className='text-gray-500 col-span-3 text-center'>No posts found</p>
                        ) : (
                            displayPosts.map((post, index) => (
                                <VolunteerCard key={index} data={post} />
                            ))
                        )

                    }
                </div>
            </div>
        </div>
    );
};

export default AllPost;