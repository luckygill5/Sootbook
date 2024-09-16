import React, { useState, useEffect } from 'react';
import locales from "../../../Constants/en.json";
import { ReactComponent as ArrowLeft } from "../../../assets/images/arrow-left.svg";
import { ReactComponent as Edit } from "../../../assets/images/pencil.svg";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductDetail from './ProductDetail';
import ECommerceDetails from './E-CommerceDetails';
import UploadProduct from './UploadProduct';
import { axiosClient } from '../../../services/axiosClient';
import './AddNewProduct.scss'

function AddNewProduct({back, preview, previewData,removePreviewMode }) {
    const [value, setValue] = useState(0);
    const [productCreateList, setProductCreateList] = useState("");
    const [ecommercedata, setEcommerceData] =  useState("")
    const [productDetailsCollection, setProductDetailsCollection] = useState("")
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

    const handleProductCreateList = async event => {
        const accessToken =  `Bearer ${sessionStorage.accessToken} `
        try{
            let response = await axiosClient.get(
                `admin/product/create/list`, {
                    headers : {
                        'Content-Type': 'application/json',
                        'x-via-device': true,
                        'Authorization' : accessToken
                    },
                }

            );
            if(response.status == 200){
                setProductCreateList( response?.data?.data)
            }

        }catch(error){
            console.log("error", error)
        }
       
    }

    useEffect(() => {
        handleProductCreateList()
    },[])


    const handleTabs = (event) => {
        handleChange(true, event)
    }

    const handleProductDetailData = (event) => {
        setProductDetailsCollection(event)
    }

    const handleEcommerceData = (event) => {
        setEcommerceData(event) 
    }
    const AddProductTabs = ['Product Details', "E-commerce Details", "Images"]

    return (
        <div className='addNewProduct_container'>
            <div className='backLink'>
                <span className='link' onClick={back}>
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
                        <Tabs value={value} 
                        onChange={preview ? handleChange : ''} 
                        aria-label="basic tabs example">
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
                        {
                        preview ? <button className='editBtn' onClick={() => removePreviewMode()}>
                            <span className='icon'>
                                <Edit/>
                            </span>
                            Edit
                        </button> : ""
                    }
                    </Box>
                   
                    <CustomTabPanel value={value} index={0} className="tabContentContainer">
                      <ProductDetail preview={preview} previewData={previewData} productDetailData={(e) => handleProductDetailData(e)} ProductCreateList={productCreateList} changeTab={(e) => handleTabs(e)}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1} className="tabContentContainer">
                     <ECommerceDetails preview={preview} previewData={previewData} ECommerceDetailsData={(e) => handleEcommerceData(e)} ProductCreateList={productCreateList} changeTab={(e) => handleTabs(e)}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2} className="tabContentContainer">
                        <UploadProduct preview={preview} previewData={previewData} productData={productDetailsCollection} ecommerceData={ecommercedata} changeTab={(e) => handleTabs(e)}/>
                    </CustomTabPanel>
                </Box>
            </div>
        </div>
    )
}

export default AddNewProduct;