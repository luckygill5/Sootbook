import React, { useState } from 'react';
import locales from "../../Constants/en.json";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ReactComponent as RightArrow } from '../../assets/images/chevron-right.svg';
import { ReactComponent as Check } from '../../assets/images/check.svg';
import './PlanPricing.scss'

function PlanPricing(props) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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

    const plandPricingData = [
        {
            statusLabel: "",
            title: "Free Trial",
            amount: "$0",
            children: ["1 user", "Plan features", "Product support"]
        },
        {
            statusLabel: "Most popular",
            title: "Basic",
            amount: "$50",
            children: ["1 user", "Plan features", "Product support"]
        },
        {
            statusLabel: "",
            title: "Standard",
            amount: "$550",
            children: ["1 user", "Plan features", "Product support"]
        },
        {
            statusLabel: "",
            title: "Enterprise",
            amount: "$648",
            children: ["1 user", "Plan features", "Product support"]
        }
    ]
    return (
        <React.Fragment>
            <div className='plan_pricing_section'>
                <div className='container'>
                    {props.data.subtitle && <h5 className='subtitle'>{props.data.subtitle}</h5>}
                    {props.data.title && <h4 className='title'>{props.data.title}</h4>}
                    {props.data.info && <span className='info'>{props.data.info}</span>}
                    <Box sx={{ width: '100%' }} className="tab_section">
                        <Box sx={{ width: '100%' }} className="tab_header" >
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Monthly" {...a11yProps(0)} />
                                <Tab label="Yearly" {...a11yProps(1)} />

                            </Tabs>
                        </Box>
                        <Box className="tab_body">
                            <CustomTabPanel value={value} index={0} className="tab_content">
                                <div className='flex_grid'>
                                    {
                                        plandPricingData &&
                                        plandPricingData.length > 0 &&
                                        plandPricingData.map((item, index) => {
                                            return (
                                                <div className='card'>
                                                    {
                                                        item.statusLabel && (<span className='status_label'>{item.statusLabel}</span>)   
                                                    }
                                                    {
                                                        item.title && (<h5 className='title'>{item.title}</h5>)
                                                    }
                                                    {
                                                        item.amount && <span className='amount'>{item.amount}</span>
                                                    }
                                                    <ul className='listing_points'>
                                                        {
                                                            item.children &&
                                                            item.children.length > 0 &&
                                                            item.children.map((data, index) => {
                                                                return (
                                                                    <li className='list_item'>
                                                                        <span className='icon'>
                                                                            <Check/>
                                                                        </span>
                                                                        <span className='text'>{data}</span>
                                                                        </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                    <button className='get_started'>{locales.get_started}</button>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1} className="tab_content">
                            <div className='flex_grid'>
                                    {
                                        plandPricingData &&
                                        plandPricingData.length > 0 &&
                                        plandPricingData.map((item, index) => {
                                            return (
                                                <div className='card' key={index}>
                                                    {
                                                        item.statusLabel && (<span className='status_label'>{item.statusLabel}</span>)   
                                                    }
                                                    {
                                                        item.title && (<h5 className='title'>{item.title}</h5>)
                                                    }
                                                    {
                                                        item.amount && <span className='amount'>{item.amount}</span>
                                                    }
                                                    <ul className='listing_points'>
                                                        {
                                                            item.children &&
                                                            item.children.length > 0 &&
                                                            item.children.map((data, index) => {
                                                                return (
                                                                    <li className='list_item'>
                                                                        <span className='icon'>
                                                                            <Check/>
                                                                        </span>
                                                                        <span className='text'>{data}</span>
                                                                        </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                    <button className='get_started'>{locales.get_started}</button>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </CustomTabPanel>
                        </Box>
                    </Box>
                </div>
            </div>
        </React.Fragment>
    )
}

export default PlanPricing;