import React from 'react';
import { useLoaderData } from 'react-router';
import useAuth from '../hook/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const PostDetails = () => {
    const postData = useLoaderData();
    // console.log(postData);
    const { user } = useAuth();
    // console.log('need', need);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const requestData = Object.fromEntries(formData.entries());
        requestData.volunteersNeeded = Number(requestData.volunteersNeeded);
        console.log("volunteersNeeded is", typeof requestData.volunteersNeeded, requestData.volunteersNeeded);

        // console.log(postData);
        axios.post('http://localhost:3000/volunteerRequests', requestData)
            .then(response => {
                // console.log('post successfully', response.data);
                if (response.data.acknowledged) {
                    axios.put(`http://localhost:3000/recruiterPost/${postData._id}`)
                        .then(updateRes => {
                            console.log('Volunteers count updated:', updateRes.data);

                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Request Success!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        })
                }


                document.getElementById("my_modal_5").close();
                form.reset();
            })
            .catch(error => {
                console.error(error);
            });
    }


    return (
        <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg">
            <Helmet>
                <title>Details</title>
            </Helmet>
            <img
                src={postData.thumbnail}
                alt={postData.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
            />

            <h1 className="text-3xl font-bold text-indigo-700 mb-2">
                {postData.title}
            </h1>

            <p className="text-gray-600 text-sm mb-4">
                <span className="font-semibold">Category:</span> {postData.category} |{" "}
                <span className="font-semibold">Location:</span> {postData.location}
            </p>

            <p className="text-gray-800 mb-6 leading-relaxed whitespace-pre-line">
                {postData.description}
            </p>

            <div className="flex items-center justify-between mt-8">
                <p className="text-lg font-medium text-gray-700">
                    Volunteers Needed:{" "}
                    <span className="font-bold text-indigo-600">
                        {postData.volunteersNeeded}
                    </span>
                </p>

                <p className="text-sm text-gray-500">
                    Deadline:{" "}
                    <span className="font-medium text-red-500">
                        {new Date(postData.deadline).toLocaleDateString()}
                    </span>
                </p>
            </div>

            {/* ✅ Be a Volunteer Button */}
            <div className="mt-10 text-center">
                <button onClick={() => document.getElementById('my_modal_5').showModal()} className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md">
                    Be a Volunteer
                </button>

                {/* Modal with Form */}
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-xl mb-4">Volunteer Request Form</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Post Info (read-only) */}
                            <input
                                type="text"
                                name='thumbnail'
                                className="input input-bordered w-full cursor-not-allowed"
                                value={postData.thumbnail}
                                readOnly
                            />
                            <input
                                type="text"
                                name='title'
                                className="input input-bordered w-full cursor-not-allowed"
                                value={postData.title}
                                readOnly
                            />
                            <textarea
                                className="textarea textarea-bordered w-full cursor-not-allowed"
                                name='description'
                                value={postData.description}
                                readOnly
                            />
                            <input
                                type="text"
                                name='category'
                                className="input input-bordered w-full cursor-not-allowed"
                                value={postData.category}
                                readOnly
                            />
                            <input
                                type="text"
                                name='location'
                                className="input input-bordered w-full cursor-not-allowed"
                                value={postData.location}
                                readOnly
                            />
                            <input
                                type="text"
                                name='volunteersNeeded'
                                className="input input-bordered w-full cursor-not-allowed"
                                value={postData.volunteersNeeded}
                                readOnly
                            />
                            <input
                                type="text"
                                name='deadline'
                                className="input input-bordered w-full cursor-not-allowed"
                                value={new Date(postData.deadline).toLocaleDateString()}
                                readOnly
                            />

                            {/* Volunteer Info */}
                            <input
                                type="text"
                                name='displayName'
                                className="input input-bordered w-full cursor-not-allowed"
                                value={user.displayName}
                                readOnly
                            />
                            <input
                                type="email"
                                name='email'
                                className="input input-bordered w-full cursor-not-allowed"
                                value={user.email}
                                readOnly
                            />

                            {/* Suggestion (editable) */}
                            <textarea
                                name='suggestion'
                                className="textarea textarea-bordered w-full"
                                placeholder="Write your suggestion here..."
                            ></textarea>

                            {/* Status (default = requested) */}
                            {/* <input
                                type="text"
                                className="input input-bordered w-full"
                                value="requested"
                                readOnly
                            /> */}

                            {/* Buttons */}
                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">
                                    Request
                                </button>
                                <div method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default PostDetails;