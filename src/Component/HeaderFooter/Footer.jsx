import React from 'react';
import logo from './../../assets/logo.svg'
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
            <aside>
                <img className='w-[50px] h-[50px]' src={logo} alt="" />
                <p className='font-bold'>
                    Volunteer Industries Ltd.

                </p>
            </aside>
            <nav>
                <h6 className="footer-title">Services</h6>
                <Link to='/'>Home</Link>
                <Link to='/addPost'>Add Post</Link>
                <Link to='/allPost'>All Volunteer Need Posts</Link>
            </nav>
            <nav>
                <h6 className="footer-title">Social</h6>
                <Link to={'https://www.facebook.com/subrota.roy.97524/'} className="link link-hover">Facebook</Link>
                <Link to={'https://x.com/Subrota0157'} className="link link-hover">Twetter</Link>
                <Link to={'https://www.youtube.com/'} className="link link-hover">YouTube</Link>
            </nav>
        </footer>
    );
};

export default Footer;