import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import UpdateCategoryForm from './UpdateCategoryForm';
import CategoryList from './CategoryList';
import { fetchCategoryList } from '../../services/categoryMaster.service';
import { ReactComponent as UserPlus } from '../../assets/images/user-plus.svg';
import { ReactComponent as CopyPlus } from '../../assets/images/copy-plus.svg';
import './CategoryMaster.scss';
import { COMPACT_DENSITY_FACTOR } from '@mui/x-data-grid';
import BulkUpload from '../../Components/BulkUpload/BulkUpload';

const CategoryMaster = ({breadcrumbUpdateData, updateBreadCrumb}) => {
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [categoryMap, setCategoryMap] = useState({});
    const [childCategoryMap, setChildCategoryMap] = useState({});
    const [selectedL1, setSelectedL1] = useState('');
    const [selectedL2, setSelectedL2] = useState('');
    const [editCategory, setEditCategory] = useState(null);
    const [showBulkUploadForm, setshowBulkUploadForm] = useState(false);
    const [breadcrumb, setBreadCrumb] = useState([...breadcrumbUpdateData]);

    const handleBack=()=>{
        let removeLastBreadcrumb = breadcrumb.filter((item) => {
            if (item !== 'Bulk Category Creation') {
                return item
            }
        });
        setBreadCrumb([...removeLastBreadcrumb]);
        setshowBulkUploadForm(!showBulkUploadForm);    
    }

    const getUpdatedData=()=>{
        getCategoryData(); 
    }

    
    useEffect(() => {
        updateBreadCrumb(breadcrumb)
    }, [breadcrumb]);

    
    const toggleShowUpdateForm = () => {
        setShowUpdateForm(!showUpdateForm);
    };

    const toggleBulkUpdateForm =()=>{
      setshowBulkUploadForm(!showBulkUploadForm);  
    }

    const getCategoryData = () => {
        try {
            fetchCategoryList()
                .then(res => {
                    if (res?.status) {
                        const categoryL1Map = {};
                        const categoryL2Map = {};
                        const categoryL3List = [];
                        res.data?.categories.forEach(cat => {
                            if (cat.level === 1) {
                                categoryL1Map[cat._id] = { id: cat._id, value: cat.name, level: cat.level, parent: '', childCategory: [] };
                            }
                            if (cat.level === 2) {
                                categoryL2Map[cat._id] = { id: cat._id, value: cat.name, level: cat.level, parent: cat.parent, childCategory: [] };
                            }
                            if (cat.level === 3) {
                                categoryL3List.push(cat);
                            }
                        });
                        categoryL3List.forEach(cat => {
                            categoryL2Map[cat.parent].childCategory.push(cat);
                        });
                        for (const cat in categoryL2Map) {
                            categoryL1Map[categoryL2Map[cat].parent].childCategory.push(categoryL2Map[cat]);
                        }
                        setChildCategoryMap(categoryL2Map);
                        setCategoryMap(categoryL1Map);
                    }
                })
                .catch(err => {
                    swal('Failed', `Error fetching categories list! \n Error Message: ${err}`, 'error');
                });
        } catch (error) {
            swal('Failed', `Error fetching categories list! \n Error Message: ${error}`, 'error');
        }
    };

    useEffect(() => {
        getCategoryData();
    }, [showUpdateForm]);
    console.log({ categoryMap });

    return (
        <div className='categoryMaster_container'>
            {showUpdateForm ? (
                <UpdateCategoryForm
                    editCategory={editCategory}
                    toggleShowUpdateForm={toggleShowUpdateForm}
                    setEditCategory={setEditCategory}
                    categoryMap={categoryMap}
                    selectedL1={selectedL1}
                />
            ): showBulkUploadForm ?(
                <BulkUpload breadcrumbUpdateData={breadcrumbUpdateData} updateBreadCrumb={updateBreadCrumb} back={handleBack} getUpdatedData={getUpdatedData}/>
            ) : (
                <div className='categoryMaster_content'>
                    <div className='headerFlexbox'>
                        <h2 className='title'>Categories</h2>
                        <span className='headerButtons'>
                            <button className='bulkUploadBtn' onClick={() => toggleBulkUpdateForm()}>
                                <span className='icon'>
                                    <CopyPlus />
                                </span>
                                Bulk Upload Categories
                            </button>
                            <button className='addnewCategoryBtn' onClick={() => toggleShowUpdateForm()}>
                                <span className='icon'>
                                    <UserPlus />
                                </span>
                                Add new category
                            </button>
                        </span>
                    </div>
                    <div className='contentSection'>
                        <CategoryList
                            listName={'Category Level 1'}
                            categoryList={categoryMap}
                            setSelected={setSelectedL1}
                            valueName={'value'}
                            selectedCat={selectedL1}
                            toggleShowUpdateForm={toggleShowUpdateForm}
                            setEditCategory={setEditCategory}
                        />
                        {selectedL1?.length > 0 && (
                            <CategoryList
                                listName={'Category Level 2'}
                                className={'level2'}
                                categoryList={categoryMap[selectedL1].childCategory}
                                setSelected={setSelectedL2}
                                valueName={'value'}
                                selectedCat={selectedL2}
                                toggleShowUpdateForm={toggleShowUpdateForm}
                                setEditCategory={setEditCategory}
                            />
                        )}
                        {selectedL2?.length > 0 && (
                            <CategoryList
                                listName={'Category Level 3'}
                                className={'level3'}
                                valueName={'name'}
                                categoryList={childCategoryMap[selectedL2].childCategory}
                                toggleShowUpdateForm={toggleShowUpdateForm}
                                setEditCategory={setEditCategory}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryMaster;
