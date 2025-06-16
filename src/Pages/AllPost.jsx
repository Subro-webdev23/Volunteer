import React, { useEffect, useState } from 'react';
import VolunteerCard from '../Component/HomeComponent/VolunteerCard';
import { Helmet } from 'react-helmet';
import { LuTableOfContents } from 'react-icons/lu';
import { FaTableCells } from 'react-icons/fa6';
import { Link } from 'react-router';
import { motion } from 'framer-motion';


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
            <div
                className='py-5'>
                <div className='md:flex justify-between items-center'>
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
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                                viewport={{ once: true }}
                                className="overflow-x-auto mt-4 px-4">
                                <table className="table border  min-w-full">
                                    <thead
                                        className='text-left'>
                                        <tr>
                                            <th>Thumbnail</th>
                                            <th>Title</th>
                                            <th className='hidden md:table-cell'>Category</th>
                                            <th className='hidden md:table-cell'>Location</th>
                                            <th className='hidden md:table-cell'>Deadline</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            displayPosts.map((post, i) => (
                                                <tr key={i}>
                                                    <td

                                                    >
                                                        <img src={post.thumbnail} alt="thumb" className='w-14 h-14 rounded object-cover' />
                                                    </td>
                                                    <td

                                                    >{post.title}</td>
                                                    <td

                                                        className='hidden md:table-cell'>{post.category}</td>
                                                    <td

                                                        className='hidden md:table-cell'>{post.location}</td>
                                                    <td

                                                        className='hidden md:table-cell'>{post.deadline}</td>
                                                    <td

                                                    ><Link to={`/postDetails/${post._id}`} className=" md:w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition">
                                                            Details
                                                        </Link></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </motion.div>
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