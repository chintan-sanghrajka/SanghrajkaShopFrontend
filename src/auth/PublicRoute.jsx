import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Title from './../components/Title.jsx'

const PublicRoute = () => {
    const auth = Cookies.get('token') || '';

    return (
        <>
            {
                !auth ?
                    <>
                        <Title />
                        <Outlet />
                    </>
                    : <Navigate to='/' />
            }
        </>
    )
}

export default PublicRoute
