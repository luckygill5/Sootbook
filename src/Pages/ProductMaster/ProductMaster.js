import React, { useState, useEffect } from 'react';
import locales from '../../Constants/en.json';
import AddNewProduct from './AddNewProduct/AddNewProduct';
import { ReactComponent as UserPlus } from '../../assets/images/user-plus.svg';
import { ReactComponent as Download } from '../../assets/images/download.svg';
import { ReactComponent as Setting } from '../../assets/images/settings.svg';
import { ReactComponent as List } from '../../assets/images/list.svg';
import { ReactComponent as UserSquare } from '../../assets/images/user-square-2.svg';
import { ReactComponent as Arrow } from '../../assets/images/chevron-right.svg';
import CommonTable from '../../Components/CommonTable/CommonTable';
import SuccessModal from '../../Components/CommonSuccessModal/SuccessModal';
import { axiosClient } from '../../services/axiosClient';
import ProductCards from './ProductCards';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import DraftList from './DraftList';
import Pagination from '../../Components/common/PaginationLayout';
import DeleteModal from '../../Components/CommonDeleteModal/CommonDeleteModal';
import './ProductMaster.scss';

function ProductMaster({ breadcrumbUpdateData, updateBreadCrumb }) {
    const [value, setValue] = useState(0);
    const [addProduct, setAddProduct] = useState(false);
    const [toggleView, setToggleView] = useState('Card');
    const [productListCard, setProductListCard] = useState(null);
    const [draftListData, setDraftListData] = useState('');
    const [tableFilterHeader, setTableFilterHeader] = useState('');
    const [productTableHeader, setProductTableHeader] = useState(["manufacturer name", "product Code", "product name", "generic Name", "net Price", "VAT"])
    const [previewMode, setPreviewMode] = useState();
    const [previewData, setPreviewData] = useState('');
    const [productlistUpdate, setProductListUpdate] = useState(false);
    const [successModal, setSuccessModal] = useState('');
    const [SuccessModalMsg, setSuccessModalMsg] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [showDraftList, setShowDrafList] = useState(false);
    const [pageValue, setPageValue] = useState(1);
    const [breadcrumb, setBreadCrumb] = useState([...breadcrumbUpdateData]);
    const [deleteModal, setDeleteModal] = useState(false);
    const [deleteProductData, setDeleteProductData] = useState('');
    const [DeleteModalTitle, setDeleteModalTitle] = useState('');
    const [DeleteModalMsg, setDeleteModalMsg] = useState('');
    const [totalPagesListCard, setTotalPagesListCard] = useState("");
    const [totalPagesDraft, setTotalPagesDraft] = useState("");
    const [searchVal, setSearchVal] = useState("");
    const [categoriesData, setCategoriesData] = useState("");
    const [productCreateList, setProductCreateList] = useState('');
    let tableHeader = ["manufacturerName" , 'name', 'genericName', 'productCode', 'netPrice', "vat" ];

    const handleAddNewProduct = () => {
        setAddProduct(true);
        setProductListUpdate(false);
        setBreadCrumb([...breadcrumb, 'Add New Product']);
        // updateBreadCrumb(breadcrumb)
    };

    const handleBack = () => {
        setAddProduct(false);
        setEditMode(false);
        setPreviewData([]);
        setPreviewMode(false);
        handleBradCrumb();
    };

    const handleBradCrumb=()=>{
        let removeLastBreadcrumb = breadcrumb.filter(item => {
            if (item !== 'Add New Product' && item!=='Edit Product') {
                return item;
            }
        });
        setBreadCrumb([...removeLastBreadcrumb]);
    }

    useEffect(() => {
        updateBreadCrumb(breadcrumb);
    }, [breadcrumb]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // if(showDraftList){
        //     setShowDrafList(false)
        // }
    };

    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
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

    const handleToggleView = event => {
        setToggleView(event);
    };

    const handleProductList = async event => {
  
        const accessToken = `Bearer ${sessionStorage.accessToken} `;
        try {
            let response = await axiosClient.post(`admin/product/list`, JSON.stringify({ search: event?.data, isDraft: false, page: event?.pageNo ? 1 : pageValue, limit: 12 }), {
                headers: {
                    'Content-Type': 'application/json',
                    'x-via-device': true,
                    Authorization: accessToken,
                },
            });
            if (response.status == 200) {
                setProductListCard(response?.data?.data?.products);
                setTotalPagesListCard(response?.data?.data?.totalPages)
            }
        } catch (error) {
            console.log('error', error);
        }
    };


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

    const handleDraftList = async event => {
        const accessToken = `Bearer ${sessionStorage.accessToken} `;
        try {
            let response = await axiosClient.post(`admin/product/list`, JSON.stringify({ search: event?.data, isDraft: true, page:event?.pageNo ? 1 : pageValue, limit: 12 }), {
                headers: {
                    'Content-Type': 'application/json',
                    'x-via-device': true,
                    Authorization: accessToken,
                },
            });
            if (response.status == 200) {
                setDraftListData(response?.data?.data?.products);
                setTotalPagesDraft(response?.data?.data?.totalPages)
            }
        } catch (error) {
            console.log('error', error);
        }
    };

 

    const handleProductTableheaderFilter = () => {
        if (productListCard && productListCard.length > 0) {
            let firstCollection = productListCard[0];
            let arrayFirst = Object.keys(firstCollection);
            let filterFirst;
            filterFirst = arrayFirst.filter((item, index) => {
                if (tableHeader.includes(item)) {
                    return item;
                }
            });

            setTableFilterHeader(filterFirst);
        }
    };

    useEffect(() => {
        handleProductList();
        handleDraftList();
        handleCategoryAll();
        handleProductCreateList();
    }, []);

    useEffect(() => {
        handleProductTableheaderFilter();
    }, [productListCard]);

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
    const handleDataPopulate = index => {
        let filter;
        filter = productListCard.filter(item => {
            if (item.productCode == index) {
                return item;
            }
        });
        setPreviewData(filter[0]);
        setPreviewMode(true);
        setAddProduct(true);
    };

    const handleEditDataPopulate = index => {
        let filter;
        filter = productListCard.filter(item => {
            if (item.productCode == index) {
                return item;
            }
        });
        setPreviewData(filter[0]);
        setPreviewMode(false);
        setAddProduct(true);
        setBreadCrumb([...breadcrumb, 'Edit Product']);
        handleRemovePreview();
    };

    const handleEditDraftData = data => {
        let filter;
        filter = draftListData.filter((item, index) => {
            if (index == data) {
                return item;
            }
        });
        setPreviewData(filter[0]);
        setPreviewMode(false);
        setAddProduct(true);
        handleRemovePreview();
    };

    const handleEditProductData = index => {
        let filter;
        filter = productListCard.filter(item => {
            if (item.productCode == index) {
                return item;
            }
        });
        setPreviewData(filter[0]);
        setAddProduct(true);
        setPreviewMode(false);
        setEditMode(true);
        setBreadCrumb([...breadcrumb, 'Edit Product']);
    };

    const handleRemovePreview = () => {
        setPreviewMode(false);
        setEditMode(true);
    };

    const handleSuccessModalClose = () => {
        setProductListUpdate(true);
        setAddProduct(false);
        handleBradCrumb();
        setPreviewData([])
    };

    useEffect(() => {
        if (productlistUpdate == true || successModal == true || showDraftList == true || addProduct == true || pageValue !== 0 ) {
            handleProductList();
            handleDraftList();
            handleCategoryAll();
            handleProductCreateList();
        }
    }, [productlistUpdate, successModal, addProduct, showDraftList, pageValue]);

    const handleDeleteProductData = async event => {
        const accessToken = `Bearer ${sessionStorage.accessToken} `;
        try {
            let response = await axiosClient.post(`admin/product/delete`, JSON.stringify({ id: event }), {
                headers: {
                    'Content-Type': 'application/json',
                    'x-via-device': true,
                    Authorization: accessToken,
                },
            });
            if (response.status == 200) {
                setSuccessModal(true);
                setSuccessModalMsg(response?.data?.message);
                setDeleteProductData('');
                setDeleteModal(false);
                // setDraftListData( response?.data?.data?.products)
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleDeleteSuccessModalClose = () => {
        setSuccessModal(false);
        setSuccessModalMsg('');
        setPreviewData([])
        handleBradCrumb();
       
    };

    const handleDraftSuccessPopUpclose = () => {
        setAddProduct(false);
        // setValue(1);
        setShowDrafList(true);
        handleBradCrumb();
    };

    const handleDeleteDraft = event => {
        setDeleteProductData(event);
        setDeleteModal(true);
        setDeleteModalTitle('Confirm Draft Deletion');
        setDeleteModalMsg('Are you sure you want to delete this draft? This action cannot be undone');
    };

    const handlePagination = event => {
        setPageValue(event);
    };

    const handleDeleteModalClose = () => {
        setDeleteModal(false);
    };

    const handleProductDelete = e => {
        setDeleteProductData(e);
        setDeleteModal(true);
        setDeleteModalTitle('Confirm Product Deletion');
        setDeleteModalMsg('Are you sure you want to delete this product? This action cannot be undone');
    };

    const handleDeleteData = () => {
        handleDeleteProductData(deleteProductData);
    };

    const handlesearch = (event) => {
        setSearchVal(event.target.value);
        if(event.target.value == ""){
            handleProductList({pageNo :"", data:event.target.value});
            handleDraftList({pageNo :"", data:event.target.value});
        }else{
            handleProductList({pageNo :1, data:event.target.value});
            handleDraftList({pageNo :1, data:event.target.value});
        }



    }
    const ProductMasterTabs = ['Products', 'Drafts'];

    return (
        <React.Fragment>
            <div className={`productMaster_container ${editMode ? 'editMode' : ''}`}>
                {addProduct ? (
                    <AddNewProduct
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
                                <input type='text' className='searchBox' placeholder='Search Product' value={searchVal} onChange={handlesearch}></input>
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
                                    {value == 1 ? null : (
                                        <React.Fragment>
                                            <button
                                                className={`toggleView ${toggleView == 'List' ? 'active' : ''}`}
                                                type='button'
                                                onClick={() => handleToggleView('List')}
                                            >
                                                <List />
                                            </button>
                                            <button
                                                className={`toggleView ${toggleView == 'Card' ? 'active' : ''}`}
                                                type='button'
                                                onClick={() => handleToggleView('Card')}
                                            >
                                                <UserSquare />
                                            </button>
                                        </React.Fragment>
                                    )}
                                </div>
                            </div>
                            <div className='productMasterListingTabs'>
                                <Box className='tabsContainer' sx={{ width: '100%' }}>
                                    <Box className='tabFlexContainer'>
                                        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                                            {ProductMasterTabs &&
                                                ProductMasterTabs.length > 0 &&
                                                ProductMasterTabs.map((label, index) => {
                                                    return <Tab label={label} {...a11yProps(index)} />;
                                                })}
                                        </Tabs>
                                    </Box>
                                    <CustomTabPanel value={value} index={0} className='tabContentContainer'>
                                        {toggleView == 'Card' ? (
                                            <ProductCards
                                                deleteProductData={e => handleProductDelete(e)}
                                                editDataPopulate={e => handleEditProductData(e)}
                                                dataPopulate={e => handleDataPopulate(e)}
                                                productData={productListCard}
                                                
                                            />
                                        ) : toggleView == 'List' ? (
                                            <CommonTable
                                                deleteProductData={e => handleProductDelete(e)}
                                                dataEditPopulate={e => handleEditDataPopulate(e)}
                                                dataPopulate={e => handleDataPopulate(e)}
                                                header={productTableHeader}
                                                tableBodyData={productListCard}
                                                tableFilterHeader={tableFilterHeader}
                                            />
                                        ) : (
                                            ''
                                        )}
                                        {productListCard ? <Pagination totalPages={totalPagesListCard} pageNo={pageValue} paginationSet={e => handlePagination(e)} /> : ''}
                                    </CustomTabPanel>
                                    <CustomTabPanel value={value} index={1} className='tabContentContainer'>
                                        <DraftList
                                            draftData={draftListData}
                                            deleteDataPopulate={e => handleDeleteDraft(e)}
                                            editDataPopulate={e => handleEditDraftData(e)}
                                        />
                                        {draftListData ? <Pagination totalPages={totalPagesDraft} pageNo={pageValue} paginationSet={e => handlePagination(e)} /> : ''}
                                    </CustomTabPanel>
                                </Box>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {successModal && (
                <SuccessModal
                    handleSuccessClose={handleDeleteSuccessModalClose}
                    SuccessPopUp={successModal}
                    SuccessTitle={SuccessModalMsg}
                    // SuccessMsg={SuccessModalMsg}
                />
            )}
            {deleteModal && (
                <DeleteModal
                    handleDeleteClose={handleDeleteModalClose}
                    DeletePopUp={deleteModal}
                    DeleteModalTitle={DeleteModalTitle}
                    DeleteModalMsg={DeleteModalMsg}
                    handleDeleteConfirm={handleDeleteData}
                />
            )}
        </React.Fragment>
    );
}

export default ProductMaster;
