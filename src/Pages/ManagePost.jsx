import React, { useEffect, useState } from 'react';
import useAuth from '../hook/useAuth';
import axios from 'axios';
import VolunteerCard from '../Component/HomeComponent/VolunteerCard';

const ManagePost = () => {
    const [myPost, setMyPost] = useState([]);
    const { user } = useAuth();
    useEffect(() => {
        fetch(`http://localhost:3000/myPost/${user.email}`)
            .then(res => res.json())
            .then(data => setMyPost(data))
    })

    return (
        <div className='max-w-6xl mx-auto'>
            <div className='py-5'>
                <div>
                    <h2 className='text-4xl font-bold mb-5'>My Volunteer Need Post</h2>
                    <table className="w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Thumbnail</th>
                                <th className="border border-gray-300 px-4 py-2">Title</th>
                                <th className="border border-gray-300 px-4 py-2">Location</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myPost.map((singlePost) => (
                                <tr key={singlePost._id} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2">
                                        <img
                                            src={singlePost.thumbnail}
                                            alt={singlePost.title}
                                            className="h-16 w-24 object-cover rounded"
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{singlePost.title}</td>
                                    <td className="border border-gray-300 px-4 py-2">{singlePost.location}</td>
                                    <td className="border border-gray-300 px-4 py-2 space-x-2">
                                        <button
                                            onClick={() => handleUpdate(singlePost._id)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(singlePost._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
                <div>

                    <h2 className='text-4xl font-bold mb-5'>My Volunteer Request Post </h2>
                </div>

            </div>

        </div>
    );
};

export default ManagePost;