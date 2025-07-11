import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import logo from './../../assets/logo.svg'
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import { RiArrowDropDownLine } from 'react-icons/ri';

const Navber = () => {
    const [isDark, setIsDark] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(() => {
                // alert("Log out Successfully!")
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Log Out Successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const links = <>
        <Link className='mx-5' to='/'>Home</Link>
        <Link className='mx-5' to='/addPost'>Add Post</Link>

        {/* My Profile dropdown on click */}
        <div className="dropdown dropdown-hover group">
            <label tabIndex={0} className="mx-5 flex items-center cursor-pointer">
                My Profile
                <RiArrowDropDownLine
                    size={25}
                    className="transition-transform duration-300 group-hover:rotate-180"
                />
            </label>

            <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-56 mt-4 z-10"
            >
                <li><Link to='/allPost'>All Volunteer Need Posts</Link></li>
                <li><Link to='/managePost'>My Posts</Link></li>
            </ul>
        </div>
    </>



    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
            setIsDark(true);
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            setIsDark(false);
        }
    }, []);

    const handleThemeToggle = () => {
        const newTheme = isDark ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        setIsDark(!isDark);
    };
    return (
        <div className=" sticky top-0 bg-[#ffffff40] z-10 backdrop-blur-2xl shadow-sm">
            <div className='navbar max-w-6xl mx-auto'>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <Link className='flex gap-2 items-center text-2xl font-bold' to={'/'}>
                        <img className='w-[48px] h-[48px]' src={logo} alt="Logo" />
                        Volunteer
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            links
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className='mx-5'>
                        <label className="swap swap-rotate">

                            <input
                                type="checkbox"
                                onChange={handleThemeToggle}
                                checked={isDark}
                            />

                            {/* sun icon */}
                            <svg
                                className="swap-on h-10 w-10 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>

                            {/* moon icon */}
                            <svg
                                className="swap-off h-10 w-10 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        </label>
                    </div>

                    {user ? (
                        <div className="dropdown dropdown-end">

                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom" data-tip={user.displayName}>
                                <div className="w-10 rounded-full">
                                    <img src={user.photoURL} alt="User" />
                                </div>
                            </div>

                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-36">
                                <li>
                                    <Link onClick={handleLogOut} className="text-red-500 bg-gray-300 hover:bg-red-100">
                                        Log out
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/register" className="btn">Sign Up</Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navber;