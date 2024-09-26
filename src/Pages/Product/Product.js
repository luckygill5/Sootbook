import React, { useState } from 'react';
import locales from '../../Constants/en.json';
import { Link } from 'react-router-dom';
import Banner from '../../assets/images/product_page_banner.png';
import { ReactComponent as RightArrow } from '../../assets/images/chevron-right.svg';
import TransformCrm from '../../assets/images/transfrom_crm.svg';
import RelumeBlack from '../../assets/images/Relume_black.svg';
import CheckCircle from '../../assets/images/check-circle.svg';
import RelumeNew from '../../assets/images/RelumeNew.svg';
import User2 from '../../assets/images/users-2.svg';
import ProductfooterBanner from '../../assets/images/product_footer_banner.png';
import ConciergeBell from '../../assets/images/concierge-bell.svg';
import OurPartners from '../../Components/OurPartners/OurPartners';
import './Product.scss';

function Product() {
    return (
        <React.Fragment>
            <div className='product_page_container'>
                <div className='product_page_banner'>
                    <img src={Banner} className='banner_img' alt='banner'></img>
                </div>
                <div className='customer_relationship_section'>
                    <div className='container'>
                        <h5 className='subtitle'>Enhance</h5>
                        <h4 className='title'>Transforming Customer Relationships for Pharmacies Everywhere</h4>
                        <p className='description'>
                            Our CRM system is specifically designed for pharmacies, empowering them to build stronger customer relationships. With
                            advanced features like customer segmentation, personalized messaging, and loyalty programs, pharmacies can provide
                            exceptional service and increase customer satisfaction. Say goodbye to manual tracking and hello to a streamlined CRM
                            solution that will revolutionize your pharmacy business.
                        </p>
                        <div className='actions'>
                            <button className='sign_up_btn'>{locales.signUp}</button>
                            <button className='learn_more_btn'>
                                {locales.learn_more}
                                <span className='icon'>
                                    <RightArrow />
                                </span>
                            </button>
                        </div>
                        <div className='img_container'>
                            <img src={TransformCrm} alt='banner' className='img_block'></img>
                        </div>
                    </div>
                </div>
                <div className='fogo_ecommerce_solution'>
                    <div className='container'>
                        <div className='flexbox'>
                            <div className='content'>
                                <h5 className='subtitle'>Empower</h5>
                                <h4 className='title'>Expand Your Pharmacy Business with FOGO's Ecommerce Solution</h4>
                                <p className='description'>
                                    With FOGO's Ecommerce solution, you can increase your reach, tap into 24/7 sales potential, and provide an
                                    enhanced customer experience. Take your pharmacy business to the next level with our cutting-edge technology.
                                </p>
                                <div className='efficiency_flexbox'>
                                    <div className='flex_item'>
                                        <span className='icon_block'>
                                            <img src={RelumeBlack} alt='icon'></img>
                                        </span>
                                        <h5 className='card_title'>Increased Reach</h5>
                                        <p className='card_info'>Reach a wider audience and expand your customer base with an online store.</p>
                                    </div>
                                    <div className='flex_item'>
                                        <span className='icon_block'>
                                            <img src={RelumeBlack} alt='icon'></img>
                                        </span>
                                        <h5 className='card_title'>24/7 Sales</h5>
                                        <p className='card_info'>Unlock the potential of round-the-clock sales and boost your revenue.</p>
                                    </div>
                                </div>
                                <div className='actions'>
                                    <button className='sign_up_btn'>{locales.signUp}</button>
                                    <button className='learn_more_btn'>
                                        {locales.learn_more}
                                        <span className='icon'>
                                            <RightArrow />
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className='thumbnail'>{/* <img className='img_block' src={StreamLinePharamacy} alt="thumbnail"></img> */}</div>
                        </div>
                    </div>
                </div>
                <div className='fogo_comprehensive_solution'>
                    <div className='container'>
                        <div className='flexbox'>
                            <div className='thumbnail'>{/* <img className='img_block' src={Presentation} alt="thumbnail"></img> */}</div>
                            <div className='content'>
                                <h5 className='subtitle'>Streamline</h5>
                                <h4 className='title'>Streamline Your Online Store Setup with FOGO's Comprehensive Solutions</h4>
                                <p className='description'>
                                    Setting up your online store has never been easier. FOGO provides all the tools and support you need to establish
                                    a successful digital storefront.
                                </p>
                                <div className='efficiency_flexbox'>
                                    <div className='flex_item'>
                                        {/* <span className='icon_block'>
                                            <img src={RelumeBlack} alt="icon"></img>
                                        </span> */}
                                        <h5 className='card_title'>Efficient Setup</h5>
                                        <p className='card_info'>FOGO guides you through the process of setting up your online store step by step.</p>
                                    </div>
                                    <div className='flex_item'>
                                        {/* <span className='icon_block'>
                                            <img src={RelumeBlack} alt="icon"></img>
                                        </span> */}
                                        <h5 className='card_title'>Seamless Integration</h5>
                                        <p className='card_info'>
                                            Integrate your online store with FOGO's ERP software for seamless inventory management and order
                                            processing.
                                        </p>
                                    </div>
                                </div>
                                <div className='actions'>
                                    <button className='sign_up_btn'>{locales.signUp}</button>
                                    <button className='learn_more_btn'>
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
                <div className='org_business_strategy_section'>
                    <div className='container'>
                        <h3 className='title'>
                            Organizations. Business planning.
                            <span className='highlight'>Strategy.</span>
                            Human Resources.
                        </h3>
                    </div>
                </div>
                <div className='preferred_payment'>
                    <div className='container'>
                        <div className='flexbox'>
                            <div className='content'>
                                <h5 className='subtitle'>Secure</h5>
                                <h4 className='title'>Choose Your Preferred Payment Gateway</h4>
                                <p className='description'>
                                    Our Ecommerce solution offers a range of secure payment gateway options to ensure smooth and hassle-free
                                    transactions. Whether you prefer PayPal, Stripe, or another trusted provider, we've got you covered.
                                </p>
                                <ul className='prefer_points'>
                                    <li>
                                        <span className='icon'>
                                            <img src={CheckCircle} alt='icon'></img>
                                        </span>
                                        <span className='text'>PayPal: The trusted choice for online payments.</span>
                                    </li>
                                    <li>
                                        <span className='icon'>
                                            <img src={CheckCircle} alt='icon'></img>
                                        </span>
                                        <span className='text'>Stripe: Securely accept credit card payments on your website.</span>
                                    </li>
                                    <li>
                                        <span className='icon'>
                                            <img src={CheckCircle} alt='icon'></img>
                                        </span>
                                        <span className='text'>Authorize.Net: Simplify your payment processing with Authorize.Net.</span>
                                    </li>
                                </ul>
                                <div className='actions'>
                                    <button className='sign_up_btn'>{locales.signUp}</button>
                                    <button className='learn_more_btn'>
                                        {locales.learn_more}
                                        <span className='icon'>
                                            <RightArrow />
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className='thumbnail'>{/* <img className='img_block' src={Presentation} alt="thumbnail"></img> */}</div>
                        </div>
                    </div>
                </div>
                <div className='ecommerce_integration'>
                    <div className='container'>
                        <div className='flexbox'>
                            <div className='thumbnail'>{/* <img className='img_block' src={StreamLinePharamacy} alt="thumbnail"></img> */}</div>
                            <div className='content'>
                                <h5 className='subtitle'>Simplified</h5>
                                <h4 className='title'>Effortlessly Manage Inventory with Ecommerce Integration</h4>
                                <p className='description'>
                                    Experience the seamless integration of our Ecommerce platform with your pharmacy's existing inventory management
                                    system. Streamline your operations and boost your online sales with ease.
                                </p>
                                <div className='efficiency_flexbox'>
                                    <div className='flex_item'>
                                        {/* <span className='icon_block'>
                                            <img src={RelumeBlack} alt="icon"></img>
                                        </span> */}
                                        <h5 className='card_title'>Enhanced Efficiency</h5>
                                        <p className='card_info'>
                                            Sync your inventory in real-time, manage orders, and track sales all in one place.
                                        </p>
                                    </div>
                                    <div className='flex_item'>
                                        {/* <span className='icon_block'>
                                            <img src={RelumeBlack} alt="icon"></img>
                                        </span> */}
                                        <h5 className='card_title'>Increased Sales</h5>
                                        <p className='card_info'>
                                            Expand your customer reach and boost revenue with our integrated Ecommerce solution.
                                        </p>
                                    </div>
                                </div>
                                <div className='actions'>
                                    <button className='sign_up_btn'>{locales.signUp}</button>
                                    <button className='learn_more_btn'>
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
                <div className='shopping_experience'>
                    <div className='container'>
                        <div className='flexbox'>
                            <div className='content'>
                                <h5 className='subtitle'>Simplified</h5>
                                <h4 className='title'>Streamlined Shopping Experience for Easy Checkout</h4>
                                <p className='description'>
                                    Our user-friendly shopping cart and checkout features are designed to provide a seamless and convenient experience
                                    for customers. With easy navigation and intuitive design, you can quickly find and purchase the products you need.
                                </p>
                                <div className='efficiency_flexbox'>
                                    <div className='flex_item'>
                                        <span className='icon_block'>
                                            <img src={RelumeBlack} alt='icon'></img>
                                        </span>
                                        <h5 className='card_title'>Convenient</h5>
                                        <p className='card_info'>
                                            Effortlessly add items to your cart and complete your purchase in just a few clicks.
                                        </p>
                                    </div>
                                    <div className='flex_item'>
                                        <span className='icon_block'>
                                            <img src={RelumeBlack} alt='icon'></img>
                                        </span>
                                        <h5 className='card_title'>Secure</h5>
                                        <p className='card_info'>
                                            Rest assured that your personal and payment information is protected with advanced security measures.
                                        </p>
                                    </div>
                                </div>
                                <div className='actions'>
                                    <button className='sign_up_btn'>{locales.signUp}</button>
                                    <button className='learn_more_btn'>
                                        {locales.learn_more}
                                        <span className='icon'>
                                            <RightArrow />
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className='thumbnail'>{/* <img className='img_block' src={Presentation} alt="thumbnail"></img> */}</div>
                        </div>
                    </div>
                </div>
                <div className='pharmacy_financial_section'>
                    <div className='container'>
                        <h5 className='subtitle'>Our Values</h5>
                        <h4 className='title'>
                            Streamline your pharmacy's financial operations with our comprehensive finance and accounting services.
                        </h4>
                        <p className='description'>
                            Our shared values unite us as one cohesive team, guiding our actions and fostering strong connections.
                        </p>
                        <div className='grid_box'>
                            <div className='card'>
                                <div className='icon_block'>
                                    <img src={RelumeNew} alt='icon'></img>
                                </div>
                                <h5 className='card_title'>Managing Online Orders and Fulfillment</h5>
                                <Link className='learn_moreLink'>
                                    Learn more
                                    <span className='icon'>
                                        <RightArrow />
                                    </span>
                                </Link>
                            </div>
                            <div className='card'>
                                <div className='icon_block'>
                                    <img src={User2} alt='icon'></img>
                                </div>
                                <h5 className='card_title'>Streamlined Order Processing</h5>
                                <span className='info'>
                                    Our ERP system simplifies the order processing for pharmacies. It automates the order entry, tracks inventory
                                    availability, and generates packing slips for efficient order fulfillment.
                                </span>
                                <Link className='learn_moreLink'>
                                    Learn more
                                    <span className='icon'>
                                        <RightArrow />
                                    </span>
                                </Link>
                            </div>
                            <div className='card'>
                                <div className='icon_block'>
                                    <img src={ConciergeBell} alt='icon'></img>
                                </div>
                                <h5 className='card_title'>Efficient Fulfillment Workflow</h5>
                                <Link className='learn_moreLink'>
                                    Learn more
                                    <span className='icon'>
                                        <RightArrow />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <OurPartners />
                <div className='product_footer_banner'>
                    <img src={ProductfooterBanner} alt='banner' className='banner_img'></img>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Product;
