import React, { useState, useEffect } from "react";
import PaginationLayout from "../../../Components/common/PaginationLayout";
import CommonTable from "../../../Components/CommonTable/CommonTable";
import { ReactComponent as UserPlus } from '../../../assets/images/user-plus.svg';
import SuccessModal from "../../../Components/CommonSuccessModal/SuccessModal";
import { axiosClient } from "../../../services/axiosClient";
import AddNewSupplier from "./AddNewSupplier/AddNewSupplier";
import "./Suppliers.scss"

function Supplier({ breadcrumbUpdateData, updateBreadCrumb }) {
    const [addNewSupplier, setAddNewSupplier] = useState(false);
    const [searchVal, setSearchVal] = useState("");
    const [pageValue, setPageValue] = useState(1);
    const [supplierListData, setSupplierListData] = useState("");
    const [supplierTableData, setSupplierTableData] = useState("");
    const [breadcrumb, setBreadCrumb] = useState([...breadcrumbUpdateData]);
    let header = ["Supplier Code", "Name", "Email", "Contact Person Name", "Contact Number"]
    let tableFilterHeader = ['code', 'name', 'email', 'contactName', 'contactMobile']

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
            const rearrangeArray = filteredArray.map(obj => ({
                code: obj.code,
                name: obj.name,   // Move 'city' before 'age'
                email: obj.email,
                contactName: obj.contactName,
                contactMobile: obj.contactMobile
            }));

            setSupplierTableData(rearrangeArray);
        }
    }

    const handlePagination = (event) => {
        setPageValue(event)
    }

    const supplierList = async event => {
        const accessToken = `Bearer ${sessionStorage.accessToken} `;
        try {
            let response = await axiosClient.post(`admin/supplier/list`, JSON.stringify({ search: searchVal, page: pageValue, limit: 15 }), {
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
        setBreadCrumb(filterBreadcrumb)
    }

    return (
        <React.Fragment>
            {addNewSupplier ? <AddNewSupplier
                back={handleBack}
            /> : <div className="suppliers_container">
                <div className="header_section">
                    <h1 className="title">Suppliers List</h1>
                    <button className="addSupplierBtn" onClick={() => handleAddNewSupplier()}><span className="icon"><UserPlus /></span>Add New Supplier</button>
                </div>
                <div className="searchBox">
                    <input type="text" className="searchElement" placeholder="Search Supplier"></input>
                </div>
                <div className="table_container">
                    <CommonTable
                        header={header}
                        tableFilterHeader={tableFilterHeader}
                        tableBodyData={supplierTableData}
                        renderTable="suppliers"
                    />
                    <PaginationLayout totalPages={supplierListData.totalPages} pageNo={pageValue} paginationSet={e => handlePagination(e)} />
                </div>
            </div>}

        </React.Fragment>
    )
}

export default Supplier