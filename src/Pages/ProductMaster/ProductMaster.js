import React, { useState, useEffect } from 'react';
import locales from "../../Constants/en.json";
import AddNewProduct from './AddNewProduct/AddNewProduct';
import { ReactComponent as UserPlus } from "../../assets/images/user-plus.svg";
import { ReactComponent as Download } from "../../assets/images/download.svg";
import { ReactComponent as Setting } from "../../assets/images/settings.svg";
import { ReactComponent as List } from "../../assets/images/list.svg";
import { ReactComponent as UserSquare } from "../../assets/images/user-square-2.svg";
import { ReactComponent as Arrow } from "../../assets/images/chevron-right.svg";
import CommonTable from '../../Components/CommonTable/CommonTable';
import SuccessModal from '../../Components/CommonSuccessModal/SuccessModal';
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
    const [previewData, setPreviewData] = useState('');
    const [productlistUpdate, setProductListUpdate] = useState(false);
    const [successModal,  setSuccessModal] = useState('');
    const [SuccessModalMsg , setSuccessModalMsg] = useState("");
    const [editMode, setEditMode] = useState(false);


    let tableHeader = ["name", "genericName", "productCode", 'manufacturer', "netPrice",]

    const handleAddNewProduct = () => {
        setAddProduct(true);
        setProductListUpdate(false)
    }

    const handleBack = () => {
        setAddProduct(false);
        setEditMode(false)
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

    const handleEditDataPopulate = (index) => {
        let filter;
       filter =  productListCard.filter((item) => {
            if(item.productCode == index){
                return item
            }
        })
        setPreviewData(filter[0])
        setPreviewMode(false);
        setAddProduct(true);
        handleRemovePreview()

    }

    const handleEditProductData = (index) => {
        let filter;
       filter =  productListCard.filter((item) => {
            if(item.productCode == index){
                return item
            }
        })
        setPreviewData(filter[0])
        setAddProduct(true);
        setPreviewMode(false);
        setEditMode(true)
       
    }

    const handleRemovePreview =() => {
        setPreviewMode(false);
        setEditMode(true)
    }

    const handleSuccessModalClose  = () => {
        setProductListUpdate(true);
        setAddProduct(false)
    }

    useEffect(() => {
        if(productlistUpdate == true || successModal == true){
            handleProductList();
            handleDraftList()
        }
     
    }, [productlistUpdate, successModal, addProduct])

    const handleDeleteProductData = async event => {
        const accessToken =  `Bearer ${sessionStorage.accessToken} `
        try{
            let response = await axiosClient.post(
                `admin/product/delete`, 
                JSON.stringify({ id:event}), 
                {
                    headers : {
                        'Content-Type': 'application/json',
                        'x-via-device': true,
                        'Authorization' : accessToken
                    },
                }

            );
            if(response.status == 200){
                setSuccessModal(true);
                setSuccessModalMsg(response?.data?.message)
                // setDraftListData( response?.data?.data?.products)
            }

        }catch(error){
            console.log("error", error)
        }
       
    } 

    const handleDeleteSuccessModalClose = () => {
        setSuccessModal(false);
        setSuccessModalMsg('')
    }
    

    const ProductMasterTabs = ['Products', "Drafts",]


    return (
        <React.Fragment>
        <div className={`productMaster_container ${editMode ? "editMode" : ''}`}>
            {addProduct ? <AddNewProduct successModalClose={() => handleSuccessModalClose()} preview={previewMode} removePreviewMode={() => handleRemovePreview()} previewData={previewData} back={handleBack} EditData={editMode} /> :
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
                                    {toggleView == 'Card' ? <ProductCards deleteProductData={(e) => handleDeleteProductData(e)} editDataPopulate={(e) => handleEditProductData(e)} dataPopulate={(e) => handleDataPopulate(e)} productData={productListCard}/> 
                                    : 
                                    toggleView == 'List' ? <CommonTable deleteProductData={(e) => handleDeleteProductData(e)} dataEditPopulate={(e) => handleEditDataPopulate(e)} dataPopulate={(e) => handleDataPopulate(e)} header={tableFilterHeader} productData={productListCard}/> 
                                    : ''}
                                   {(productListCard || productListCard) ? <div className='paginationsection'>
                                        <div className='leftCol'>
                                            <ul className='navigation_listing'>
                                                <li>
                                                    <span className='pev-arrow'><Arrow/></span>
                                                </li>
                                                <li>
                                                    <span className='select text'>1</span>
                                                </li>
                                                <li>
                                                <span className='text'>2</span>
                                                </li>
                                                <li>
                                                <span className='text'>3</span>
                                                </li>
                                                <li>
                                                <span className='text more'>...</span>
                                                </li>
                                                <li>
                                                <span className='text'>10</span>
                                                </li>
                                                <li>
                                                    <span className='next-arrow'><Arrow/></span>
                                                </li>
                                            </ul>
                                        </div> 
                                        <div className='rightCol'>
                                            <div className='flexbox'>
                                                <span className='label'>Go to</span>
                                                <input type="text"></input>
                                                <span className='label'>page</span>
                                            </div>
                                        </div>
                                    </div>: ''}
                                </CustomTabPanel>
                                <CustomTabPanel value={value} index={1} className="tabContentContainer">
                                    <DraftList draftData={draftListData}/>
                                    {(draftListData) ? <div className='paginationsection'>
                                        <div className='leftCol'>
                                            <ul className='navigation_listing'>
                                                <li>
                                                    <span className='pev-arrow'><Arrow/></span>
                                                </li>
                                                <li>
                                                    <span className='select text'>1</span>
                                                </li>
                                                <li>
                                                <span className='text'>2</span>
                                                </li>
                                                <li>
                                                <span className='text'>3</span>
                                                </li>
                                                <li>
                                                <span className='text more'>...</span>
                                                </li>
                                                <li>
                                                <span className='text'>10</span>
                                                </li>
                                                <li>
                                                    <span className='next-arrow'><Arrow/></span>
                                                </li>
                                            </ul>
                                        </div> 
                                        <div className='rightCol'>
                                            <div className='flexbox'>
                                                <span className='label'>Go to</span>
                                                <input type="text"></input>
                                                <span className='label'>page</span>
                                            </div>
                                        </div>
                                    </div>: ''}
                                </CustomTabPanel>

                            </Box>
                        </div>
                    </div>
                </div>
            }
        </div>

        {
                successModal &&
                <SuccessModal
                    handleSuccessClose={handleDeleteSuccessModalClose}
                    SuccessPopUp={successModal}
                    SuccessTitle={SuccessModalMsg}
                    // SuccessMsg={SuccessModalMsg}
                 
                />
            }
        </React.Fragment>
    )
}

export default ProductMaster;