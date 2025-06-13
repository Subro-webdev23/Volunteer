import React, { useContext, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddPost = () => {
    const { user } = useContext(AuthContext)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const postData = Object.fromEntries(formData.entries());
        // console.log(postData);
        axios.post('http://localhost:3000/recruiterPost', postData)
            .then(response => {
                // console.log('post successfully', response.data);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Loged in Success!",
                    showConfirmButton: false,
                    timer: 1500
                });
                form.reset();
            })
            .catch(error => {
                console.error(error);
            });


    };
    return (
        <div className="max-w-xl mx-auto p-6 shadow-xl bg-white rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Add Volunteer Need Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Thumbnail */}
                <div>
                    <label className="block font-semibold">Thumbnail</label>
                    <input
                        type="text"
                        name="thumbnail"
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
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-semibold">Description</label>
                    <textarea
                        name="description"
                        required
                        className="w-full p-2 border rounded"
                    ></textarea>
                </div>

                {/* Category */}
                <div>
                    <label className="block font-semibold">Category</label>
                    <select
                        name="category"
                        required
                        className="w-full p-2 border rounded"
                    >
                        <option value="">-- Select Category --</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="social service">Social Service</option>
                        <option value="animal welfare">Animal Welfare</option>
                    </select>
                </div>

                {/* Location */}
                <div>
                    <label className="block font-semibold">Location</label>
                    <input
                        type="text"
                        name="location"
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
                        className="w-full cursor-not-allowed p-2 border bg-gray-100 rounded"
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
                        className="w-full p-2 border cursor-not-allowed bg-gray-100 rounded"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Add Post
                </button>
            </form>
        </div>
    );
};

export default AddPost;