import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SalesPurchase from './Sales&Purchase/Sales&Purchase';
import Filter from "../../../../assets/images/filter.svg"
import './DashboardCollections.scss'


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


function Collection() {
    const [value, setValue] = React.useState(0);
    const [ChartFilter,  setChartFilter] = useState(false);
    const [selectedSaleTabs, setSelectedSaleTab] = useState("")

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChartFilter = () => {
        setChartFilter(true)
    }

    const handleFilterClose = () => {
        setChartFilter(false)
      }

    const tabData = ["Dashboard", "Sales & Purchase", "HRM", "Inventory Report", "Cashbook"]

    const saleTabsData = ["Direct sales", "Online", "Wholesale"];

    const handleSaleTabs = (event) => {
        setSelectedSaleTab(event)
    }
    return (
        <React.Fragment>
            <div className='collection_container'>
                <Box className="collectionTabBlock" sx={{ width: '100%' }}>
                    <Box className="tabsContainer">
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            {
                                tabData &&
                                tabData.length > 0 &&
                                tabData.map((label, index) => {
                                    return <Tab label={label} {...a11yProps(index)} />
                                })
                            }
                        </Tabs>
                        {value == 1 ? <div className='action_flexbox'>
                            {
                                saleTabsData &&
                                saleTabsData.length > 0  &&
                                saleTabsData.map(label => {
                                    return (
                                    <button className={`commonBtn ${selectedSaleTabs == label ? 'active' : ''} `} type='button' onClick={() => handleSaleTabs(label)}>{label}</button>
                                    )
                                }) 
                            }

                            <button className='filterBtn' type='button' onClick={() => handleChartFilter()}>
                                <img src={Filter} alt="filter_icon" className='img'></img>
                            </button>
                        </div> : null}
                    </Box>
                    <CustomTabPanel value={value} index={0} className="data_container">
                        Item One
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1} className="data_container">
                       <SalesPurchase 
                       ChartFilter={ChartFilter}
                       ChartFilterClose={() => handleFilterClose()}
                       />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2} className="data_container">
                        Item Three
                    </CustomTabPanel>
                </Box>
            </div>
        </React.Fragment>
    )
}

export default Collection;