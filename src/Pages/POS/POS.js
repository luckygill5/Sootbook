import React, { useState } from 'react';
import locales from "../../Constants/en.json";
import {
    Routes, Route, Link,
    useLocation,
    Navigate,
    useNavigate
  } from "react-router-dom";
import Banner from "../../assets/images/pos_banner.png";
import FAQS from '../../Components/FAQS/FAQS';
import FeedbackForm from '../../Components/FeedbackForm/FeedbackForm';
import CheckCircle from "../../assets/images/check-circle.svg"
import {ReactComponent as Arrow} from "../../assets/images/chevron-right.svg";
import Posimage1 from "../../assets/images/pos_image1.png";
import Posimage2 from "../../assets/images/pos_image2.png";
import Posimage3 from "../../assets/images/pos_image3.png";
import PosFootBanner from "../../assets/images/pos_foot_banner.png";
import Posbanner1 from "../../assets/images/pos_banner1.png";
import BlogPost1 from "../../assets/images/blog_post_1.png";
import BlogPost2 from "../../assets/images/blog_post_2.png";
import BlogPost3 from "../../assets/images/blog_post_3.png";
import BlogPost4 from "../../assets/images/blog_post_4.png";
import BlogAvatar1 from "../../assets/images/blog_avatar_1.png";
import BlogAvatar2 from "../../assets/images/blog_avatar_2.png";
import BlogAvatar3 from "../../assets/images/blog_avatar_3.png";
import BlogAvatar4 from "../../assets/images/blog_avatar_4.png";
import "./POS.scss"

function POS(){
    const navigate = useNavigate();
    const BlogPostData = [
        {
            image: BlogPost1,
            label: "Energy",
            duration: "5 min read",
            heading: "How to write content about your photographs",
            describe: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            profileIcon: BlogAvatar1,
            profileName: "By Lauren Waller"
        },
        {
            image: BlogPost2,
            label: "Science",
            duration: "5 min read",
            heading: "How a visual artist redefines success in graphic design",
            describe: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            profileIcon: BlogAvatar2,
            profileName: "By Lauren Waller"
        },
        {
            image: BlogPost3,
            label: "Travel",
            duration: "5 min read",
            heading: "Caring is the new marketing",
            describe: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            profileIcon: BlogAvatar3,
            profileName: "By Lauren Waller"
        },
        {
            image: BlogPost4,
            label: "Education",
            duration: "5 min read",
            heading: "How to design your site footer like we did",
            describe: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            profileIcon: BlogAvatar4,
            profileName: "By Lauren Waller"
        },
    ]

    return(
        <React.Fragment>
            <div className='pos_page_container'>
                <div className='section_banner'>
                    <img src={Banner} alt="banner" className='img_block'></img>
                </div>
                <div className='streamlineData_section'>
                    <div className='container'>
                        <div className='data_flexbox streamline_check'>
                            <div className='content_section'>
                                <h5 className='subtitle'>Efficient</h5>
                                <h4 className='title'>Streamline Checkouts With Our User-Friendly POS</h4>
                                <p className='description'>
                                Our POS system features a user-friendly interface that enables quick and hassle-free checkouts. With intuitive navigation and a simple design, you can process transactions efficiently and serve your customers faster.
                                </p>
                                <ul className='listing_point'>
                                    <li>
                                        <span className='icon'>
                                            <img src={CheckCircle} alt="check_icon" className='icon_block'></img>
                                        </span>
                                        Fast and Easy Transaction Processing
                                    </li>
                                    <li>
                                    <span className='icon'>
                                            <img src={CheckCircle} alt="check_icon" className='icon_block'></img>
                                        </span>
                                        Simplified Inventory Management
                                    </li>
                                    <li>
                                    <span className='icon'>
                                            <img src={CheckCircle} alt="check_icon" className='icon_block'></img>
                                        </span>
                                        Seamless Integration with CRM and Accounting Systems
                                    </li>
                                </ul>
                                <div className='button_flexbox'>
                                    <button className='signup_btn'>{locales.signUp}</button>
                                    <button className='learn_moreBtn'>
                                        {locales.learn_more}
                                        <span className='icon'>
                                            <Arrow/>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className='thumbnail_block'>
                                <img src={Posimage1} alt="thumbnail" className='img_block'></img>
                            </div>
                        </div>
                        <div className='data_flexbox streamline_integration'>
                        <div className='thumbnail_block'>
                                <img src={Posimage2} alt="thumbnail" className='img_block'></img>
                            </div>
                        <div className='content_section'>
                                <h5 className='subtitle'>Efficiency</h5>
                                <h4 className='title'>Seamless Integration For Streamlined Operations</h4>
                                <p className='description'>
                                Our POS system seamlessly integrates with barcode scanners, receipt printers, and payment processors, allowing you to streamline your operations and improve efficiency. With real-time data synchronization, you can easily manage inventory, process transactions, and track sales, all in one place.
                                </p>
                                <div className='button_flexbox'>
                                    <button className='signup_btn'>{locales.signUp}</button>
                                    <button className='learn_moreBtn'>
                                        {locales.learn_more}
                                        <span className='icon'>
                                            <Arrow/>
                                        </span>
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className='data_flexbox real_time'>
                        <div className='content_section'>
                                <h5 className='subtitle'>Efficient</h5>
                                <h4 className='title'>Real-time inventory tracking for accurate sales management</h4>
                                <p className='description'>
                                With our POS system, you can effortlessly track your inventory in real time, ensuring that your stock levels are always up to date. As sales occur, our software automatically updates the inventory, giving you accurate insights into your stock availability.
                                </p>
                                <div className='button_flexbox'>
                                    <button className='signup_btn'>{locales.signUp}</button>
                                    <button className='learn_moreBtn'>
                                        {locales.learn_more}
                                        <span className='icon'>
                                            <Arrow/>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        <div className='thumbnail_block'>
                                <img src={Posimage3} alt="thumbnail" className='img_block'></img>
                            </div>
                       
                        </div>
                    </div>
                </div>
                <div className='pos_system_section'>
                    <div className='container'>
                        <h5 className='subtitle'>Efficiently</h5>
                        <h4 className='title'>Streamline your operations with our powerful and user-friendly POS system.</h4>
                        <p className='description'>Our POS system reduces wait times, improves transaction accuracy, and enhances customer satisfaction. With its intuitive interface and advanced features, you can easily manage sales, track inventory, and provide exceptional service to your customers.</p>
                        <div className='actions_flexbox'>
                        <button className='signup_btn'>{locales.signUp}</button>
                                    <button className='learn_moreBtn'>
                                        {locales.learn_more}
                                        <span className='icon'>
                                            <Arrow/>
                                        </span>
                                    </button>
                        </div>
                        <div className='banner_container'>
                            <img src={Posbanner1} alt="banner" className='img_block'></img>
                        </div>
                    </div>
                </div>
                <div className='blog_post_section'>
                    <div className='container'>
                        <h5 className='subtitle'>Efficiently</h5>
                        <h4 className='title'>Experience the Simplicity and Efficiency of Our POS System</h4>
                        <span className='description'>
                        Stay informed with our latest blog posts.
                        </span>
                        <div className='flexbox'>
                            {
                                BlogPostData &&
                                BlogPostData.length > 0 &&
                                BlogPostData.map((item, index) => {
                                    return (
                                        <div className='column_card' key={index} onClick={() => {
                                            navigate("/Article")
                                        }}>
                                            <div className='thumbnail'>
                                                <img src={item.image} alt="icon"></img>
                                            </div>
                                            <div className='content'>
                                                <div className='label_flexbox'>
                                                    <span className='label'>{item.label}</span>
                                                    <span className='duration'>
                                                        {item.duration}
                                                    </span>
                                                </div>
                                                <h5 className='title'>{item.heading}</h5>
                                                <p className='description'>{item.describe}</p>
                                                <div className='profile_flexbox'>
                                                    <span className='profile_icon'><img src={item.profileIcon} alt="icon"></img></span>
                                                    <span className='profilename'>{item.profileName}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
                <FAQS/>
                <FeedbackForm/>
                <div className='pos_footbanner_section'>
                    <img src={PosFootBanner} alt="banner" className='banner_img'></img>
                </div>
            </div>
        </React.Fragment>
    )
}

export default POS