import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from './../components/productComponent/Navbar.jsx';
import Search from '../components/productComponent/Search.jsx';

const PrivateRoute = () => {
    const auth = Cookies.get('token') || '';

    return (
        <>
            {
                auth ?
                    <>
                        <Navbar />
                        <Search />
                        <Outlet />
                    </>
                    : <Navigate to='/login' />
            }
        </>
    )
}

export default PrivateRoute
