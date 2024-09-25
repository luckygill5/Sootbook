import React, { useState, useEffect } from 'react';
import { ReactComponent as ArrowLeft } from "../../../assets/images/arrow-left.svg";
import { ReactComponent as Edit } from "../../../assets/images/pencil.svg";
import Box from '@mui/material/Box';
import { axiosClient } from '../../../services/axiosClient';
import ManuFacturerDetail from "./ManufacturerDetail"
import './AddNewManufacturer.scss';


function AddNewManufacturer({ back, preview, previewData, removePreviewMode, successModalClose, EditData, draftSuccessPopUpClose }) {
    const [value, setValue] = useState(0);
    const [productCreateList, setProductCreateList] = useState("");
    const [ecommercedata, setEcommerceData] = useState("")
    const [productDetailsCollection, setProductDetailsCollection] = useState("");
    const  [productTypelist, setProductTypeList] = useState([]);
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


    const handleDraftPopUpClose = () => {
        draftSuccessPopUpClose()
    }
    useEffect(() => {
        handleProductCreateList();
        handleProductTypeList();
    }, [])


    const handleTabs = (event) => {
        handleChange(true, event)
    }

    const handleProductDetailData = (event) => {
        setProductDetailsCollection(event)
    }

    const handleProductCreateList = async event => {
        const accessToken = `Bearer ${sessionStorage.accessToken} `
        try {
            let response = await axiosClient.get(
                `admin/product/create/list`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-via-device': true,
                    'Authorization': accessToken
                },
            }

            );
            if (response.status == 200) {
                setProductCreateList(response?.data?.data)
            }

        } catch (error) {
            console.log("error", error)
        }

    }

    const handleProductTypeList = async event => {
        const accessToken =  `Bearer ${sessionStorage.accessToken} `
        try{
            let response = await axiosClient.post(
                `admin/product_type/list`, 
                JSON.stringify({ search: ''}), 
                {
                    headers : {
                        'Content-Type': 'application/json',
                        'x-via-device': true,
                        'Authorization' : accessToken
                    },
                }

            );
            if(response.status == 200){
                setProductTypeList( response?.data?.data?.productTypes)
            }

        }catch(error){
            console.log("error", error)
        }
       
    }
    return (
        <div className='addNewManufacturer_container'>
            <div className='backLink'>
                <span className='link' onClick={back}>
                    <span className='icon'>
                        <ArrowLeft />
                    </span>
                    Back to Manufacturers
                </span>
            </div>
            <div className={`container_section ${preview ? 'preview':''}`}>
                {preview ? <div className='header_section'>
                    <div className='section_flexbox'>
                        <div className='leftInfo_flexbox'>
                            <div className='imgBox'>
                                <img src={previewData && previewData.image[0]} alt="thumbnail" className='preview'></img>
                            </div>
                            <div className='info'>
                                <div className='flexbox'>
                                    <h5 className='title'>{previewData && previewData.name}</h5><span className='status green'>Available</span>
                                </div>
                                <span className='lastUpdated'>
                                    Last Updated on {new Date(`${previewData && previewData.updatedAt}`).toDateString()}
                                </span>
                            </div>
                        </div>
                        <div className='rightInfo_flexbox'>
                            <button className='histroyBtn' type='button'>Transaction History</button>
                            <button className='stockBtn' type='button'>Stock</button>
                        </div>
                    </div>
                </div> :
                    <h1 className='section_title'>{`${EditData ? "Edit Manufacturer" :"Add New Manufacturer"} `}</h1>}
                <Box className="tabsContainer" sx={{ width: '100%' }}>
                    <Box className="tabFlexContainer">
                        {
                            preview ? <button className='editBtn' onClick={() => removePreviewMode()}>
                                <span className='icon'>
                                    <Edit />
                                </span>
                                Edit
                            </button> : ""
                        }
                    </Box>

                        <ManuFacturerDetail successModalClose={() => successModalClose()} productTypelist={productTypelist} preview={preview} previewData={previewData} productDetailData={(e) => handleProductDetailData(e)} ProductCreateList={productCreateList} changeTab={(e) => handleTabs(e)} back={back} productBackData={productDetailsCollection} draftPopUpClose={() => handleDraftPopUpClose()} />
                </Box>
            </div>
        </div>
    )
}

export default AddNewManufacturer;