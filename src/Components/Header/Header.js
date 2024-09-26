import React, { useEffect, useState } from 'react';
import locales from "../../Constants/en.json";
import FogoLogo from '../../assets/images/logo_fogo.svg';
import BellIcon from '../../assets/images/bell_icon.svg';
import AvtaarIcon from '../../assets/images/avatar-large.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
    Routes, Route, Link,
    useLocation,
    Navigate,
    useNavigate
} from "react-router-dom";
import './Header.scss'

function Header(props) {
    const [logedIn, setLogedIn] = useState(false)
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const headerMenuList = [
        {
            title: "Services",
            path: "Services",
            children: [1]
        },
        {
            title: "Pricing",
            path: "Pricing",
            children: ""
        },
        {
            title: "Blog",
            path: "Blog",
            children: ""
        },
        {
            title: "About us",
            path: "AboutUs",
            children: ""
        },
        {
            title: "Contact us",
            path: "Contactus",
            children: ""
        },

    ]


    useEffect(() => {
        if (sessionStorage.getItem("accessToken")) {
            setLogedIn(true)
        }
    }, [sessionStorage.getItem("accessToken")])

    console.log("first", )
    return (
        <React.Fragment>
            <header className='main_header'>
                <div className='container'>
                    <div className='flex_gridbox'>
                        <div className='logo_block'>
                            <Link className='logo_link' to="/">
                                <img src={FogoLogo} alt="logo_icon" className='logo_icon'></img>
                            </Link>
                        </div>
                        <div className='right_data'>
                            <nav className='menu_list'>
                                <ul>
                                    {
                                        headerMenuList &&
                                        headerMenuList.length > 0 &&
                                        headerMenuList.map((item, index) => {

                                            return (
                                                <li key={index}>
                                                    <Link className='menu_item' to={`/${item.path}`}>{item.title}</Link>
                                                </li>
                                            )


                                        })
                                    }

                                </ul>
                            </nav>
                            {logedIn ? <div className='profile_logFlexbox'>
                                <span className='notificaion'>
                                    <img src={BellIcon} alt="notify" className='notify'></img>
                                </span>
                                <div className='profileAvtaar' id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}>
                                    <img src={AvtaarIcon} alt="avtaar_icon" className='avtar'></img>
                                </div>
                            </div> : <React.Fragment><div className='signIn_link'>
                                <button className='sign_in' onClick={() => {
                                    navigate("/SignIn")
                                }}>{locales.signIn}</button>
                            </div>
                                <button className='sign_upBtn' onClick={() => {
                                    navigate("/SignUp")
                                }}>
                                    {
                                        locales.signUp
                                    }
                                </button>
                            </React.Fragment>}
                        </div>
                    </div>
                </div>
            </header>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                className='profileContentData'
            >
                <div className='headerContent'>
                    <span className='data'>{`${sessionStorage && JSON.parse(sessionStorage.getItem("loginData"))?.user?.first_name} ${sessionStorage && JSON.parse(sessionStorage.getItem("loginData"))?.user?.last_name}`}</span>
                    <span className='data'>{sessionStorage && JSON.parse(sessionStorage.getItem("loginData"))?.user?.email}</span>
                </div>
                <MenuItem onClick={() => {
                    navigate("/dashBoard")
                }}>Dashboard</MenuItem>
                <MenuItem onClick={() => {
                    sessionStorage.removeItem("accessToken");
                    sessionStorage.removeItem("loginData");
                    setLogedIn(false)
                    setAnchorEl(false)
                }}>Logout</MenuItem>
            </Menu>
        </React.Fragment>
    )
}

export default Header;