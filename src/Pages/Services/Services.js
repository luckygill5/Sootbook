import React, { useEffect, useState } from 'react';
import { Link,} from "react-router-dom";
import ServicesPageBanner from "../../assets/images/services_page_banner.png";
import { ReactComponent as UserCog } from "../../assets/images/user-cog.svg";
import { ReactComponent as CRMIcon } from "../../assets/images/goal.svg";
import { ReactComponent as CMSIcon } from "../../assets/images/settings.svg";
import { ReactComponent as InventoryIcon } from "../../assets/images/shopping-basket.svg";
import { ReactComponent as RightArrow } from '../../assets/images/chevron-right.svg';
import RelumeBlack from "../../assets/images/Relume_black.svg"
import RelumeNew from "../../assets/images/RelumeNew.svg";
import User2 from "../../assets/images/users-2.svg";
import StreamLinePharamacy from "../../assets/images/streamline_pharmacy.png"
import ConciergeBell from "../../assets/images/concierge-bell.svg";
import Server from "../../assets/images/server.svg";
import ServiceGridBanner from "../../assets/images/service_grid_banner.png";
import VideoBanner from "../../assets/images/Video.png"
import Testimonials from '../../Components/Testimonials/Testimonials';
import PlanPricing from '../../Components/PlanPricing/PlanPricing';
import NeedConsultBanner from "../../assets/images/need_consultant_banner.png"
import FAQS from '../../Components/FAQS/FAQS';
import locales from "../../Constants/en.json";
import './Services.scss'

function Services() {

    const planPricingData = {
        subtitle:"Enhance",
        title:"Pick Your Perfect Plan",
        info:"Check out our Pricing page for complete details",
    }
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
        },
        {
            icon: <CMSIcon />,
            title: "Accounting",
            detail: "CMS, or Content Management System, simplifies the creation, management, and publication of digital content on websites."
        },
        {
            icon: <InventoryIcon />,
            title: "Finance",
            detail: "CMS, or Content Management System, simplifies the creation, management, and publication of digital content on websites."
        }
    ]

    return (
        <React.Fragment>
            <div className='services_container'>
                <div className='services_banner'>
                    <img src={ServicesPageBanner} alt="services_banner" className='service_page_banner'></img>
                </div>
                <div className='streamline_operation_section'>
                    <div className='container'>
                        <h5 className='subtitle'>Efficency</h5>
                        <h4 className='title'>Streamline Pharmacy Operations with Our POS Systems</h4>
                        <p className='description'>Our shared values unite us as one cohesive team, guiding our actions and fostering strong connections.</p>

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
                        </div>
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
                                <div className='img_block lightsafron'>
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
                <div className='pharamacy_sales_section'>
                    <div className='container'>
                        <div className='grid_box'>
                            <div className='thumbnail'>
                                <img src={ServiceGridBanner} alt="banner" className='banner_img'></img>
                            </div>
                            <div className='content'>
                                <ul className='listing_point'>
                                    <li>
                                        <h5 className='title'>Empower Your Pharmacy Online</h5>
                                        <span className='info'>With our ecommerce platform, pharmacies can easily set up an online store and start selling their products to a wider audience. Increase your reach and revenue with our user-friendly solution.</span>
                                    </li>
                                    <li>
                                        <h5 className='title'>Streamline Your Online Sales</h5>
                                        <span className='info'>Our ecommerce platform provides seamless inventory management, secure payment processing, and a user-friendly interface. Take your online sales to the next level with our comprehensive solution.</span>
                                    </li>
                                    <li>
                                        <h5 className='title'>Enhance Customer Experience</h5>
                                        <span className='info'>Deliver exceptional customer service with our CRM integration. Stay connected with your customers, manage their orders, and provide personalized support to build long-lasting relationships.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='erp_software_section'>
                    <div className='container'>
                        <h5 className='subtitle'>Our Values</h5>
                        <h4 className='title'>Streamline Your Pharmacy Operations with Vista ERP Software</h4>
                        <p className='description'>Our shared values unite us as one cohesive team, guiding our actions and fostering strong connections.</p>
                        <div className='grid_box'>
                            <div className='card'>
                                <div className='icon_block'>
                                    <img src={RelumeNew} alt="icon"></img>
                                </div>
                                <h5 className='card_title'>Efficiently Manage Your Pharmacy with Vista ERP Solutions</h5>
                                <Link className='learn_moreLink'>
                                    Learn more
                                    <span className='icon'><RightArrow /></span>
                                </Link>
                            </div>
                            <div className='card'>
                                <div className='icon_block'>
                                <img src={User2} alt="icon"></img>
                                </div>
                                <h5 className='card_title'>Expand Your Pharmacy's Reach with Vista Ecommerce Solutions</h5>
                                <Link className='learn_moreLink'>
                                    Learn more
                                    <span className='icon'><RightArrow /></span>
                                </Link>
                            </div>
                            <div className='card'>
                                <div className='icon_block'>
                                <img src={ConciergeBell} alt="icon"></img>
                                </div>
                                <h5 className='card_title'>Enhance Efficiency and Profitability with Vista ERP Software</h5>
                                <Link className='learn_moreLink'>
                                    Learn more
                                    <span className='icon'><RightArrow /></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='org_business_strategy_section'>
                    <div className='container'>
                        <h3 className='title'>
                        Organizations.
                        Business planning.
                        <span className='highlight'>Strategy.</span>
                        Human Resources.
                        </h3>
                    </div>
                </div>
                <div className='pharamacy_operation_gridbox'>
                    <div className='container'>
                        <div className='flexbox'>
                            <div className='content'>
                                <h5 className='subtitle'>Enhance</h5>
                                <h4 className='title'>Streamline Your Pharmacy Operations with Our Comprehensive ERP Software Solution</h4>
                                <p className='description'>Our ERP software solution for pharmacies offers improved efficiency, better customer service, and increased sales. With features such as POS, inventory management, finances and accounting, and CRM, you can easily manage your pharmacy retail shop or distribution business.</p>
                                <div className='efficiency_flexbox'>
                                    <div className='flex_item'>
                                        <span className='icon_block'>
                                            <img src={RelumeBlack} alt="icon"></img>
                                        </span>
                                        <h5 className='card_title'>Improved Efficiency</h5>
                                        <p className='card_info'>Our ERP software streamlines your pharmacy operations, saving you time and effort.</p>
                                    </div>
                                    <div className='flex_item'>
                                        <span className='icon_block'>
                                            <img src={RelumeBlack} alt="icon"></img>
                                        </span>
                                        <h5 className='card_title'>Better Customer Service</h5>
                                        <p className='card_info'>With our ERP software, you can provide personalized service and enhance customer satisfaction.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='thumbnail'>
                                <img className='img_block' src={StreamLinePharamacy} alt="thumbnail"></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pharmacy_financial_section'>
                    <div className='container'>
                        <h5 className='subtitle'>Our Values</h5>
                        <h4 className='title'>Streamline your pharmacy's financial operations with our comprehensive finance and accounting services.</h4>
                        <p className='description'>Our shared values unite us as one cohesive team, guiding our actions and fostering strong connections.</p>
                        <div className='grid_box'>
                            <div className='card'>
                                <div className='icon_block'>
                                    <img src={RelumeNew} alt="icon"></img>
                                </div>
                                <h5 className='card_title'>Efficiently manage your pharmacy's finances with our advanced accounting solutions.</h5>
                                <Link className='learn_moreLink'>
                                    Learn more
                                    <span className='icon'><RightArrow /></span>
                                </Link>
                            </div>
                            <div className='card'>
                                <div className='icon_block'>
                                <img src={User2} alt="icon"></img>
                                </div>
                                <h5 className='card_title'>Stay on top of your pharmacy's financial health with our comprehensive finance and accounting solutions.</h5>
                                <span className='info'>Vista ERP integrates seamlessly into your pharmacy's daily operations, providing a comprehensive solution for point of sale, inventory management, finances, accounting, and CRM.</span>
                                <Link className='learn_moreLink'>
                                    Learn more
                                    <span className='icon'><RightArrow /></span>
                                </Link>
                            </div>
                            <div className='card'>
                                <div className='icon_block'>
                                <img src={ConciergeBell} alt="icon"></img>
                                </div>
                                <h5 className='card_title'>Optimize your pharmacy's financial processes with our advanced finance and accounting services.</h5>
                                <Link className='learn_moreLink'>
                                    Learn more
                                    <span className='icon'><RightArrow /></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='video_banner_container'>
                    <div className='container'>
                        <div className='thumbnail_banner'>
                            <img src={VideoBanner} alt="banner" className='banner_img'></img>
                        </div>
                    </div>
                </div>
                <Testimonials/>
                <PlanPricing
                data={planPricingData}
                />
                <FAQS/>
                <div className='need_consultant_banner'>
                    <div className='thumbnail'>
                        <img src={NeedConsultBanner} alt="banner" className='img_block'></img>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Services;