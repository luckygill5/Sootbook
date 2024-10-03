import React, { useState, useEffect } from 'react';
import { ReactComponent as UserPlus } from "../../assets/images/user-plus.svg";
import CommonTable from '../../Components/CommonTable/CommonTable';
import SuccessModal from '../../Components/CommonSuccessModal/SuccessModal';
import { axiosClient } from '../../services/axiosClient';
import Box from '@mui/material/Box';
import Pagination from '../../Components/common/PaginationLayout';
import DeleteModal from '../../Components/CommonDeleteModal/CommonDeleteModal';
import { ReactComponent as ArrowLeft } from "../../assets/images/arrow-left.svg";
import AddNewProduct from "../ProductMaster/AddNewProduct/AddNewProduct";
import './ProductList.scss';

function ProductList({ breadcrumbUpdateData, updateBreadCrumb, back, id, name }) {
    const [productListData, setProductListData] = useState(null);
    const [tableFilterHeader, setTableFilterHeader] = useState("");
    const [pageValue, setPageValue] = useState(1);
    const [breadcrumb, setBreadCrumb] = useState([...breadcrumbUpdateData]);
    const [searchTerm, setSearchTerm] = useState('');
    const [totalPages, setTotalPages] = useState();
    const [showProductDetailPage, setShowProductDetailPage] = useState(false);
    const [previewMode, setPreviewMode] = useState();
    const [previewData, setPreviewData] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [showDraftList, setShowDrafList] = useState(false);
    const [categoriesData,setCategoriesData] = useState("");
    const [productCreateList,setProductCreateList] = useState('');
    const [productAllData,setProductAllData] = useState('');

    const dataheader = ["name", "productCode","productTypeName", "price", "stock", "status"]
    let tableHeader = [
        "Product Name",
        "Product code",
        "Product Type",
        "Price",
        "Quantity available",
        "status",
    ]

    useEffect(() => {
        let removeLastBreadcrumb = breadcrumb.filter((item) => {
            if (item !== 'Products List') {
                return item
            }
        });
        setBreadCrumb([...removeLastBreadcrumb, 'Products List']);
    }, [])

    useEffect(() => {
        updateBreadCrumb(breadcrumb)
    }, [breadcrumb])

    useEffect(() => {
        handleProductsList();
    }, [searchTerm, id]);

    const handleProductsList = async event => {
        const accessToken = `Bearer ${sessionStorage.accessToken} `
        try {
            let response = await axiosClient.post(
                `admin/manufacturer/products`,
                JSON.stringify({ _id: id, search: searchTerm.length > 2 ? searchTerm : '', page: searchTerm.length > 2 ? 1 : pageValue, limit: 10 }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-via-device': true,
                        'Authorization': accessToken
                    },
                }

            );
            if (response.status == 200) {
                const data = response.data.data.products.map((item) => {
                    return {
                        _id:item._id,
                        name: item.name,
                        productCode: item.productCode,
                        productTypeName: item.productTypeName,
                        price: item.netPrice,
                        stock: item.totalStock,
                        status: item.status?"Active":"Inactive"
                    }
                })
                setProductListData(data);
                setProductAllData(response?.data?.data?.products);
                setTotalPages(response?.data?.data?.totalPages);
            }

        } catch (error) {
            console.log("error", error)
        }

    }

    const handleManufacturerTableheaderFilter = () => {
        if (productListData && productListData.length > 0) {
            let firstCollection = productListData[0];
            let arrayFirst = Object.keys(firstCollection);
            let filterFirst;
            filterFirst = arrayFirst.filter((item, index) => {
                if (dataheader.includes(item)) {
                    return item;
                }
            })
            setTableFilterHeader(filterFirst)

        }
    }

    useEffect(() => {
        handleProductsList();
    }, [])

    useEffect(() => {
        handleManufacturerTableheaderFilter()
    }, [productListData])

    const handleViewProductDetail = (id) => {
        handleDataPopulate(id);
        handleCategoryAll();
        handleProductCreateList();
        setShowProductDetailPage(true);
    }

    const handleDataPopulate = _id => {
        let filter;
        filter = productAllData.filter(item => {
            if (item._id === _id) {
                return item;
            }
        });
        setPreviewData(filter[0]);
        setPreviewMode(true);
    };

    useEffect(() => {
        if (pageValue !== 0) {
            handleProductsList();
        }

    }, [pageValue])

    const handlePagination = (event) => {
        setPageValue(parseInt(event))
    }

   // view Detail Section code -------------------------------------------------------------------------------------------------
    const handleSuccessModalClose = () => {
        setShowProductDetailPage(false);
        handleBradCrumb();
        setPreviewData([])
    };

    const handleBradCrumb=()=>{
        let removeLastBreadcrumb = breadcrumb.filter(item => {
            if (item !== 'Add New Product' && item!=='Edit Product') {
                return item;
            }
        });
        setBreadCrumb([...removeLastBreadcrumb]);
    }

    const handleRemovePreview = () => {
        setPreviewMode(false);
        setEditMode(true);
    };

    const handleBack = () => {
        setShowProductDetailPage(false);
        setEditMode(false);
        setPreviewData([]);
        setPreviewMode(false);
        handleBradCrumb();
    };

    const handleDraftSuccessPopUpclose = () => {
        // setValue(1);
        setShowDrafList(true);
        handleBradCrumb();
    };


    const handleCategoryAll = async event  => {
        const accessToken = `Bearer ${sessionStorage.accessToken} `;
        try {
            let response = await axiosClient.get(`admin/category/all`,  {
                headers: {
                    'Content-Type': 'application/json',
                    'x-via-device': true,
                    Authorization: accessToken,
                },
            });
            if (response.status == 200) {
                setCategoriesData(response?.data?.data?.categories)
                
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    const handleProductCreateList = async event => {
        const accessToken = `Bearer ${sessionStorage.accessToken} `;
        try {
            let response = await axiosClient.get(`admin/product/create/list`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-via-device': true,
                    Authorization: accessToken,
                },
            });
            if (response.status == 200) {
                setProductCreateList(response?.data?.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    };
    return (
        <React.Fragment>
            <div className={`productList_container ${editMode ? "editMode" : ''}`}>
            {showProductDetailPage ? (
                    <AddNewProduct
                        isProductList ={"Back to Product List"}
                        successModalClose={() => handleSuccessModalClose()}
                        preview={previewMode}
                        removePreviewMode={() => handleRemovePreview()}
                        previewData={previewData}
                        back={handleBack}
                        EditData={editMode}
                        draftSuccessPopUpClose={() => handleDraftSuccessPopUpclose()}
                        categoriesAllData={categoriesData}
                        productCreateListData={productCreateList}
                    />
                ) : (
                    <>
                <div className='backLink'>
                    <span className='link' onClick={back}>
                        <span className='icon'>
                            <ArrowLeft />
                        </span>
                        Back to Manufacturers
                    </span>
                </div>
                <div className='productList_content'>
                    <div className='headerFlexbox'>
                        <h5 className='title'>Products List-{name}</h5>
                    </div>
                    <div className='contentSection'>
                        <div className='head-flexbox'>
                            <input type='text' className='searchBox' onChange={({ target: { value } }) => {
                                setSearchTerm(value);
                            }} placeholder='Search Product'></input>
                        </div>
                        <div className='productListListingTabs'>
                            <Box className="tabsContainer" sx={{ width: '100%' }}>
                                <div className='tableContainer'>
                                    <CommonTable
                                        tableFilterHeader={tableFilterHeader}
                                        header={tableHeader}
                                        tableBodyData={productListData}
                                        copyHeaderItem={["name", "productCode"]}
                                        showViewProducts={true}
                                        isOnlyViewAction={true}
                                        handleViewDetail={handleViewProductDetail}
                                    />
                                </div>
                                {productListData && productListData?.length>0 ? <Pagination totalPages={totalPages} pageNo={pageValue} paginationSet={(e) => handlePagination(e)} /> : ''}

                            </Box>
                        </div>
                    </div>
                </div>
                </>
                )}
            </div>
        </React.Fragment>
    )
}

export default ProductList;