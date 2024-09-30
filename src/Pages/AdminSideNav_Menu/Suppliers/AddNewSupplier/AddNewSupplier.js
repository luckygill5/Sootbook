import React , {useEffect, useState} from "react";
import { ReactComponent as UserPlus } from '../../../../assets/images/user-plus.svg';
import { ReactComponent as ArrowLeft } from '../../../../assets/images/arrow-left.svg';
import { Input, Select } from '../../../../Components/common';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import "./AddNewSupplier.scss"


const addNewSupplierFormSchema = Yup.object({
    name: Yup.string().required('Product Name is required.'),
    contactNumber: Yup.string().required('Contact Number  is required.'),
    email: Yup.string().required('Email is required.'),
});

const addNewSupplierInitialValues = {
    // productCode: '',
    status: '',
    name: '',
    email: '',
    contactPersonName: '',
    contactNumber: '',
    country: '',
    city: '',
    zipCode: '',
    addressLine1: '',
    addressLine2: '',
    entryPort: '',
    minMargin: '',
    expireRecieve: '',
    creditTerms: '',
    licenseNumber: '',
    productType: '',
    trn: '',
    MOQ: '',
   
};

function AddNewSupplier({back}){

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } = useFormik({
        initialValues: addNewSupplierInitialValues,
        validationSchema: addNewSupplierFormSchema,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,
        onSubmit: (values, action) => {
            handleFormSubmit(values);
            // action.resetForm();
        },
    });

    const handleFormSubmit = async values => {
       console.log("submmit", values)
    };

    return(
        <React.Fragment>
            <div className="addNewSupplier_container">
            <div className='backLink'>
                <span className='link' onClick={back}>
                    <span className='icon'>
                        <ArrowLeft />
                    </span>
                    Back to Suppliers
                </span>
            </div>
            <div className="contentSection">
            <h1 className="title">Add New Supplier</h1>
            <form className="form_container">
                <div className="firstSection">
                        <div className="flexbox">
                        <div className="supplierCodeBox sm-30 lg-30">
                        <div className='inputBox supplierCode '>
                        <Input
                            label={'Supplier Code'}
                            type={'text'}
                            name={'code'}
                            id={'code'}
                            value={values.code}
                            wrapperClass={'col12'}
                            onChange={handleChange}
                            error={errors.code}
                            touched={touched.code}
                            ReadOnly={true}
                            disabled={true}
                        />
                    </div>
                      
                        </div>
                        <div className='inputBox sm-20 lg-15'>
                        <Select
                            label={'Status'}
                            name={'status'}
                            options={[
                                { id: 'Active', value: 'Active' },
                                { id: 'In Active', value: 'In Active' },
                            ]}
                            // isRequired
                            wrapperClass={'col12'}
                            value={values.status}
                            onChange={handleChange}
                            error={errors.status}
                            touched={touched.status}
                        />
                    </div> 
                    </div>
                
                </div>
                <div className="secondSection">
                <div className='inputBox sm-50 lg-50 '>
                        <Input
                            label={'Name'}
                            type={'text'}
                            name={'name'}
                            id={'name'}
                            value={values.name}
                            wrapperClass={'col12'}
                            onChange={handleChange}
                            error={errors.name}
                            touched={touched.name}
                        />
                    </div>  
                    <div className='inputBox sm-50 lg-50 '>
                        <Input
                            label={'Email'}
                            type={'text'}
                            name={'email'}
                            id={'name'}
                            value={values.email}
                            wrapperClass={'col12'}
                            onChange={handleChange}
                            error={errors.email}
                            touched={touched.email}
                        />
                    </div>  
                    <div className='inputBox sm-50 lg-50 '>
                        <Input
                            label={'Contact Person Name'}
                            type={'text'}
                            name={'contactPersonName'}
                            id={'contactPersonName'}
                            value={values.contactPersonName}
                            wrapperClass={'col12'}
                            onChange={handleChange}
                            error={errors.contactPersonName}
                            touched={touched.contactPersonName}
                        />
                    </div>  
                </div>
            </form>
            </div>
            </div>
        </React.Fragment>
    )
}

export default AddNewSupplier