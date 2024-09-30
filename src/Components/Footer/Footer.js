import React, { useState } from 'react';
import locales from "../../Constants/en.json";
import { ReactComponent as FogoLogo } from '../../assets/images/logo_fogo.svg';
import GoogleIcon from "../../assets/images/google.svg";
import FacebookIcon from "../../assets/images/facebook.svg";
import InstagramIcon from  "../../assets/images/instagram.svg";
import {
    Routes, Route, Link,
    useLocation
  } from "react-router-dom";
  import './Footer.scss'

function Footer(props) {
    const footerMenuList = [
        {
          title: "About Us",
          children: ["Services", "Products", "Contact us", "FAQ", "Support"]
        },
        {
            title: "Blog",
            children: ["Services", "Partners", "Careers", "Events", "Testimonials", "Gallery"]
        },
        {
            title: "Resources",
            children: ["Support Center", "Knowledge Base", "Documentation", "Community", "Forum",]
        },
    
      ]


    return (
        <React.Fragment>
            <footer className='main_footer'>
                <div className='container'>
                    <div className='flex_gridbox'>
                   <div className='upper_part'>
                    <div className='leftside_data'>
                        <div className='logoBlock'>
                            <FogoLogo/>
                        </div>
                        <div className='footerMenu_container'>
                            {
                                footerMenuList &&
                                footerMenuList.length > 0 &&
                                footerMenuList.map((item, index) => {
                                    return (
                                        <div className='menu_list' key={index}>
                                            <h5 className='menu_title'>{item.title}</h5>
                                            <ul className='menu_option'>
                                                {
                                                    item.children &&
                                                    item.children.length > 0 &&
                                                    item.children.map((item, index) => {
                                                        return (
                                                            <li>
                                                                <Link className='menu_item' to={`/${item.split(" " ).join("")}`}>{item}</Link>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    )
                                })
                            }
                           
                        </div>
                    </div>
                    <div className='rightside_data'>
                        <div className='subscribe_section'>
                            <h5 className='title'>{locales.subscribe_title}</h5>
                            <span className='stay_uptodate'>{locales.stay_upto_date_latest_feature}</span>
                            <div className='grid_inputbox'>
                                <input placeholder='Enter email address' type="text" className='emai_input'></input>
                                <button className='subscribeBtn'>{locales.subscribe_title}</button>
                            </div>
                            <span className='by_subscribing'>
                                {locales.by_subscribe_term}
                            </span>
                        </div>
                    </div>
                   </div>
                   <div className='bottom_part'>
                    <div className='left_data'>
                     
                            <span className='copyright_term'>&copy; 2024 Vista. All rights reserved.</span>
                       
                        <ul className='extra_links'>
                            <li>
                                <Link className='link_item'>Privacy Policy</Link>
                            </li>
                            <li>
                                <Link className='link_item'>Terms of Service</Link>
                            </li>
                            <li>
                                <Link className='link_item'>Cookie Settings</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='right_data'>
                        <ul className='social_links'>
                            <li><Link  className='social_link_item'><img src={GoogleIcon} alt="google_icon"></img></Link></li>
                            <li><Link  className='social_link_item'>
                            <img src={FacebookIcon} alt="facebook_icon"></img>
                            </Link></li>
                            <li><Link  className='social_link_item'>
                            <img src={InstagramIcon} alt=""></img>
                            </Link></li>
                        </ul>
                    </div>
                   </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default Footer;