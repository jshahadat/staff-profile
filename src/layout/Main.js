import React from 'react';
import { Outlet } from 'react-router-dom';
import Fotter from '../pages/Sheared/Footer/Fotter';
import Navbar from '../pages/Sheared/Navbar/Navbar';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            {/* <Fotter></Fotter> */}
        </div>
    );
};

export default Main;