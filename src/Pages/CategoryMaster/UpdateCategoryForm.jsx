import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { add, isEmpty } from 'lodash';
import swal from 'sweetalert';
import { Input, Select } from '../../Components/common';
import { createCategory, updateCategoryDetails } from '../../services/categoryMaster.service';

const addUserEditFormSchema = Yup.object({
    name: Yup.string().required('Name is required.'),
});

const addCategoryInitialValues = {
    name: '',
    categoryId: '',
    masterCategory: null,
};

const UpdateCategoryForm = ({ editCategory = null, categoryMap, toggleShowUpdateForm, setEditCategory, selectedL1 }) => {
    let isEditMode = false;
    const [categoryList, setCategoryList] = useState(Object.values(categoryMap));

    if (!isEmpty(editCategory)) {
        isEditMode = true;
        addCategoryInitialValues.name = !!editCategory.name ? editCategory.name : editCategory.value;
        if (editCategory.level === 2) {
            addCategoryInitialValues.masterCategory = editCategory?.parent;
        } else if (editCategory.level === 3) {
            addCategoryInitialValues.masterCategory = selectedL1;
            addCategoryInitialValues.categoryId = editCategory?.parent;
        }
    }

    const { values, handleChange, handleSubmit, errors, touched, resetForm } = useFormik({
        initialValues: addCategoryInitialValues,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,
        onSubmit: (values, action) => {
            console.log({ values });
            if (isEditMode) {
                updateCategory(values);
            } else {
                registerCategory(values);
            }
            setTimeout(() => {
                toggleShowUpdateForm();
                action.resetForm();
                setEditCategory(null);
            }, 500);
        },
    });

    const registerCategory = async values => {
        createCategory(values)
            .then(response => {
                if (response && response.status == true) {
                    swal('Success', 'Category created successfully!', 'success', {
                        buttons: false,
                        timer: 2000,
                    });
                } else if (response && response.status == false) {
                    swal('Failed', `Error creating Category: ${response.message}`, 'error');
                }
            })
            .catch(error => {
                swal('Failed', `Error creating Category: ${error}`, 'error');
            });
    };

    const updateCategory = async values => {
        values.id = editCategory?._id || editCategory?.id;
        updateCategoryDetails(values)
            .then(response => {
                if (response && response.status == true) {
                    swal('Success', 'Category updated successfully!', 'success', {
                        buttons: false,
                        timer: 2000,
                    }).then(() => {
                        setEditCategory(null);
                        toggleShowUpdateForm();
                    });
                } else if (response && response.status == false) {
                    swal('Failed', `Error updating Category: ${response.message}`, 'error');
                }
            })
            .catch(error => {
                swal('Failed', `Error updating Category: ${error}`, 'error');
            });
    };

    return (
        <div className='categoryFormContainer'>
            <div className='formHeader'>
                <h2 className='title'>{isEditMode ? 'Edit' : 'Add New'} Category</h2>
                <h3 className='subTitle'>
                    {editCategory?.level === 1
                        ? "The name of Category Level 1 will be updated after clicking the 'Save' button."
                        : editCategory?.level === 2
                          ? "The name of Category Level 2 will be updated, and it can be moved to another category after clicking the 'Save' button."
                          : editCategory?.level === 3
                            ? "The name of Category Level 3 will be updated, and it can be moved to another categories after clicking the 'Save' button."
                            : 'To move this category to different levels, use the dropdowns to select or remove parent categories.'}
                </h3>
            </div>
            <form className='form_container' onSubmit={handleSubmit}>
                {isEditMode && editCategory.level === 1 ? null : (
                    <Select
                        label={'Category Level 1'}
                        name={'masterCategory'}
                        options={categoryList}
                        wrapperClass={'col4'}
                        value={values.masterCategory}
                        onChange={handleChange}
                    />
                )}

                {isEditMode && (editCategory.level === 1 || editCategory.level === 2) ? null : (
                    <Select
                        label={'Category Level 2'}
                        name={'categoryId'}
                        options={categoryMap[values.masterCategory || selectedL1]?.childCategory}
                        wrapperClass={'col4'}
                        value={values.categoryId}
                        onChange={handleChange}
                    />
                )}
                <Input
                    label={'Name'}
                    type={'text'}
                    name={'name'}
                    id={'name'}
                    isRequired
                    wrapperClass={'col4'}
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name}
                    touched={touched.name}
                />
                {!isEditMode && (
                    <ul className='addFormGuide'>
                        <li>
                            <span>Main Category (Level 1)</span>: Enter a name without selecting from the dropdowns to create a Main Category.
                        </li>
                        <li>
                            <span>Category Level 1</span>: Select a category from "Category Level 1," then enter a name to create a subcategory under
                            Level 1.
                        </li>
                        <li>
                            <span>Category Level 1</span>: Select both "Category Level 1" and "Category Level 2," then enter a name to create a
                            sub-subcategory under Level 2.
                        </li>
                    </ul>
                )}
                <div className='bottom_actions'>
                    <button
                        className='cancelBtn'
                        onClick={() => {
                            setEditCategory(null);
                            toggleShowUpdateForm();
                            resetForm();
                        }}
                    >
                        Cancel
                    </button>
                    <button className={'saveBtn'}>Save</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateCategoryForm;
