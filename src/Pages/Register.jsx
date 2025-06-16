import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const Register = () => {
    const [error, setError] = useState("");
    const { createUser, setUser, signInGoogle, updateUser } = useContext(AuthContext);
    const navigate = useNavigate()
    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photoURL.value;
        const password = form.password.value;

        if (password.length < 6) {
            setError("Password must be at least 6 characters long!");
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Password must be at least 6 characters long!",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError("Password must contain at least one uppercase letter!");
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Password must contain at least one uppercase letter!",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError("Password must contain at least one lowercase letter!");
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Password must contain at least one lowercase letter!",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        createUser(email, password)
            .then(result => {
                const user = result.user;
                // setUser(user);
                console.log("setUser", user);
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Sign up Successful!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate("/");
                    })
                    .catch((error) => {
                        console.log(error);
                        setUser(user);
                    })

            })
            .catch(error => {
                console.log(error)
            })


    };
    const handleGoogleLogIn = () => {
        signInGoogle()
            .then((result) => {
                console.log("result", result);

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Loged in Successeful!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/");


            })
            .catch(error => {
                const errorCode = error.code;
                alert(errorCode);
            })
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Helmet>
                <title>Register</title>
            </Helmet>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-xl">
                <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
                <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="space-y-4" onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"

                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
                            Photo URL
                        </label>
                        <input
                            type="url"
                            name="photoURL"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        Register
                    </button>
                </motion.form>

                <p className="text-sm text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/logIn" className="text-blue-600 hover:underline">
                        Login here
                    </Link>
                </p>
                <div className='flex justify-center'>

                    <button onClick={handleGoogleLogIn} className="btn bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;