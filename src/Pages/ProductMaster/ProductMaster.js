import React, { useState, useEffect } from 'react';
import locales from "../../Constants/en.json";
import AddNewProduct from './AddNewProduct/AddNewProduct';
import { ReactComponent as UserPlus } from "../../assets/images/user-plus.svg";
import { ReactComponent as Download } from "../../assets/images/download.svg";
import { ReactComponent as Setting } from "../../assets/images/settings.svg";
import { ReactComponent as List } from "../../assets/images/list.svg";
import { ReactComponent as UserSquare } from "../../assets/images/user-square-2.svg";
import CommonTable from '../../Components/CommonTable/CommonTable';
import { axiosClient } from '../../services/axiosClient';
import ProductCards from './ProductCards';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DraftList from './DraftList';
import './ProductMaster.scss'


function ProductMaster() {
    const [value, setValue] = useState(0);
    const [addProduct, setAddProduct] = useState(false);
    const [toggleView, setToggleView] = useState("Card");
    const [productListCard, setProductListCard] =  useState(null);
    const [draftListData, setDraftListData] =  useState("");
    const [tableFilterHeader, setTableFilterHeader] =  useState("");
    const [previewMode, setPreviewMode] = useState();
    const [previewData, setPreviewData] = useState('')


    let tableHeader = ["name", "genericName", "productCode", 'manufacturer', "netPrice",]

    const handleAddNewProduct = () => {
        setAddProduct(true)
    }

    const handleBack = () => {
        setAddProduct(false);
        // if(previewMode){
        //     setPreviewData([])
        //     setPreviewMode(false);
        // }
        setPreviewData([])
        setPreviewMode(false);
    }


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


    const handleToggleView = (event) => {

        setToggleView(event)
    }

   

    const handleProductList = async event => {
        const accessToken =  `Bearer ${sessionStorage.accessToken} `
        try{
            let response = await axiosClient.post(
                `admin/product/list`, 
                JSON.stringify({ search: '', isDraft:false}), 
                {
                    headers : {
                        'Content-Type': 'application/json',
                        'x-via-device': true,
                        'Authorization' : accessToken
                    },
                }

            );
            if(response.status == 200){
                setProductListCard( response?.data?.data?.products)
            }

        }catch(error){
            console.log("error", error)
        }
       
    }

    const handleDraftList = async event => {
        const accessToken =  `Bearer ${sessionStorage.accessToken} `
        try{
            let response = await axiosClient.post(
                `admin/product/list`, 
                JSON.stringify({ search: '', isDraft:true}), 
                {
                    headers : {
                        'Content-Type': 'application/json',
                        'x-via-device': true,
                        'Authorization' : accessToken
                    },
                }

            );
            if(response.status == 200){
                setDraftListData( response?.data?.data?.products)
            }

        }catch(error){
            console.log("error", error)
        }
       
    }

    const handleProductTableheaderFilter = () => {
        if(productListCard && productListCard.length > 0){
            let firstCollection = productListCard[0];
            let arrayFirst = Object.keys(firstCollection);
            let filterFirst;
            filterFirst = arrayFirst.filter((item, index) => {
                if(tableHeader.includes(item)){
                    return item
                }
            })
            setTableFilterHeader(filterFirst)

        }
    }

    useEffect(() => {
        handleProductList();
        handleDraftList()
    }, [])

    useEffect(() => {
        handleProductTableheaderFilter()
    }, [productListCard])

    const handleDataPopulate = (index) => {

        let filter;
       filter =  productListCard.filter((item) => {
            if(item.productCode == index){
                return item
            }
        })
        setPreviewData(filter[0])
        setPreviewMode(true);
        setAddProduct(true)
    }

    const handleRemovePreview =() => {
        setPreviewMode(false)
    }
    const ProductMasterTabs = ['Products', "Drafts",]


    return (
        <div className='productMaster_container'>
            {addProduct ? <AddNewProduct preview={previewMode} removePreviewMode={() => handleRemovePreview()} previewData={previewData} back={handleBack} /> :
                <div className='productMaster_content'>
                    <div className='headerFlexbox'>
                        <h5 className='title'>Product Master</h5>
                        <button className='addnewProduct' onClick={() => handleAddNewProduct()}>
                            <span className='icon'>
                                <UserPlus />
                            </span>
                            Add new product
                        </button>
                    </div>
                    <div className='contentSection'>
                        <div className='head-flexbox'>
                            <input type='text' className='searchBox' placeholder='Search Product'></input>
                            <div className='actionFlexBox'>
                                <button className='importBtn commonBtn' type='button'>
                                    <span className='icon'>
                                        <Download />
                                    </span>
                                    Import Product from Database
                                </button>
                                <button className='manageBtn commonBtn' type='button'>
                                    <span className='icon'>
                                        <Setting />
                                    </span>
                                    Manage
                                </button>
                                <button className={`toggleView ${toggleView == 'List' ? 'active' : ''}`}  type='button' onClick={() => handleToggleView('List')}>
                                    <List />
                                </button>
                                <button className={`toggleView ${toggleView == 'Card' ? 'active' : ''}`} type='button'  onClick={() => handleToggleView('Card')}>
                                    <UserSquare />
                                </button>
                            </div>
                        </div>
                        <div className='productMasterListingTabs'>
                            <Box className="tabsContainer" sx={{ width: '100%' }}>
                                <Box className="tabFlexContainer">
                                    <Tabs value={value}
                                        onChange={handleChange}
                                        aria-label="basic tabs example">
                                        {
                                            ProductMasterTabs &&
                                            ProductMasterTabs.length > 0 &&
                                            ProductMasterTabs.map((label, index) => {
                                                return (
                                                    <Tab label={label} {...a11yProps(index)} />
                                                )
                                            })
                                        }
                                    </Tabs>
                                </Box>
                                <CustomTabPanel value={value} index={0} className="tabContentContainer">
                                    {toggleView == 'Card' ? <ProductCards productData={productListCard}/> 
                                    : 
                                    toggleView == 'List' ? <CommonTable dataPopulate={(e) => handleDataPopulate(e)} header={tableFilterHeader} productData={productListCard}/> 
                                    : ''}
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1} className="tabContentContainer">
                                    <DraftList/>
                                </CustomTabPanel>

                            </Box>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductMaster;