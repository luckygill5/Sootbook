import React, { useState } from 'react';
import locales from "../../Constants/en.json";
import FogoLogo from '../../assets/images/logo_fogo.svg';
import User from "../../assets/images/user-2.svg";
import { ReactComponent as UserCog } from "../../assets/images/user-cog.svg";
import { ReactComponent as CRMIcon } from "../../assets/images/goal.svg";
import { ReactComponent as CMSIcon } from "../../assets/images/settings.svg";
import { ReactComponent as InventoryIcon } from "../../assets/images/shopping-basket.svg";
import { ReactComponent as RightArrow } from '../../assets/images/chevron-right.svg';
import Presentation from "../../assets/images/presentation-1.png";
import Server from "../../assets/images/server.svg";
import Feature from "../../assets/images/feature-2.svg";
import FeatureNew from "../../assets/images/feature-3.svg";
import CheckCircle from "../../assets/images/check-circle.svg";
import Bannercommon from "../../assets/images/banner_common.png";
import {
    Routes, Route, Link,
    useLocation
} from "react-router-dom";
import OurPartners from '../../Components/OurPartners/OurPartners';
import StreamlineTransforming from '../../Components/StreamlineTransforming/StreamlineTransforming';
import RatingViews from '../../Components/RatingViews/RatingViews';
import PlanPricing from '../../Components/PlanPricing/PlanPricing';
import FAQS from '../../Components/FAQS/FAQS';
import Testimonials from '../../Components/Testimonials/Testimonials';
import FeedbackForm from '../../Components/FeedbackForm/FeedbackForm';
import './Home.scss'

function Home(props) {

    const EfficencyData = [
        {
            icon: User,
            views: "100M+",
            data: "Efficiently manage your pharmacy operations with FOGO ERP"
        },
        {
            icon: User,
            views: "100M+",
            data: "Efficiently manage your pharmacy operations with FOGO ERP"
        },
        {
            icon: User,
            views: "100M+",
            data: "Efficiently manage your pharmacy operations with FOGO ERP"
        }
    ]

    const servicesData = [
        {
            icon: <UserCog />,
            title: "HRM",
            detail: "HRM ensures employee productivity and satisfaction by aligning organizational goals with individual needs."
        },
        {
            icon: <CRMIcon />,
            title: "CRM",
            detail: "CRM, or Customer Relationship Management, enhances customer satisfaction and loyalty."
        },
        {
            icon: <CMSIcon />,
            title: "CMS",
            detail: "CMS, or Content Management System, simplifies the creation, management, and publication of digital content on websites."
        },
        {
            icon: <InventoryIcon />,
            title: "Inventory Management",
            detail: "CMS, or Content Management System, simplifies the creation, management, and publication of digital content on websites."
        }
    ]

    const StreamlineTransformingData = {
        subtitle: "Enhance",
        title: "Transforming Customer Relationships for Pharmacies Everywhere",
        info: "Our CRM system is specifically designed for pharmacies, empowering them to build stronger customer relationships. With advanced features like customer segmentation, personalized messaging, and loyalty programs, pharmacies can provide exceptional service and increase customer satisfaction. Say goodbye to manual tracking and hello to a streamlined CRM solution that will revolutionize your pharmacy business.",
        image:Bannercommon

    }
    const planPricingData = {
        subtitle:"Enhance",
        title:"Pick Your Perfect Plan",
        info:"Check out our Pricing page for complete details",
    }
    return (
        <React.Fragment>
            <div className='homepage_container'>
                <div className='homepage_banner_section'>
                    <div className='center_content'>
                        <h2 className='heading'>
                            Innovative <br></br> <span className='highlight'>Software Solutions</span> for
                        </h2>
                        <h3 className='sub_heading'>
                            Pharmacy, Supermarket & Auto Retail
                        </h3>
                        <div className='grid_action'>
                            <button className='btn_blue'>Get started free</button>
                            <button className='btn_outline'>
                                See all plans
                            </button>
                        </div>
                    </div>
                </div>
                <div className='services_section'>
                    <div className='container'>
                        <div className='efficiency_card_box'>
                            {
                                EfficencyData &&
                                EfficencyData.length > 0 &&
                                EfficencyData.map((item, index) => {
                                    return (
                                        <div className='card_box'>
                                            <span className='img_box'>
                                                <img src={item.icon} alt="icon"></img>
                                            </span>
                                            <span className='view_data'>
                                                {item.views}
                                            </span>
                                            <span className='info'>
                                                {item.data}
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='services_grid_box'>
                            {
                                servicesData &&
                                servicesData.length > 0 &&
                                servicesData.map((item, index) => {
                                    return (
                                        <div className='card_container'>
                                            <div className='flexbox'>
                                                <div className='img_block'>
                                                    {item.icon}
                                                    {/* <img src={item.icon} alt="icon"></img> */}
                                                </div>
                                                <div className='content'>
                                                    <h4 className='title'>{item.title}</h4>
                                                    <span className='info'>{item.detail}</span>
                                                </div>
                                                <span className='right_arrow'>
                                                    <RightArrow />
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <span className='services_link'>
                                View all services
                                <span className='icon'><RightArrow /></span>

                            </span>
                        </div>
                    </div>
                </div>
                <OurPartners />
                <div className='our_advantage_section'>
                    <div className='container'>
                        <h5 className='subtitle'>Officia esse deserunt magna</h5>
                        <h4 className='title'>Our Advantages</h4>
                        <div className='feature_gridbox'>
                            <div className='flex_item'>
                                <div className='img_block lightBlue'>
                                    <img src={Server} alt="feature-icon-1"></img>
                                </div>
                                <h4 className='card-title'>Feature name</h4>
                                <span className='card_info'>Aliqua incididunt elit ea deserunt magna anim aute ullamco</span>
                            </div>
                            <div className='flex_item'>
                                <div className='img_block lightsafron'>
                                    <img src={Feature} alt="feature-icon-1"></img>
                                </div>
                                <h4 className='card-title'>Feature name</h4>
                                <span className='card_info'>Aliqua incididunt elit ea deserunt magna anim aute ullamco</span>
                            </div>
                            <div className='flex_item'>
                                <div className='img_block lightviolet'>
                                    <img src={FeatureNew} alt="feature-icon-1"></img>
                                </div>
                                <h4 className='card-title'>Feature name</h4>
                                <span className='card_info'>Aliqua incididunt elit ea deserunt magna anim aute ullamco</span>
                            </div>
                        </div>
                        <div className='learn_more_link'>
                            <span className='learn_more'>
                                {locales.learn_more}
                                <span className='icon'>
                                    <RightArrow />
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='ease_section'>
                    <div className='container'>
                        <div className='grid_box'>
                            <div className='content_flexbox'>
                                <div className='data_side'>
                                    <h5 className='subtitle'>Empower</h5>
                                    <h4 className='title'>Build Your Online
                                        Pharmacy Store with Ease</h4>
                                    <p className='info'>FOGO's ecommerce solutions for pharmacies provide everything you need to set up an online store and start selling medicines. With our user-friendly platform, you can easily manage your inventory, process orders, and offer a seamless shopping experience to your customers.</p>
                                    <ul className='point_list'>
                                        <li>
                                            <span className='icon'>
                                                <img src={CheckCircle} alt="check-circle"></img>
                                            </span>
                                            <span className='text'>Effortlessly manage your inventory and stock levels</span>
                                        </li>
                                        <li>
                                            <span className='icon'>
                                                <img src={CheckCircle} alt="check-circle"></img>
                                            </span>
                                            <span className='text'>Streamline order processing and fulfillment</span>
                                        </li>
                                        <li>
                                            <span className='icon'>
                                                <img src={CheckCircle} alt="check-circle"></img>
                                            </span>
                                            <span className='text'>Deliver a seamless shopping experience to your customers</span>
                                        </li>
                                    </ul>
                                    <div className='actions'>
                                        <button className='sign_up'>
                                            {locales.signUp}
                                        </button>
                                        <button className='learn_more'>
                                            {locales.learn_more}
                                            <span className='icon'>
                                                <RightArrow />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className='image_side'>
                                    {/* <img src={Presentation} className='img_block' alt="img-1"></img> */}
                                </div>
                            </div>
                            <div className='content_flexbox'>
                                <div className='image_side'>
                                    {/* <img src={Presentation} className='img_block' alt="img-1"></img> */}
                                </div>
                                <div className='data_side'>
                                    <h5 className='subtitle'>Streamline</h5>
                                    <h4 className='title'>Efficiently manage your Pharmacy's finances with ease</h4>
                                    <p className='info'>FOGO's finance and accounting features provide a comprehensive solution for managing your pharmacy's finances. From tracking sales and expenses to generating financial reports, our software simplifies the financial management process.</p>
                                    <div className='sales_manage_flexgrid'>
                                        <div className='flex_item'>
                                            <h5 className='title'>Sales Tracking</h5>
                                            <p className='info'>Track sales in real-time and gain valuable insights into your pharmacy's performance.</p>
                                        </div>
                                        <div className='flex_item'>
                                            <h5 className='title'>Expense Management</h5>
                                            <p className='info'>Effortlessly manage and track expenses, ensuring accurate financial records for your pharmacy.</p>
                                        </div>
                                    </div>
                                    <div className='actions'>
                                        <button className='sign_up'>
                                            {locales.signUp}
                                        </button>
                                        <button className='learn_more'>
                                            {locales.learn_more}
                                            <span className='icon'>
                                                <RightArrow />
                                            </span>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <StreamlineTransforming
                    data={StreamlineTransformingData}
                />
                <RatingViews/>
                <PlanPricing
                data={planPricingData}
                />
                <FAQS/>
                <Testimonials/>
                <FeedbackForm/>
            </div>
        </React.Fragment>
    )
}

export default Home;