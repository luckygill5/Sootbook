import React, { useEffect, useState } from 'react';
import locales from "../../Constants/en.json";
import RatingViews from '../../Components/RatingViews/RatingViews';
import OurPartners from '../../Components/OurPartners/OurPartners';
import FeedbackForm from '../../Components/FeedbackForm/FeedbackForm';
import Testimonials from '../../Components/Testimonials/Testimonials';
import Banner from "../../assets/images/aboutus_banner.png";
import Team1 from "../../assets/images/team_1.png";
import Team2 from "../../assets/images/team_2.png";
import Team3 from "../../assets/images/team_3.png";
import Team4 from "../../assets/images/team_4.png";
import Team5 from "../../assets/images/team_5.png";
import Team6 from "../../assets/images/team_6.png";
import Team7 from "../../assets/images/team_7.png";
import Team8 from "../../assets/images/team_8.png";
import Server from "../../assets/images/server.svg";
import MapPin from "../../assets/images/map-pin.svg";
import Clock from "../../assets/images/clock-9.svg";
import Visionbanner from "../../assets/images/vision_life_banner.png";
import Checkcircle from "../../assets/images/check-circle.svg";
import Unlockbanner from "../../assets/images/unlock_success_banner.png";
import { ReactComponent as RightArrow } from '../../assets/images/chevron-right.svg';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {Link, } from "react-router-dom";
// import Swiper JS
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/css';
// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './AboutUs.scss';




function AboutUs() {
    const [value, setValue] = useState(0);
    const timelineData = [
        {
            type: "blue",
            data: '2000',
            title: 'Created "Preline in React" task',
            info: "Find more detailed insctructions here."
        },
        {
            type: "safron",
            data: '2000',
            title: 'Created "Preline in React" task',
            info: "Find more detailed insctructions here."
        },
        {
            type: "blue",
            data: '2000',
            title: 'Created "Preline in React" task',
            info: "Find more detailed insctructions here."
        },
        {
            type: "safron",
            data: '2000',
            title: 'Created "Preline in React" task',
            info: "Find more detailed insctructions here."
        }
    ]

    const teamData = [
        {
            profileimg: Team1,
            profilename: 'Alex Brown',
            profileStatus: "Founder & CEO"
        },
        {
            profileimg: Team2,
            profilename: 'Freida Varnes',
            profileStatus: "Engineering Manager"
        },
        {
            profileimg: Team3,
            profilename: 'Flores, Juanita',
            profileStatus: "Product Manager"
        },
        {
            profileimg: Team4,
            profilename: 'Aileen Fullbright',
            profileStatus: "Frontend Developer"
        },
        {
            profileimg: Team5,
            profilename: 'Black Marvin',
            profileStatus: "Backend Developer"
        },
        {
            profileimg: Team6,
            profilename: 'Chieko Chute',
            profileStatus: "Product Designer"
        },
        {
            profileimg: Team7,
            profilename: 'Janetta Rotolo',
            profileStatus: "UX Researcher"
        },
        {
            profileimg: Team8,
            profilename: 'Henry, Arthur',
            profileStatus: "Customer Success"
        },
    ]

    const hiringtabData = ["View All", "Design", "Software Engineering", "Customer Success", "Sales", "Marketing"]

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

    useEffect(() => {
        const swiper = new Swiper('.swiper', {
            // Optional parameters
            // direction: 'vertical',
            loop: true,

            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
            },

            autoplay: {
                delay: 5000,
              },
            // Navigation arrows
            navigation: false,

            // And if we need scrollbar
            // scrollbar: {
            //   el: '.swiper-scrollbar',
            // },
            modules: [Autoplay, Navigation, Pagination],
            slidesPerView: 2,
            spaceBetween: 20,
        });
    })
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
            <div className='aboutus_container'>
                <div className='aboutus_banner_container'>
                    <img src={Banner} className='banner_img' alt="banner"></img>
                </div>
                <div className='transform_parmacy_container'>
                    <div className='container'>
                        <div className='flexbox'>
                            <div className='col-6'>
                                <h5 className='subheading'>Empowering</h5>
                                <h4 className='heading'>Transforming Pharmacy
                                    Operations with Innovative ERP Solutions</h4>
                            </div>
                            <div className='col-6'>
                                <p className='description'>
                                    At FOGO, we are dedicated to revolutionizing the way pharmacies operate by providing comprehensive ERP software solutions. Our mission is to empower pharmacy retail shops and distributors with advanced tools for point of sale, inventory management, finances, accounting, and CRM. With our cutting-edge technology, we aim to streamline operations, enhance efficiency, and drive growth for our clients. Join us in shaping the future of pharmacy management.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <RatingViews />
                <div className='ambitious_smartTeam_section'>
                    <div className='container'>
                        <h5 className='subtitle'>Our Values</h5>
                        <h4 className='title'>We’re An Ambitious And Smart Team With A Shared Mission</h4>
                        <span className='info'>Our shared values unite us as one cohesive team, guiding our actions and fostering strong connections.</span>
                        <div className='feature_gridbox'>
                            <div className='flex_item'>
                                <div className='img_block lightBlue'>
                                    <img src={Server} alt="feature-icon-1"></img>
                                </div>
                                <h4 className='card-title'>Share inboxes</h4>
                                <span className='card_info'>Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.</span>
                            </div>
                            <div className='flex_item'>
                                <div className='img_block lightBlue'>
                                    <img src={Server} alt="feature-icon-1"></img>
                                </div>
                                <h4 className='card-title'>Deliver messages</h4>
                                <span className='card_info'>Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.</span>
                            </div>
                            <div className='flex_item'>
                                <div className='img_block lightBlue'>
                                    <img src={Server} alt="feature-icon-1"></img>
                                </div>
                                <h4 className='card-title'>Manage team</h4>
                                <span className='card_info'>Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='our_timeline_section'>
                    <div className='container'>
                        <h5 className='subtitle'>Enhance</h5>
                        <h4 className='title'>Our Timeline</h4>
                        <span className='info'>"Charting the Course of History: A Journey Through Time."</span>
                        <div className='card_flexbox'>
                            {
                                timelineData &&
                                timelineData.length > 0 &&
                                timelineData.map((item, index) => {
                                    return (
                                        <div className='box' key={index}>
                                            <span className={`type_indicator ${item.type}`}></span>
                                            <span className='value'>{item.data}</span>
                                            <h5 className='title'>{item.title}</h5>
                                            <span className='info'>{item.info}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>
                <div className='meet_team_section'>
                    <div className='container'>
                        <h5 className='subtitle'>Experienced</h5>
                        <h4 className='title'>Meet the Team</h4>
                        <span className='info'>Meet the talented individuals behind our success.</span>
                        <div className='card_flexbox'>
                            {
                                teamData &&
                                teamData.length > 0 &&
                                teamData.map((item, index) => {
                                    return (
                                        <div className='card' key={index}>
                                            <div className='thumbnail'>
                                                <img src={item.profileimg} className='img_block' alt={`icon_${index + 1}`}></img>
                                            </div>
                                            <div className='content'>
                                                <h5 className='title'>{item.profilename}</h5>
                                                <span className='status'>{item.profileStatus}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className='we_r_hiring_section'>
                    <div className='container'>
                        <h4 className='title'>We’re Hiring!</h4>
                        <p className='description'>
                            "Our philosophy is clear and direct: we believe in building a team of diverse, passionate individuals and nurturing a culture that empowers everyone to do their best work."
                        </p>
                        <div className='button_container'>
                            <button className='see_btn'>
                                See all positions
                            </button>
                        </div>
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
                                <div className='slider_container'>
                                    <div class="swiper" >
                                        <div class="swiper-wrapper">
                                            {
                                                swiperData &&
                                                swiperData.length > 0 &&
                                                swiperData.map((item, index) => {
                                                    return (
                                                        <div class="swiper-slide">
                                                            <div className='testimonial_card'>
                                                                <p className='details'><span className='slide-title'>{item.professionInfo}</span><span className='status'>{item.status}</span> <Link className="viewjob_link">View job</Link></p>
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
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                        <div class="swiper-pagination"></div>


                                        <div class="swiper-button-prev"></div>
                                        <div class="swiper-button-next"></div>


                                        {/* <div class="swiper-scrollbar"></div> */}
                                    </div>
                                </div>
                            </CustomTabPanel>
                            <CustomTabPanel className="tabData_box" value={value} index={1}>
                                <div className='slider_container'>
                                    <div class="swiper" >
                                        <div class="swiper-wrapper">
                                            {
                                                swiperData &&
                                                swiperData.length > 0 &&
                                                swiperData.map((item, index) => {
                                                    return (
                                                        <div class="swiper-slide">
                                                            <div className='testimonial_card'>
                                                                <p className='details'><span className='slide-title'>{item.professionInfo}</span><span className='status'>{item.status}</span> <Link className="viewjob_link">View job</Link></p>
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
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                        <div class="swiper-pagination"></div>


                                        <div class="swiper-button-prev"></div>
                                        <div class="swiper-button-next"></div>


                                        {/* <div class="swiper-scrollbar"></div> */}
                                    </div>
                                </div>
                            </CustomTabPanel>
                            <CustomTabPanel className="tabData_box" value={value} index={2}>
                                <div className='slider_container'>
                                    <div class="swiper" >
                                        <div class="swiper-wrapper">
                                            {
                                                swiperData &&
                                                swiperData.length > 0 &&
                                                swiperData.map((item, index) => {
                                                    return (
                                                        <div class="swiper-slide">
                                                            <div className='testimonial_card'>
                                                                <p className='details'><span className='slide-title'>{item.professionInfo}</span><span className='status'>{item.status}</span> <Link className="viewjob_link">View job</Link></p>
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
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                        <div class="swiper-pagination"></div>


                                        <div class="swiper-button-prev"></div>
                                        <div class="swiper-button-next"></div>


                                        {/* <div class="swiper-scrollbar"></div> */}
                                    </div>
                                </div>
                            </CustomTabPanel>
                        </Box>
                    </div>
                </div>
                <OurPartners />
                <Testimonials />
                <div className='visionto_life_section'>
                    <div className='container'>
                        <h5 className='subtitle'>Enhance</h5>
                        <h4 className='title'>Bringing your vision to life with expertise and dedication</h4>
                        <span className='info'>Get a glimpse of our vibrant office culture.</span>
                        <div className='image_container'>
                            <img src={Visionbanner} className='banner_img' alt="banner"></img>
                        </div>
                    </div>
                </div>
                <div className='unlock_success_container'>
                    <div className='container'>
                        <div className='grid_box'>
                            <div className='content'>
                                <h5 className='subtitle'>Empowering</h5>
                                <h4 className='title'>Unlocking Success for Pharmacies Everywhere</h4>
                                <p className='info'>FOGO is the leading ERP software solution provider for pharmacies, offering a comprehensive suite of services including POS, inventory management, finances and accounting, and CRM. With our cutting-edge technology and user-friendly interface, we empower pharmacies to streamline their operations, enhance customer experience, and drive growth. Partner with Vista and unlock the full potential of your pharmacy business.</p>
                                <ul className='listing_points'>
                                    <li>
                                        <span className='icon'><img src={Checkcircle} alt="checkcircle"></img></span>
                                        <span className='text'>Effortlessly manage your inventory and stock levels</span>
                                    </li>
                                    <li>
                                        <span className='icon'><img src={Checkcircle} alt="checkcircle"></img></span>
                                        <span className='text'>Streamline order processing and fulfillment</span>
                                    </li>
                                    <li>
                                        <span className='icon'><img src={Checkcircle} alt="checkcircle"></img></span>
                                        <span className='text'>Deliver a seamless shopping experience to your customers</span>
                                    </li>
                                </ul>
                                <div className='action_flex'>
                                    <button className='signup_btn'>{locales.signUp}</button>
                                    <button className='learn_more_btn'>{locales.learn_more} <span className='icon'><RightArrow/></span></button>
                                </div>
                            </div>
                            <div className='image_container'>
                                <img src={Unlockbanner} className='banner' alt='banner'></img>
                            </div>
                        </div>
                    </div>
                </div>
                <Testimonials />
                <FeedbackForm />
            </div>
        </React.Fragment>
    )
}

export default AboutUs;