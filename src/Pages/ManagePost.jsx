import React, { useEffect, useState } from 'react';
import useAuth from '../hook/useAuth';
import VolunteerCard from '../Component/HomeComponent/VolunteerCard';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const ManagePost = () => {
    const [myPost, setMyPost] = useState([]);
    const [myRequest, setMyRequest] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://localhost:3000/myPost/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setMyPost(data)
            })
    })
    useEffect(() => {
        fetch(`http://localhost:3000/myRequest/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setMyRequest(data)
            })
    })
    const handleUpdate = (id) => {
        navigate(`/update/${id}`)

    }
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            console.log(result.isConfirmed)
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/update/${id}`)
                    .then(data => {
                        if (data.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Tip has been deleted.",
                                icon: "success"
                            });

                            // remove the Tips from the state
                            const remainingPost = myPost.filter(singlePost => singlePost._id !== id);
                            setMyPost(remainingPost);
                        }
                    })
            }
        })

    }
    const handleCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then((result) => {
            console.log(result.isConfirmed)
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/requests/${id}`)
                    .then(data => {
                        if (data.data.deletedCount) {
                            Swal.fire({
                                title: "Canceled!",
                                text: "Your Tip has been Canceled.",
                                icon: "success"
                            });

                            // remove the Tips from the state
                            const remainingRequest = myRequest.filter(singleRequest => singleRequest._id !== id);
                            setMyPost(remainingRequest);
                        }
                    })
            }
        })
    }


    return (
        <div className='max-w-6xl mx-auto'>
            <Helmet>
                <title>Manage Post</title>
            </Helmet>
            <div className='py-5'>
                <div className='mb-20'>
                    <h2 className='text-4xl font-bold mb-5'>My Volunteer Need Post</h2>
                    {
                        myPost.length === 0 ? <p className='text-2xl font-medium text-center'>No Post added Yet</p> : <table className="w-full table-auto border-collapse border border-gray-300">
                            <thead>
                                <tr >
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
                    }

                </div>
                <div>
                    <h2 className='text-4xl font-bold mb-5'>My Volunteer Request Post </h2>
                    {

                        myRequest.length === 0 ? (
                            <p className='text-2xl font-medium text-center'>You have Request yet!</p>
                        ) : (
                            <table className="w-full border border-gray-300 table-auto">
                                <thead>
                                    <tr>
                                        <th className="border px-4 py-2">Thumbnail</th>
                                        <th className="border px-4 py-2">Title</th>
                                        <th className="border px-4 py-2">Location</th>
                                        <th className="border px-4 py-2">Volunteers Needed</th>
                                        <th className="border px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myRequest.map((post) => (
                                        <tr key={post._id} className="text-center">
                                            <td className="border px-4 py-2">
                                                <img
                                                    src={post.thumbnail}
                                                    alt={post.title}
                                                    className="h-16 w-24 object-cover rounded"
                                                />
                                            </td>
                                            <td className="border px-4 py-2">{post.title}</td>
                                            <td className="border px-4 py-2">{post.location}</td>
                                            <td className="border px-4 py-2">{post.volunteersNeeded}</td>
                                            <td className="border px-4 py-2">
                                                <button
                                                    onClick={() => handleCancel(post._id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Cancel
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                    }
                </div>

            </div>

        </div>
    );
};

export default ManagePost;