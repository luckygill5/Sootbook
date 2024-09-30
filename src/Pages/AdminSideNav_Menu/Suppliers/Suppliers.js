import React, { useState, useEffect } from "react";
import PaginationLayout from "../../../Components/common/PaginationLayout";
import CommonTable from "../../../Components/CommonTable/CommonTable";
import { ReactComponent as UserPlus } from '../../../assets/images/user-plus.svg';
import SuccessModal from "../../../Components/CommonSuccessModal/SuccessModal";
import { axiosClient } from "../../../services/axiosClient";
import AddNewSupplier from "./AddNewSupplier/AddNewSupplier";
import DeleteModal from "../../../Components/CommonDeleteModal/CommonDeleteModal";
import "./Suppliers.scss"

function Supplier({ breadcrumbUpdateData, updateBreadCrumb }) {
    const [addNewSupplier, setAddNewSupplier] = useState(false);
    const [searchVal, setSearchVal] = useState("");
    const [pageValue, setPageValue] = useState(1);
    const [supplierListData, setSupplierListData] = useState("");
    const [supplierTableData, setSupplierTableData] = useState("");
    const [previewData, setPreviewData] = useState('');
    const [breadcrumb, setBreadCrumb] = useState([...breadcrumbUpdateData]);
    const [successModal,  setSuccessModal] = useState('');
    const [SuccessModalMsg , setSuccessModalMsg] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [deleteModal,  setDeleteModal] = useState(false);
    const [deleteSupplierData, setDeleteSupplierData] = useState("");
    const [DeleteModalTitle, setDeleteModalTitle] = useState("");
    const [DeleteModalMsg, setDeleteModalMsg] = useState("");
   

    let header = ["Supplier Code", "Name", "Email", "Contact Person Name", "Contact Number"]
    let tableFilterHeader = ['code', 'name', 'email', 'contactName', 'contactMobile', ]


    useEffect(() => {
        supplierList();

    }, [pageValue])

    useEffect(() => {
        supplierListingData()
    }, [supplierListData])


    useEffect(() => {
        updateBreadCrumb(breadcrumb);
    }, [breadcrumb]);

    const supplierListingData = () => {

        if (supplierListData && supplierListData?.data?.supplier.length > 0) {


            // Define a filter condition, for example, keep only keys where the value is not 'inactive'
            const filterCondition = (obj) => {
                // You can change the condition here
                const filteredObject = Object.keys(obj)
                    .filter(key => tableFilterHeader.includes(key))  // filter out 'inactive' status
                    .reduce((acc, key) => {

                        acc[key] = obj[key];
                        return acc;
                    }, {});

                return filteredObject;
            };

            const filteredArray = supplierListData?.data?.supplier.map(obj => {
                const filteredObj = filterCondition(obj);

                // If no properties are left after filtering, return an empty object
                return Object.keys(filteredObj).length > 0 ? filteredObj : {};
            });

            // Function to reorder object properties
            const rearrangeArray = filteredArray.map((obj, index) => ({
                code: obj.code,
                name: obj.name,   // Move 'city' before 'age'
                email: obj.email,
                contactName: obj.contactName,
                contactMobile: obj.contactMobile,
                ...supplierListData?.data?.supplier[index]
            }));


            setSupplierTableData(rearrangeArray);
        }else if(supplierListData && supplierListData?.data?.supplier.length  == 0){

            setSupplierTableData([]);
        }
    }

    const handlePagination = (event) => {
        setPageValue(event)
    }

    const supplierList = async (event= {}) => {

        let searchData="";
        let pageNovalue="";
        if(Object.keys(event).length > 0 && event.value){
            searchData = event.value;
        }
        if(Object.keys(event).length > 0 && event.pageNo){
            pageNovalue = event.pageNo
        }
        const accessToken = `Bearer ${sessionStorage.accessToken} `;
        try {
            let response = await axiosClient.post(`admin/supplier/list`, JSON.stringify({ search: searchData, page: pageNovalue ? pageNovalue : pageValue, limit: 15 }), {
                headers: {
                    'Content-Type': 'application/json',
                    'x-via-device': true,
                    Authorization: accessToken,
                },
            });
            if (response.status == 200) {
                setSupplierListData(response?.data)

            }
        } catch (error) {
            console.log('error', error);
        }
    }

    const handleAddNewSupplier = () => {
        setAddNewSupplier(true);
        setBreadCrumb([...breadcrumb, "Add New Supplier"])
    }

    const handleBack = () => {
        setAddNewSupplier(false);
        let filterBreadcrumb = breadcrumb.filter((item) => {
            if (item !== "Add New Supplier") {
                return item
            }
        })
        setBreadCrumb(filterBreadcrumb);
        if(previewData){
            setPreviewData([])
        }
    }

    const handleEditDataPopulate =(event) => {
        let filteredData;
        filteredData =  supplierTableData && supplierTableData.filter((item) => {
            if(item.code == event){
                return item
            }
        })
        setPreviewData(filteredData[0]);
        setAddNewSupplier(true)
    }
    const handlesuccessModalClose = () => {
        handleBack();
        supplierList();
        
    }

    const handleDeleteSuccessModalClose = () => {
        setSuccessModal(false)
    }

    const handleDeleteData =(event) => {
        setDeleteSupplierData(event)
        setDeleteModal(true);
        setDeleteModalTitle("Confirm Supplier Deletion");
        setDeleteModalMsg("Are you sure you want to delete this supplier? This action cannot be undone")
    }

    const handleDeleteConfirm =() => {
        handleDeleteSupplierData(deleteSupplierData)
    }

    const handleDeleteSupplierData = async event => {
        const accessToken =  `Bearer ${sessionStorage.accessToken} `
        try{
            let response = await axiosClient.post(
                `admin//supplier/delete`, 
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
                setDeleteSupplierData('');
                setDeleteModal(false);
                supplierList();
            }

        }catch(error){
            console.log("error", error)
        }
       
    } 

    const handleDeleteModalClose = () => {
        setDeleteModal(false)
    }

    const handleSearch =(event) => {
        const {value} = event.target;
        setSearchVal(value);
        supplierList({value:value})
        if(event.target.value == ""){
            supplierList({pageNo :"", value:value})

        }else{
            supplierList({pageNo :1, value:value})
        }

    }

    return (
        <React.Fragment>
            {addNewSupplier ? <AddNewSupplier
                back={handleBack}
                previewData={previewData}
                successModalClose={handlesuccessModalClose}
            /> : <div className="suppliers_container">
                <div className="header_section">
                    <h1 className="title">Suppliers/Distributor List</h1>
                    <button className="addSupplierBtn" onClick={() => handleAddNewSupplier()}><span className="icon"><UserPlus /></span>Add New Supplier</button>
                </div>
                <div className="searchBox">
                    <input type="text" className="searchElement" placeholder="Search Supplier" value={searchVal} onChange={handleSearch}></input>
                </div>
                <div className="supplierTableLayout">
                <div className="table_container">
                    <CommonTable
                        header={header}
                        tableFilterHeader={tableFilterHeader}
                        tableBodyData={supplierTableData}
                        renderTable="suppliers"
                        dataEditPopulate={(e) => handleEditDataPopulate(e)} 
                        deleteProductData={(e) => handleDeleteData(e)}
                    />
                    </div>
                    {supplierTableData.length > 0 ? <PaginationLayout totalPages={supplierListData.totalPages} pageNo={pageValue} paginationSet={e => handlePagination(e)} /> : null}
                    </div>
            </div>}


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
                handleDeleteConfirm={handleDeleteConfirm}
                />

            }
        </React.Fragment>
    )
}

export default Supplier