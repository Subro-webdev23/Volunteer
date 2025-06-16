import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthContext';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const LogIn = () => {
    const { signInUser, setUser, signInGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const handleSignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signInUser(email, password)
            .then(res => {
                const user = res.user;
                setUser(user)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Loged in Success!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(`${location.state ? location.state : "/"}`);

            })
            .catch(error => {
                const errorCode = error.code;
                console.log(errorCode);
                console.log(error);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: errorCode,
                    showConfirmButton: false,
                    timer: 1500
                });

            })
    }
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
                navigate(`${location.state ? location.state : "/"}`);


            })
            .catch(error => {
                const errorCode = error.code;
                alert(errorCode);
            })
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Helmet>
                <title>Log in</title>
            </Helmet>
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-xl">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="space-y-4" onSubmit={handleSignIn}>
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

                    <button
                        type="submit"
                        className="w-full py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        Login
                    </button>
                </motion.form>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center">
                    <button
                        onClick={handleGoogleLogIn}
                        className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100"
                    >
                        <FcGoogle size={20} /> Login with Google
                    </button>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Register here
                    </Link>
                </motion.p>
            </div>
        </div>
    );
};

export default LogIn;