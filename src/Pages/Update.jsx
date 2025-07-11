import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAuth from '../hook/useAuth';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const Update = () => {
    const { id } = useParams();
    console.log(id);

    const [post, setPost] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());
    useEffect(() => {
        fetch(`https://assignment-11-server-nu-sage.vercel.app/myPost/${user.email}/${id}`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                setPost(data)
            })
    }, [user.email, id])
    console.log(post);

    // console.log("Update Post", post);
    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const updateData = Object.fromEntries(formData.entries());
        axios.put(`https://assignment-11-server-nu-sage.vercel.app/update/${id}`, updateData, { withCredentials: true })
            .then(data => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Update Success!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/managePost')
            })

    }

    return (
        <div className="max-w-xl mx-auto p-6 shadow-xl rounded-2xl">
            <Helmet>
                <title>Update</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-4">Add Volunteer Need Post</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
                {/* Thumbnail */}
                <div>
                    <label className="block font-semibold">Thumbnail</label>
                    <input
                        type="text"
                        name="thumbnail"
                        defaultValue={post.thumbnail}
                        className="w-full p-2 border rounded"
                        placeholder='Images URL'
                    />
                </div>

                {/* Post Title */}
                <div>
                    <label className="block font-semibold">Post Title</label>
                    <input
                        type="text"
                        name="title"
                        defaultValue={post.title}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-semibold">Description</label>
                    <textarea
                        name="description"
                        defaultValue={post.description}
                        required
                        className="w-full p-2 border rounded"
                    ></textarea>
                </div>

                {/* Category */}
                <div>
                    <label className="block font-semibold">Category</label>
                    {post.category && (
                        <select
                            name="category"
                            defaultValue={post.category}
                            required
                            className="w-full p-2 border rounded"
                        >
                            <option className='text-gray-500' value="">-- Select Category --</option>
                            <option className='text-gray-500' value="healthcare">Healthcare</option>
                            <option className='text-gray-500' value="education">Education</option>
                            <option className='text-gray-500' value="social service">Social Service</option>
                            <option className='text-gray-500' value="animal welfare">Animal Welfare</option>
                        </select>
                    )}
                </div>

                {/* Location */}
                <div>
                    <label className="block font-semibold">Location</label>
                    <input
                        type="text"
                        name="location"
                        defaultValue={post.location}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* No. of Volunteers Needed */}
                <div>
                    <label className="block font-semibold">No. of Volunteers Needed</label>
                    <input
                        type="number"
                        name="volunteersNeeded"
                        defaultValue={post.volunteersNeeded}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Deadline */}
                <div>
                    <label className="block font-semibold">Deadline</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        className="w-full p-2 border rounded"
                    />
                    <input type="hidden" name="deadline" value={selectedDate.toISOString()} />
                </div>

                {/* Organizer Name */}
                <div>
                    <label className="block font-semibold">Organizer Name</label>
                    <input
                        type="text"
                        name='name'
                        readOnly
                        defaultValue={user.displayName}
                        className="w-full cursor-not-allowed p-2 border rounded"
                    />
                </div>

                {/* Organizer Email */}
                <div>
                    <label className="block font-semibold">Organizer Email</label>
                    <input
                        type="email"
                        name='email'
                        readOnly
                        defaultValue={user.email}
                        className="w-full p-2 border cursor-not-allowed rounded"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Update Post
                </button>
            </form>
        </div>
    );
};

export default Update;