import React, { useState } from 'react';
import locales from "../../Constants/en.json";
import FogoLogo from '../../assets/images/logo_fogo.svg';
import {
    Routes, Route, Link,
    useLocation,
    Navigate,
    useNavigate
  } from "react-router-dom";
  import './Header.scss'

function Header(props) {
    const navigate = useNavigate();
    const headerMenuList = [
        {
          title: "Services",
          path:"Services",
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
                        <div className='signIn_link'>
                            <button className='sign_in'  onClick={() => {
                            navigate("/SignIn")
                        }}>{locales.signIn}</button>
                        </div>
                        <button className='sign_upBtn'  onClick={() => {
                            navigate("/SignUp")
                        }}>
                            {
                                locales.signUp
                            }
                        </button>
                    </div>
                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}

export default Header;