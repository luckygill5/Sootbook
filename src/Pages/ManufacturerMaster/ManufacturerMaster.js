import React, { useState, useEffect } from 'react';
import locales from "../../Constants/en.json";
import { ReactComponent as UserPlus } from "../../assets/images/user-plus.svg";
import { ReactComponent as Download } from "../../assets/images/download.svg";
import { ReactComponent as Setting } from "../../assets/images/settings.svg";
import { ReactComponent as List } from "../../assets/images/list.svg";
import { ReactComponent as UserSquare } from "../../assets/images/user-square-2.svg";
import { ReactComponent as Arrow } from "../../assets/images/chevron-right.svg";
import CommonTable from '../../Components/CommonTable/CommonTable';
import SuccessModal from '../../Components/CommonSuccessModal/SuccessModal';
import { axiosClient } from '../../services/axiosClient';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Pagination from '../../Components/common/PaginationLayout';
import DeleteModal from '../../Components/CommonDeleteModal/CommonDeleteModal';
import AddNewManufacturer from './AddNewManufacturer/AddNewManufacturer';
import './ManufacturerMaster.scss';

function ManufacturerMaster({breadcrumbUpdateData, updateBreadCrumb}) {
    const [addManufacturer, setAddManufacturer] = useState(false);
    const [manufacturerListCard, setManufacturerListCard] =  useState(null);
    const [tableFilterHeader, setTableFilterHeader] =  useState("");
    const [previewMode, setPreviewMode] = useState();
    const [previewData, setPreviewData] = useState('');
    const [manufacturerlistUpdate, setManufacturerListUpdate] = useState(false);
    const [successModal,  setSuccessModal] = useState('');
    const [SuccessModalMsg , setSuccessModalMsg] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [pageValue, setPageValue] = useState(1);
    const [deleteModal,  setDeleteModal] = useState(false);
    const [deleteProductData, setDeleteManufacturerData] = useState("");
    const [DeleteModalTitle, setDeleteModalTitle] = useState("");
    const [DeleteModalMsg, setDeleteModalMsg] = useState("");
    const [breadcrumb, setBreadCrumb] = useState([...breadcrumbUpdateData]);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalPages, setTotalPages] = useState();

 const dataheader= ["code","name","email","contactName","contactMobile"]
    let tableHeader = [
        "Manufacturer code",
        "Name",
        "Email",
        "Contact Person Name",
        "Contact Number"
        // "address1",
        // "address2",
        // "country",
        // "city",
        // "postal",
        // "port",
        // "minMargin",
        // "expiry",
        // "creditTerm",
        // "licence",
        // "productType",
        // "trn",
        // "moq"
        ]

    const handleAddNewManufacturer = () => {
        setAddManufacturer(true);
        setManufacturerListUpdate(false);
        setBreadCrumb([...breadcrumb, 'Add New Manufacturer']);
         //updateBreadCrumb(breadcrumb)
    }

    const handleBack = () => {
        setAddManufacturer(false);
        setEditMode(false)
        setPreviewData([])
        setPreviewMode(false);
        let removeLastBreadcrumb = breadcrumb.filter((item) => {
            if(item!=='Add New Manufacturer' && item!=='Edit Manufacturer'){
                return item
            }
    });
        setBreadCrumb([...removeLastBreadcrumb]);
        
    }

    useEffect(() => {
         updateBreadCrumb(breadcrumb)
    }, [breadcrumb])

    useEffect(() => {
            handleManufacturerList();
    }, [searchTerm]);

    const handleManufacturerList = async event => {
        const accessToken =  `Bearer ${sessionStorage.accessToken} `
        try{
            let response = await axiosClient.post(
                `admin/manufacturer/list`, 
                JSON.stringify({ search: searchTerm.length > 2?searchTerm:'', page: pageValue, limit:10}), 
                {
                    headers : {
                        'Content-Type': 'application/json',
                        'x-via-device': true,
                        'Authorization' : accessToken
                    },
                }

            );
            if(response.status == 200){
                setManufacturerListCard( response?.data?.data?.manufacturer);
                setTotalPages(response?.data?.data?.totalPages);
            }

        }catch(error){
            console.log("error", error)
        }
       
    }

    const handleManufacturerTableheaderFilter = () => {
        if(manufacturerListCard && manufacturerListCard.length > 0){
            let firstCollection = manufacturerListCard[0];
            let arrayFirst = Object.keys(firstCollection);
            let filterFirst;
            filterFirst = arrayFirst.filter((item, index) => {
                if(dataheader.includes(item)){
                    return item;
                }
            })
            setTableFilterHeader(filterFirst)

        }
    }

    useEffect(() => {
        handleManufacturerList();
    }, [])

    useEffect(() => {
        handleManufacturerTableheaderFilter()
    }, [manufacturerListCard])

    const handleDataPopulate = (index) => {
        let filter;
       filter =  manufacturerListCard.filter((item) => {
            if(item.manufacturerCode == index){
                return item
            }
        })
        setPreviewData(filter[0])
        setPreviewMode(true);
        setAddManufacturer(true)
    }

    const handleEditDataPopulate = (id) => {
        const data = manufacturerListCard.filter(x=>x._id===id);
        setBreadCrumb([...breadcrumb, 'Edit Manufacturer']);
        setPreviewData(data && data[0])
        setPreviewMode(false);
        setAddManufacturer(true);
        handleRemovePreview()

    }

    const handleRemovePreview =() => {
        setPreviewMode(false);
        setEditMode(true)
    }

    const handleSuccessModalClose  = () => {
        setManufacturerListUpdate(true);
        setPreviewMode(false);
        handleRemovePreview()
        setAddManufacturer(false)
    }

    useEffect(() => {
        if(manufacturerlistUpdate == true || 
            successModal == true || 
            addManufacturer == true ||
            pageValue!==0){
            handleManufacturerList();
        }
     
    }, [manufacturerlistUpdate, successModal, addManufacturer, pageValue])

    const handleDeleteManufacturerData = async event => {
        const accessToken =  `Bearer ${sessionStorage.accessToken} `
        try{
            let response = await axiosClient.post(
                `admin/manufacturer/delete`, 
                JSON.stringify({ _id:event}), 
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
                setDeleteManufacturerData('');
                setDeleteModal(false);
            }

        }catch(error){
            console.log("error", error)
        }
       
    } 

    const handleDeleteSuccessModalClose = () => {
        setSuccessModal(false);
        setSuccessModalMsg('')
    }
    
    const handlePagination = (event) => { 
        setPageValue(parseInt(event))
    }


    const handleDeleteModalClose = () => {
        setDeleteModal(false);
        setManufacturerListUpdate(true);
    }

    const handleManufacturerDelete = (e) => {
        setDeleteManufacturerData(e);
        setDeleteModal(true);
        setDeleteModalTitle("Confirm Manufacturer Deletion")
        setDeleteModalMsg("Are you sure you want to delete this manufacturer? This action cannot be undone")
    } 

    const handleDeleteData = () => {
        handleDeleteManufacturerData(deleteProductData)
    }

    return (
        <React.Fragment>
        <div className={`manufacturerMaster_container ${editMode ? "editMode" : ''}`}>
        {addManufacturer ? <AddNewManufacturer  successModalClose={() => handleSuccessModalClose()} preview={previewMode} removePreviewMode={() => handleRemovePreview()} previewData={previewData} back={handleBack} EditData={editMode}/> :
                <div className='manufacturerMaster_content'>
                    <div className='headerFlexbox'>
                        <h5 className='title'>Manufacturers List</h5>
                        <button className='addnewManufacturer' onClick={() => handleAddNewManufacturer()}>
                            <span className='icon'>
                                <UserPlus />
                            </span>
                            Add new Manufacturer
                        </button>
                    </div>
                    <div className='contentSection'>
                        <div className='head-flexbox'>
                            <input type='text' className='searchBox'  onChange={({ target: { value } }) => {
                                setSearchTerm(value);
                            }} placeholder='Search Manufacturer'></input>
                        </div>
                        <div className='manufacturerMasterListingTabs'>
                            <Box className="tabsContainer" sx={{ width: '100%' }}>
                            <CommonTable deleteProductData={(e) => handleManufacturerDelete(e)} dataEditPopulate={(e) => handleEditDataPopulate(e)} dataPopulate={(e) => handleDataPopulate(e)} tableFilterHeader={tableFilterHeader} header={tableHeader} productData={manufacturerListCard}/> 
                                   {manufacturerListCard ? <Pagination totalPages={totalPages} pageNo={pageValue} paginationSet={(e) => handlePagination(e)}/>: ''}

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
            {deleteModal &&
                <DeleteModal
                handleDeleteClose={handleDeleteModalClose}
                DeletePopUp={deleteModal}
                DeleteModalTitle={DeleteModalTitle}
                DeleteModalMsg={DeleteModalMsg}
                handleDeleteConfirm={handleDeleteData}
                />

            }
        </React.Fragment>
    )
}

export default ManufacturerMaster;