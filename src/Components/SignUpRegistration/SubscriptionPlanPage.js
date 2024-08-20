import React, { useState } from 'react';
import locales from "../../Constants/en.json";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CrossRed from "../../assets/images/cross_red.svg";
import BlueTick from "../../assets/images/blue_tick.svg"

function SubscriptionPlanPage(props){
    const [value, setValue] = useState(0);
    const [selectedPlanCard, setSelectedPlanCard] = useState('');
    const planDetails = [
        {
            label:"",
            title:"Free Trial",
            price:"$0",
            info:"Card validation 7 days.",
            childDetail:["1 user", "Plan features", "Up to 10,000 subscribers", "Advanced analytics", "1-hour, dedicated support response time", "Marketing automations", "Advanced analytics", "24-hour support response time"]
        },
        {
            label:"Most popular",
            title:"Basic",
            price:"$50",
            info:"A plan that scales with your rapidly growing business.",
            childDetail:["1 user", "Plan features", "Up to 10,000 subscribers", "Advanced analytics", "1-hour, dedicated support response time", "Marketing automations", "Advanced analytics", "24-hour support response time"]
        },
        {
            label:"",
            title:"Standard",
            price:"$550",
            info:"Card validation 7 days.",
            childDetail:["1 user", "Plan features", "Up to 10,000 subscribers", "Advanced analytics", "1-hour, dedicated support response time", "Marketing automations", "Advanced analytics", "24-hour support response time"]
        },
        {
            label:"",
            title:"Enterprise",
            price:"$648",
            info:"Card validation 7 days.",
            childDetail:["1 user", "Plan features", "Up to 10,000 subscribers", "Advanced analytics", "1-hour, dedicated support response time", "Marketing automations", "Advanced analytics", "24-hour support response time"]
        }
    ]

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

      const handlePlanCard = (event) => {
        setSelectedPlanCard(event)
      }
    return (
        <React.Fragment>
            <div className='subscriptionPlanPage_wrapper'>
            <h2 className='title'>{locales.subscriptionPlan_title}</h2>
            <div className='body_container'>
            <Box sx={{ width: '100%' }}>
            <Box>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Monthly" {...a11yProps(0)} />
                <Tab label="Yearly" {...a11yProps(1)} />
                </Tabs>
                </Box>
                <CustomTabPanel className="tabcontent_container" value={value} index={0}>
                    <div className='planCard_flexBox'>
                    {
                        planDetails && 
                        planDetails.length > 0 &&
                        planDetails.map((item, index) => {
                            return (
                                <div className={`planCard_container ${selectedPlanCard == item.title && 'active'}`} key={index} onClick={() => handlePlanCard(item.title)}>
                                    { item.label && <span className='status_label'>{item.label}</span> }
                                    <span className='title'>{item.title}</span>
                                    <span className='price'>{item.price}</span>
                                    <span className='info'>{item.info}</span>
                                    <ul className='info_points'>
                                        {
                                            item.childDetail &&
                                            item.childDetail.length > 0 &&
                                            item.childDetail.map((item, index) => {
                                                return (
                                                    <li className='points'><span className='icon'>
                                                        {
                                                             <img src={(index == 0 || index == 1) ? BlueTick : CrossRed} alt='icon'></img>
                                                        }
                                                        </span><span className='text'>{item}</span></li>
                                                )
                                            }) 
                                        }
                                    </ul>
                                    <div className='action'>
                                        <button className='buyBtn' onClick={() => props.paymethod(item.price)}>{locales.buy_now_label}</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                </CustomTabPanel>
                <CustomTabPanel className="tabcontent_container" value={value} index={1}>
                    Item Two
                </CustomTabPanel>
                </Box>
            </div>
            </div>
        </React.Fragment>
    )
}

export default SubscriptionPlanPage