import React, { useState } from 'react';
import locales from "../../Constants/en.json";
import Banner from "../../assets/images/pricing_page_banner.png";
import PlanPricing from '../../Components/PlanPricing/PlanPricing';
import FAQS from '../../Components/FAQS/FAQS';
import FeedbackForm from '../../Components/FeedbackForm/FeedbackForm';
import { ReactComponent as Check } from "../../assets/images/check.svg";
import { ReactComponent as Minus } from "../../assets/images/minus.svg";
import './Pricing.scss'

function Pricing() {

    const comparefeaturePriceData = [
        {
            status: "",
            title: "Free Trial",
            price: "$0"
        },
        {
            status: "Most popular",
            title: "Basic",
            price: "$50"
        },
        {
            status: "",
            title: "Standard",
            price: "$550"
        },
        {
            status: "",
            title: "Enterprise",
            price: "$648"
        },
    ]

    const comparefeatureTableData = [
        {
            heading:"Future Highlights",
            children:[
                {
                    subheading:"Advanced Inventory Management",
                    statusData:['ok', 'ok', 'ok' , 'ok']
                },
                {
                    subheading:"CRM Integration Included",
                    statusData:['ok', 'ok', 'ok' , 'ok']
                },
                {
                    subheading:"24/7 Customer Support",
                    statusData:['ok', 'ok', 'ok' , 'ok']
                },
                {
                    subheading:"Customizable Reporting Features",
                    statusData:['no', 'no', 'ok' , 'ok']
                },
                {
                    subheading:"Secure Data Encryption",
                    statusData:['no', 'no', 'ok' , 'ok']
                },
                
                
            ]
        },
        {
            heading:"Future Highlights",
            children:[
                {
                    subheading:"Advanced Inventory Management",
                    statusData:['ok', 'ok', 'ok' , 'ok']
                },
                {
                    subheading:"CRM Integration Included",
                    statusData:['ok', 'ok', 'ok' , 'ok']
                },
                {
                    subheading:"24/7 Customer Support",
                    statusData:['ok', 'ok', 'ok' , 'ok']
                },
                {
                    subheading:"Customizable Reporting Features",
                    statusData:['no', 'no', 'ok' , 'ok']
                },
                {
                    subheading:"Secure Data Encryption",
                    statusData:['no', 'no', 'ok' , 'ok']
                },
                
                
            ]
        },
        {
            heading:"Future Highlights",
            children:[
                {
                    subheading:"Advanced Inventory Management",
                    statusData:['ok', 'ok', 'ok' , 'ok']
                },
                {
                    subheading:"CRM Integration Included",
                    statusData:['ok', 'ok', 'ok' , 'ok']
                },
                {
                    subheading:"24/7 Customer Support",
                    statusData:['ok', 'ok', 'ok' , 'ok']
                },
                {
                    subheading:"Customizable Reporting Features",
                    statusData:['no', 'no', 'ok' , 'ok']
                },
                {
                    subheading:"Secure Data Encryption",
                    statusData:['no', 'no', 'ok' , 'ok']
                },
                
                
            ]
        },
    ]

    const planPricingData = {
        subtitle: "Affordable",
        title: "Pricing Options",
        info: "Choose the plan that best fits your needs and budget",
    }

    return (
        <React.Fragment>
            <div className='pricing_page_container'>
                <div className='pricing-page_banner'>
                    <img src={Banner} className='banner_img' alt="banner"></img>
                </div>
                <div className='pricing_option_section'>
                    <PlanPricing
                        data={planPricingData}
                    />
                </div>
                <div className='compare_feature_section'>
                    <div className='container'>
                        <h5 className='subtitle'>Affordable</h5>
                        <h4 className='title'>Compare features</h4>
                        <span className='description'>Compare different pricing plans to find the best fit.</span>
                        <div className='grid_box'>
                            {
                                comparefeaturePriceData &&
                                comparefeaturePriceData.length > 0 &&
                                comparefeaturePriceData.map((item, index) => {
                                    return (
                                        <div className='card_column' key={index}>
                                            {item.status && <span className='status'>{item.status}</span>}
                                            <h5 className='card_title'>{item.title}</h5>
                                            <span className='amount'>{item.price}</span>
                                            <button className='get_start_btn'>{locales.get_started}</button>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <div className='feature_table_Data'>
                            {
                                comparefeatureTableData &&
                                comparefeatureTableData.length > 0 &&
                                comparefeatureTableData.map((item, index)=>{
                                    return (
                                        <div className='table-content' key={index}>
                                            <div className='table_heading'>
                                                {item.heading}
                                            </div>
                                            <div className='table_row_flex'>
                                                {
                                                    item.children &&
                                                    item.children.length > 0 &&
                                                    item.children.map((data, index) => {
                                                        return (
                                                            <div className='table_row'>
                                                                
                                                                    <div className='table_subheading'>{data.subheading}</div>
                                                                    {
                                                                        data.statusData &&
                                                                        data.statusData.length > 0 &&
                                                                        data.statusData.map((item,index) => {
                                                                            return (
                                                                                <div className='status_cell'>
                                                                                    {item == "ok" ? <span className='check_container'><Check/></span>: <span className='minus_container'><Minus/></span> }
                                                                                </div>
                                                                            )
                                                                        })

                                                                    }     
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <FAQS />
                <FeedbackForm />
            </div>
        </React.Fragment>
    )
}

export default Pricing