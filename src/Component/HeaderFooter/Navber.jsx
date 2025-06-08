import React, { useContext } from 'react';
import { Link } from 'react-router';
import logo from './../../assets/logo.svg'
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';

const Navber = () => {
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
        <Link className='mx-5' to='/'>My Profile</Link>
        <Link className='mx-5' to='/logIn'>Log In</Link>
        <Link className='mx-5' to='/register'>Register</Link>
    </>
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

                    {user ? (
                        <div className="dropdown dropdown-end">

                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom" data-tip={user.displayName}>
                                <div className="w-10 rounded-full">
                                    <img src={user.photoURL} alt="User" />
                                </div>
                            </div>

                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-36">
                                <li>
                                    <Link onClick={handleLogOut} className="text-red-500 hover:bg-red-100">
                                        Log out
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/signup" className="btn">Sign Up</Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navber;