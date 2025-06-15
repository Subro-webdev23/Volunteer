import React, { useEffect, useState } from 'react';
import VolunteerCard from '../Component/HomeComponent/VolunteerCard';
import { Helmet } from 'react-helmet';
import { LuTableOfContents } from 'react-icons/lu';
import { FaTableCells } from 'react-icons/fa6';


const AllPost = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([])
    const [isTableLayout, setIsTableLayout] = useState(false);
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
    const handleTable = () => {
        setIsTableLayout(true);

    }
    const handleCard = () => {
        setIsTableLayout(false);

    }
    return (
        <div className='max-w-6xl mx-auto'>
            <Helmet>
                <title>All Post</title>
            </Helmet>
            <div className='py-5'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-4xl font-bold my-5'>All volunteer need posts</h2>
                    <div className='flex gap-5 items-center'>
                        <div className='flex gap-5'>
                            <LuTableOfContents onClick={handleTable}
                                className={`cursor-pointer ${isTableLayout && 'text-blue-400'}`}
                                size={22}
                                title="Table View"
                            />
                            <FaTableCells onClick={handleCard}
                                className={`cursor-pointer ${!isTableLayout && 'text-blue-400'}`}
                                size={22}
                                title="Table View" />
                        </div>
                        <form onChange={e => setSearchText(e.target.value)} >
                            <input type="text" className='p-2 border rounded' placeholder='Search by Title' />
                        </form>
                    </div>
                </div>
                <div >
                    {
                        displayPosts.length === 0 ? (
                            <p className='text-gray-500 col-span-3 text-center'>No posts found</p>
                        ) : isTableLayout ? (
                            <div className="overflow-x-auto mt-4">
                                <table className="table w-full border">
                                    <thead className='text-left'>
                                        <tr>
                                            <th>Thumbnail</th>
                                            <th>Title</th>
                                            <th>Category</th>
                                            <th>Volunteers Needed</th>
                                            <th>Deadline</th>
                                            <th>Location</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            displayPosts.map((post, i) => (
                                                <tr key={i}>
                                                    <td>
                                                        <img src={post.thumbnail} alt="thumb" className='w-14 h-14 rounded object-cover' />
                                                    </td>
                                                    <td>{post.title}</td>
                                                    <td>{post.category}</td>
                                                    <td>{post.volunteersNeeded}</td>
                                                    <td>{post.deadline}</td>
                                                    <td>{post.location}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-4'>
                                {
                                    displayPosts.map((post, index) => (
                                        <VolunteerCard key={index} data={post} />
                                    ))
                                }
                            </div>
                        )

                    }
                </div>
            </div>
        </div>
    );
};

export default AllPost;