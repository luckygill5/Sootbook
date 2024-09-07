import React, { useState } from 'react';
import locales from "../../../Constants/en.json";
import { ReactComponent as ArrowLeft } from "../../../assets/images/arrow-left.svg";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductDetail from './ProductDetail';
import ECommerceDetails from './E-CommerceDetails';
import UploadProduct from './UploadProduct';
import './AddNewProduct.scss'

function AddNewProduct() {
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

    const AddProductTabs = ['Product Details', "E-commerce Details", "Images"]

    return (
        <div className='addNewProduct_container'>
            <div className='backLink'>
                <span className='link'>
                    <span className='icon'>
                        <ArrowLeft />
                    </span>
                    Back to Product Master
                </span>
            </div>
            <div className='container_section'>
                <h1 className='section_title'>Add New Product</h1>
                <Box className="tabsContainer" sx={{ width: '100%' }}>
                    <Box className="tabFlexContainer">
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            {
                                AddProductTabs &&
                                AddProductTabs.length > 0 &&
                                AddProductTabs.map((label, index) => {
                                    return (
                                        <Tab label={label} {...a11yProps(index)} />
                                    )
                                })
                            }
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0} className="tabContentContainer">
                      <ProductDetail/>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1} className="tabContentContainer">
                     <ECommerceDetails/>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2} className="tabContentContainer">
                        <UploadProduct/>
                    </CustomTabPanel>
                </Box>
            </div>
        </div>
    )
}

export default AddNewProduct;