import React, { useState } from 'react';
import locales from "../../Constants/en.json";
import {
    Routes, Route, Link,
    useLocation,
    Navigate,
    useNavigate
  } from "react-router-dom";
import Banner from "../../assets/images/blog_page_banner.png";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import BlogPost1 from "../../assets/images/blog_post_1.png";
import BlogPost2 from "../../assets/images/blog_post_2.png";
import BlogPost3 from "../../assets/images/blog_post_3.png";
import BlogPost4 from "../../assets/images/blog_post_4.png";
import BlogPost5 from "../../assets/images/blog_post_5.png";
import BlogPost6 from "../../assets/images/blog_post_6.png";
import BlogPost7 from "../../assets/images/blog_post_7.png";
import BlogPost8 from "../../assets/images/blog_post_8.png";
import BlogPost9 from "../../assets/images/blog_post_9.png";
import BlogPost10 from "../../assets/images/blog_post_10.png";
import BlogPost11 from "../../assets/images/blog_post_11.png";
import BlogPost12 from "../../assets/images/blog_post_12.png";
import BlogAvatar1 from "../../assets/images/blog_avatar_1.png";
import BlogAvatar2 from "../../assets/images/blog_avatar_2.png";
import BlogAvatar3 from "../../assets/images/blog_avatar_3.png";
import BlogAvatar4 from "../../assets/images/blog_avatar_4.png";
import BlogAvatar5 from "../../assets/images/blog_avatar_5.png";
import BlogAvatar6 from "../../assets/images/blog_avatar_6.png";
import BlogAvatar7 from "../../assets/images/blog_avatar_7.png";
import BlogAvatar8 from "../../assets/images/blog_avatar_8.png";
import BlogAvatar9 from "../../assets/images/blog_avatar_9.png";
import BlogAvatar10 from "../../assets/images/blog_avatar_10.png";
import BlogAvatar11 from "../../assets/images/blog_avatar_11.png";
import BlogAvatar12 from "../../assets/images/blog_avatar_12.png";
import FAQS from '../../Components/FAQS/FAQS';
import Testimonials from '../../Components/Testimonials/Testimonials';
import BlogFooterBanner from "../../assets/images/blog_footer_banner.png"
import './Blog.scss'

function Blog() {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();
    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const hiringtabData = ["View All", "Design", "Software Engineering", "Customer Success", "Sales", "Marketing"]

    const blogsfirstData = [
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
        {
            image: BlogPost5,
            label: "Future",
            duration: "5 min read",
            heading: "Lessons and insights from 8 years of Pixelgrade",
            describe: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            profileIcon: BlogAvatar5,
            profileName: "By Lauren Waller"
        },
        {
            image: BlogPost6,
            label: "Development",
            duration: "5 min read",
            heading: "How to choose the right customer for your photo business?",
            describe: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            profileIcon: BlogAvatar6,
            profileName: "By Lauren Waller"
        },
        {
            image: BlogPost7,
            label: "Life",
            duration: "5 min read",
            heading: "How to build a loyal community online and offline",
            describe: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            profileIcon: BlogAvatar7,
            profileName: "By Lauren Waller"
        },
        {
            image: BlogPost8,
            label: "Blockchain",
            duration: "5 min read",
            heading: "Helping a local business reinvent itself",
            describe: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            profileIcon: BlogAvatar8,
            profileName: "By Lauren Waller"
        },
        {
            image: BlogPost9,
            label: "Innovation",
            duration: "5 min read",
            heading: "Why choose a theme that looks good with WooCommerce",
            describe: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            profileIcon: BlogAvatar9,
            profileName: "By Lauren Waller"
        },
        {
            image: BlogPost10,
            label: "Startup",
            duration: "5 min read",
            heading: "Starting your traveling blog with Vasco",
            describe: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            profileIcon: BlogAvatar10,
            profileName: "By Lauren Waller"
        },
        {
            image: BlogPost11,
            label: "Business",
            duration: "5 min read",
            heading: "How to optimize images in WordPress for faster loading (complete guide)",
            describe: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            profileIcon: BlogAvatar11,
            profileName: "By Lauren Waller"
        },
        {
            image: BlogPost12,
            label: "Team",
            duration: "5 min read",
            heading: "The Importance of Sleep for Optimal Health",
            describe: "Some quick example text to build on the card title and make up the bulk of the card's content.",
            profileIcon: BlogAvatar12,
            profileName: "By Lauren Waller"
        },

    ]

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

    return (
        <React.Fragment>
            <div className='blog_page_container'>
                <div className='blog_page_banner'>
                    <img src={Banner} alt="banner" className='banner_img'></img>
                </div>
                <div className='blog_grid_section'>
                    <div className='container'>
                        <Box sx={{ width: '100%' }}>
                            <Box className="tab_container" >
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    {
                                        hiringtabData &&
                                        hiringtabData.length > 0 &&
                                        hiringtabData.map((item, index) => {
                                            return (
                                                <Tab label={item} {...a11yProps(index)} />
                                            )
                                        })
                                    }
                                </Tabs>
                            </Box>
                            <CustomTabPanel className="tabData_box" value={value} index={0}>
                                <div className='flexbox'>
                                    {
                                        blogsfirstData &&
                                        blogsfirstData.length > 0 &&
                                        blogsfirstData.map((item, index) => {
                                            return (
                                                <div className='column_card' onClick={() => {
                                                    navigate("/Article")
                                                }} key={index}>
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
                            </CustomTabPanel>
                            <CustomTabPanel className="tabData_box" value={value} index={1}>
                                <div className='flexbox'>
                                    {
                                        blogsfirstData &&
                                        blogsfirstData.length > 0 &&
                                        blogsfirstData.map((item, index) => {
                                            return (
                                                <div className='column_card' onClick={() => {
                                                    navigate("/Article")
                                                }} key={index}>
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
                            </CustomTabPanel>
                            <CustomTabPanel className="tabData_box" value={value} index={2}>
                                <div className='flexbox'>
                                    {
                                        blogsfirstData &&
                                        blogsfirstData.length > 0 &&
                                        blogsfirstData.map((item, index) => {
                                            return (
                                                <div className='column_card' onClick={() => {
                                                    navigate("/Article")
                                                }} key={index}>
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
                            </CustomTabPanel>
                        </Box>
                    </div>
                </div>
                <div className='blog_post_section'>
                    <div className='container'>
                        <h5 className='subtitle'>Our Values</h5>
                        <h4 className='title'>Explore Our Blog Posts</h4>
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
                <FAQS />
                <Testimonials />
                <div className='blog_footer_banner'>
                    <img src={BlogFooterBanner} alt="banner" className='banner_img'></img>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Blog;