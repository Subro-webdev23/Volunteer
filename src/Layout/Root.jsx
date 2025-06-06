import React from 'react';
import { Outlet } from 'react-router';
import Navber from '../Component/HeaderFooter/Navber';
import Footer from '../Component/HeaderFooter/Footer';


const Root = () => {
    return (
        <div>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;