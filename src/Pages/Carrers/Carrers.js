import React, { useState } from 'react';
import locales from "../../Constants/en.json";
import { Link, } from "react-router-dom";
import Banner from "../../assets/images/careers_page_banner.png";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MapPin from "../../assets/images/map-pin.svg";
import Clock from "../../assets/images/clock-9.svg";
import Server from "../../assets/images/server.svg";
import Testimonials from '../../Components/Testimonials/Testimonials';
import { ReactComponent as RightArrow } from "../../assets/images/chevron-right.svg";
import CheckCircle from "../../assets/images/check-circle.svg";
import FeedbackForm from '../../Components/FeedbackForm/FeedbackForm';
import "./Carrers.scss"

function Careers() {
    const [value, setValue] = useState(0);
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

    const swiperData = [
        {
            professionInfo: "Product Designer",
            status: "Design",
            info: "We’re looking for a Senior Product Designer to join our team.",

        },
        {
            professionInfo: "Engineering manager",
            status: "Software",
            info: "We’re looking for a Senior Product Designer to join our team.",

        },
        {
            professionInfo: "Product Designer",
            status: "Design",
            info: "We’re looking for a Senior Product Designer to join our team.",

        },
        {
            professionInfo: "Engineering manager",
            status: "Software",
            info: "We’re looking for a Senior Product Designer to join our team.",

        },
        {
            professionInfo: "Product Designer",
            status: "Design",
            info: "We’re looking for a Senior Product Designer to join our team.",

        },
        {
            professionInfo: "Engineering manager",
            status: "Software",
            info: "We’re looking for a Senior Product Designer to join our team.",

        },
    ]

    return (
        <React.Fragment>
            <div className='carrers_page_container'>
                <div className='career_page_banner'>
                    <img src={Banner} alt="banner" className='banner_img'></img>
                </div>
                <div className='opening_section'>
                    <div className='container'>
                        <h4 className='subtitle'>Join Us</h4>
                        <h5 className='title'>Current Openings</h5>
                        <p className='description'>
                        Explore our job listings and find the perfect opportunity to join our team.
                        </p>
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
                                    swiperData &&
                                    swiperData.length > 0 &&
                                    swiperData.map((item, index) => {
                                        return (
                                            <div className='testimonial_card' key={index}>
                                                <p className='details'><span className='slide-title'>{item.professionInfo}</span><span className='status'>{item.status}</span> <Link to="/JobSingle" className="viewjob_link">View job</Link></p>
                                                <div className='content'>
                                                    <p className='info'>{item.info}</p>
                                                    <ul className='list_type'>
                                                        <li><span className='icon'>
                                                            <img src={MapPin} alt="icon"></img>
                                                        </span><span className='text'>Remote</span></li>
                                                        <li><span className='icon'>
                                                            <img src={Clock} alt="icon"></img>
                                                        </span><span className='text'>Full-time</span></li>
                                                    </ul>
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
                                    swiperData &&
                                    swiperData.length > 0 &&
                                    swiperData.map((item, index) => {
                                        return (
                                            <div className='testimonial_card' key={index}>
                                                <p className='details'><span className='slide-title'>{item.professionInfo}</span><span className='status'>{item.status}</span> <Link to="/JobSingle" className="viewjob_link">View job</Link></p>
                                                <div className='content'>
                                                    <p className='info'>{item.info}</p>
                                                    <ul className='list_type'>
                                                        <li><span className='icon'>
                                                            <img src={MapPin} alt="icon"></img>
                                                        </span><span className='text'>Remote</span></li>
                                                        <li><span className='icon'>
                                                            <img src={Clock} alt="icon"></img>
                                                        </span><span className='text'>Full-time</span></li>
                                                    </ul>
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
                                    swiperData &&
                                    swiperData.length > 0 &&
                                    swiperData.map((item, index) => {
                                        return (
                                            <div className='testimonial_card' key={index}>
                                                <p className='details'><span className='slide-title'>{item.professionInfo}</span><span className='status'>{item.status}</span> <Link to="/JobSingle" className="viewjob_link">View job</Link></p>
                                                <div className='content'>
                                                    <p className='info'>{item.info}</p>
                                                    <ul className='list_type'>
                                                        <li><span className='icon'>
                                                            <img src={MapPin} alt="icon"></img>
                                                        </span><span className='text'>Remote</span></li>
                                                        <li><span className='icon'>
                                                            <img src={Clock} alt="icon"></img>
                                                        </span><span className='text'>Full-time</span></li>
                                                    </ul>
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
                <div className='why_choose_section'>
                    <div className='container'>
                        <h5 className='subtitle'>Our Values</h5>
                        <h4 className='title'>Why choose us</h4>
                        <p className='description'>Our shared values unite us as one cohesive team, guiding our actions and fostering strong connections.</p>
                        <div className='feature_gridbox'>
                            <div className='flex_item'>
                                <div className='img_block lightBlue'>
                                    <img src={Server} alt="feature-icon-1"></img>
                                </div>
                                <h4 className='card-title'>Efficient Inventory Management System</h4>
                                <span className='card_info'>Our inventory management system streamlines stock levels and order management, ensuring optimal efficiency and accuracy.</span>
                            </div>
                            <div className='flex_item'>
                                <div className='img_block lightBlue'>
                                    <img src={Server} alt="feature-icon-1"></img>
                                </div>
                                <h4 className='card-title'>Seamless Order Management</h4>
                                <span className='card_info'>With our order management system, you can easily track and fulfill orders, improving customer satisfaction and reducing errors.</span>
                            </div>
                            <div className='flex_item'>
                                <div className='img_block lightBlue'>
                                    <img src={Server} alt="feature-icon-1"></img>
                                </div>
                                <h4 className='card-title'>Real-Time Stock Monitoring</h4>
                                <span className='card_info'>Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='testimonial_section'>
                <Testimonials/>
                </div>
                <div className='talented_team'>
                    <div className='container'>
                        <div className='flexbox'>
                        <div className='content'>
                                <h5 className='subtitle'>Enhance</h5>
                                <h4 className='title'>Join Our Talented Team Today. Don’t Miss The Opportunity!</h4>
                                <p className='description'>Uncover an array of thrilling career opportunities at FOGO, where your skills and enthusiasm can play a pivotal role in advancing the forefront of the software industry. Join a dynamic team committed to innovation and excellence, where collaboration and creativity thrive. At FOGO, we're dedicated to pushing boundaries and embracing cutting-edge technology, empowering you to make a meaningful impact. Embark on a journey of growth and achievement with FOGO, and together, let's redefine what's possible in software development.</p>
                             <ul className='prefer_points'>
                                <li>
                                    <span className='icon'>
                                        <img src={CheckCircle} alt="icon"></img>
                                    </span>
                                    <span className='text'>
                                    Drive impactful innovation in the software industry
                                    </span>
                                </li>
                                <li>
                                    <span className='icon'>
                                        <img src={CheckCircle} alt="icon"></img>
                                    </span>
                                    <span className='text'>
                                    Collaborate seamlessly with a team of tech pioneers
                                    </span>
                                </li>
                                <li>
                                    <span className='icon'>
                                        <img src={CheckCircle} alt="icon"></img>
                                    </span>
                                    <span className='text'>
                                    Accelerate your career growth with tailored development pathst.
                                    </span>
                                </li>
                             </ul>
                                <div className='actions'>
                        <button className='sign_up_btn'>{locales.signUp}</button>
                        <button className='learn_more_btn'>
                            {locales.learn_more}
                            <span className='icon'>
                                <RightArrow/>
                            </span>
                        </button>
                    </div>
                            </div>
                        <div className='thumbnail'>
                                {/* <img className='img_block' src={Presentation} alt="thumbnail"></img> */}
                            </div>
                         
                           
                        </div>
                    </div>
                </div>
                <FeedbackForm/>
            </div>
        </React.Fragment>
    )
}

export default Careers;