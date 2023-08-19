import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [showNav, setShowNav] = useState(false)
    const navigate = useNavigate()
    const [nav, setNav] = useState(false)

    const hamburgerHandler = () => {
        setShowNav(!showNav)
    }

    const handleLogout = () => {
        Cookies.remove('user');
        Cookies.remove('token');
        navigate('/login')
    }

    const navClickHandler = () => {
        setNav(!nav)
    }

    return (
        <>
            <div className='navbar_outer_div'>
                <div className='navbar_side_div'>
                    <h4 className='navbar_logo'>Sanghrajka Shop</h4>
                </div>
                <div className={nav ? 'navbar_center_div navbar_transform' : 'navbar_center_div'}>
                    <ul className='navbar_list'>
                        <li className='active'><NavLink to="/"><i className="bi bi-house me-2"></i>Home</NavLink></li>
                        <li><Link to="/user-cart"><i className="bi bi-cart-check me-2"></i>Cart</Link></li>
                        <li><button className='logout_button' onClick={handleLogout}><i className="bi bi-box-arrow-left me-2"></i>Logout</button></li>
                    </ul>
                </div>
                <div className='navbar_side_div navbar_hamburger_div' onClick={hamburgerHandler}>
                    <div className='navbar_hamburger' onClick={navClickHandler}>
                        {showNav ? <i className="bi bi-x-lg"></i> : <i className="bi bi-list"></i>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar