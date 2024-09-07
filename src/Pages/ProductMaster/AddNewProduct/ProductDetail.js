import React, { useState } from 'react';
import locales from "../../../Constants/en.json";
import { Input, Select } from '../../../Components/common';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {ReactComponent as Info} from  "../../../assets/images/info.svg"
import "./AddNewProduct.scss"


const productDetailInitialValues = {
    Product_Code: '',
    Category: '',
    Product_Name: '',
    Generic_Name:"",
    Manufacturer:"",
    Supplier:"",
    Dispensing_Mode : "",
    Rack:"",
    Bar_Code:"",
    Order_Level:"",
    Min_order:"",
    Max_order:"",
    Buy_Rate:"",
    MRP:"",
    Profit:"",
    Net_price:"",
    Inv_Rate:"",
    VAT:"",
    Sales_Packing:"",
    Quantity:"",
    Rate:"",
    Standart_Exp_Duration:"",
    Weight:"",
    Storage_Condition:"",
    Returnable_status:"",

};

function ProductDetail() {


    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
        useFormik({
            initialValues: productDetailInitialValues,
            // validationSchema: addUserEditFormSchema,
            validateOnChange: true,
            validateOnBlur: false,
            enableReinitialize: true,
            onSubmit: (values, action) => {
                handleFormSubmit(values);
                action.resetForm();
            },
        });


    const handleFormSubmit = async values => {

    };

    return (
        <div className='productDetail_container'>
            <div className='first_flexbox'>
                <div className='inputBox sm-20 lg-15'>
                    <Input
                        label={'Product Code'}
                        type={'text'}
                        name={'Product_Code'}
                        id={'Product_Code'}
                        value={values.Product_Code}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-20 lg-15'>
                    <Select
                        label={'Category'}
                        name={'Category'}
                        options={[
                            { id: 'IND', value: 'IND' },
                            { id: 'USA', value: 'USA' },
                            { id: 'ENG', value: 'ENG' },
                        ]}
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.Category}
                        onChange={handleChange}
                        error={errors.Category}
                        touched={touched.Category}
                    />
                </div>
                <div className='inputBox sm-40 lg-50'>
                    <Input
                        label={'Product Name'}
                        type={'text'}
                        name={'Product_Name'}
                        id={'Product_Name'}
                        value={values.Product_Name}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={'Generic Name'}
                        type={'text'}
                        name={'Generic_Name'}
                        id={'Generic_Name'}
                        value={values.Generic_Name}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-25 lg-25'>
                    <Select
                        label={'Manufacturer'}
                        name={'Manufacturer'}
                        options={[
                            { id: 'IND', value: 'IND' },
                            { id: 'USA', value: 'USA' },
                            { id: 'ENG', value: 'ENG' },
                        ]}
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.Manufacturer}
                        onChange={handleChange}
                        error={errors.Manufacturer}
                        touched={touched.Manufacturer}
                    />
                </div>
                <div className='inputBox sm-25 lg-25'>
                    <Select
                        label={'Supplier'}
                        name={'Supplier'}
                        options={[
                            { id: 'IND', value: 'IND' },
                            { id: 'USA', value: 'USA' },
                            { id: 'ENG', value: 'ENG' },
                        ]}
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.Supplier}
                        onChange={handleChange}
                        error={errors.Supplier}
                        touched={touched.Supplier}
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Select
                        label={'Dispensing Mode'}
                        name={'Dispensing_Mode'}
                        options={[
                            { id: 'IND', value: 'IND' },
                            { id: 'USA', value: 'USA' },
                            { id: 'ENG', value: 'ENG' },
                        ]}
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.Dispensing_Mode}
                        onChange={handleChange}
                        error={errors.Dispensing_Mode}
                        touched={touched.Dispensing_Mode}
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={'Rack'}
                        type={'text'}
                        name={'Rack'}
                        id={'Rack'}
                        value={values.Rack}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-10 lg-10'>
                    <Input
                        label={'Shelf'}
                        type={'text'}
                        name={'Shelf'}
                        id={'Shelf'}
                        value={values.Shelf}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className='second_flexbox'>
                <div className='leftCol'>
                    <div className='qrCodeFlexBox'>
                        <div className='leftCol'>
                        <h5 className='title'>QR Code <span className='icon'><Info/></span></h5>
                        <ul className='qrcodeinfo_list'>
                            <li>When clicking on “Scan QR code” point your camera at the QR code.</li>
                            <li>When clicking on “Auto generate” a new generated QR code will be displayed.</li>
                        </ul>
                        </div>
                        <div className='rightCol'>
                            <div className='actions'>
                                <button type='button' className='autoBtn'>Auto generate</button>
                                <button type='button' className='scanBtn'>Scan QR Code</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='rightCol'>
                <div className='inputBox sm-40 lg-40'>
                    <Input
                        label={'Bar Code'}
                        type={'text'}
                        name={'Bar_Code'}
                        id={'title'}
                        value={values.Bar_Code}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={'Order Level'}
                        type={'text'}
                        name={'Order_Level'}
                        id={'title'}
                        value={values.Order_Level}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={'Min order'}
                        type={'text'}
                        name={'Min_order'}
                        id={'title'}
                        value={values.Min_order}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={'Max order'}
                        type={'text'}
                        name={'Max_order'}
                        id={'title'}
                        value={values.Max_order}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                </div>
            </div>
            <div className='third_flexbox'>
                <div className='leftCol'>
                    <h5 className='title'>Pricing</h5>
                    <div className='flexbox'>
                    <div className='inputBox sm-30 lg-30'>
                    <Input
                        label={'Buy Rate'}
                        type={'text'}
                        name={'Buy_Rate'}
                        id={'Buy_Rate'}
                        value={values.Buy_Rate}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                    <Input
                        label={'MRP'}
                        type={'text'}
                        name={'MRP'}
                        id={'MRP'}
                        value={values.MRP}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                    <Input
                        label={'Profit %'}
                        type={'text'}
                        name={'Profit'}
                        id={'Profit'}
                        value={values.Profit}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                    <Input
                        label={'Net price '}
                        type={'text'}
                        name={'Net_price '}
                        id={'Net_price'}
                        value={values.Net_price}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                    <Input
                        label={'Inv Rate'}
                        type={'text'}
                        name={'Inv_Rate'}
                        id={'Inv_Rate'}
                        value={values.Inv_Rate}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                    <Input
                        label={'VAT %'}
                        type={'text'}
                        name={'VAT'}
                        id={'VAT'}
                        value={values.VAT}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                    </div>
                </div>
                <div className='rightCol'>
                <h5 className='title'>Packaging</h5>
                <div className='flexbox'>
                <div className='inputBox sm-30 lg-30'>
                     <Select
                        label={'Sales Packing'}
                        name={'Sales_Packing'}
                        options={[
                            { id: 'IND', value: 'IND' },
                            { id: 'USA', value: 'USA' },
                            { id: 'ENG', value: 'ENG' },
                        ]}
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.Sales_Packing}
                        onChange={handleChange}
                        error={errors.Sales_Packing}
                        touched={touched.Sales_Packing}
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={'Quantity'}
                        type={'text'}
                        name={'Quantity'}
                        id={'Quantity'}
                        value={values.Quantity}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={'Rate'}
                        type={'text'}
                        name={'Rate'}
                        id={'Rate'}
                        value={values.Rate}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={'Stock'}
                        type={'text'}
                        name={'Stock'}
                        id={'Stock'}
                        value={values.Stock}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                     <Select
                        label={''}
                        name={'Sales_Packing'}
                        options={[
                            { id: 'IND', value: 'IND' },
                            { id: 'USA', value: 'USA' },
                            { id: 'ENG', value: 'ENG' },
                        ]}
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.Sales_Packing}
                        onChange={handleChange}
                        error={errors.Sales_Packing}
                        touched={touched.Sales_Packing}
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={''}
                        type={'text'}
                        name={'Quantity'}
                        id={'Quantity'}
                        value={values.Quantity}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={''}
                        type={'text'}
                        name={'Rate'}
                        id={'Rate'}
                        value={values.Rate}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={''}
                        type={'text'}
                        name={'Stock'}
                        id={'Stock'}
                        value={values.Stock}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                     <Select
                        label={''}
                        name={'Sales_Packing'}
                        options={[
                            { id: 'IND', value: 'IND' },
                            { id: 'USA', value: 'USA' },
                            { id: 'ENG', value: 'ENG' },
                        ]}
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.Sales_Packing}
                        onChange={handleChange}
                        error={errors.Sales_Packing}
                        touched={touched.Sales_Packing}
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={''}
                        type={'text'}
                        name={'Quantity'}
                        id={'Quantity'}
                        value={values.Quantity}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={''}
                        type={'text'}
                        name={'Rate'}
                        id={'Rate'}
                        value={values.Rate}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={''}
                        type={'text'}
                        name={'Stock'}
                        id={'Stock'}
                        value={values.Stock}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                </div>
                </div>
            </div>
            <div className='bottom_flexbox'>
                <div className='leftCol'>
                <div className='inputBox sm-30 lg-30'>
                    <Input
                        label={'Standart Exp Duration'}
                        type={'text'}
                        name={'Standart_Exp_Duration'}
                        id={'Standart_Exp_Duration'}
                        value={values.Standart_Exp_Duration}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                    <Select
                        label={'Insurance Status'}
                        name={'Insurance_Status'}
                        options={[
                            { id: 'IND', value: 'IND' },
                            { id: 'USA', value: 'USA' },
                            { id: 'ENG', value: 'ENG' },
                        ]}
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.Insurance_Status}
                        onChange={handleChange}
                        error={errors.Insurance_Status}
                        touched={touched.Insurance_Status}
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                    <Input
                        label={'Weight'}
                        type={'text'}
                        name={'Weight'}
                        id={'Weight'}
                        value={values.Weight}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                    <Input
                        label={'Storage Condition'}
                        type={'text'}
                        name={'Storage_Condition'}
                        id={'Storage_Condition'}
                        value={values.Storage_Condition}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                    <Select
                        label={'Returnable status'}
                        name={'Returnable_status'}
                        options={[
                            { id: 'IND', value: 'IND' },
                            { id: 'USA', value: 'USA' },
                            { id: 'ENG', value: 'ENG' },
                        ]}
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.Returnable_status}
                        onChange={handleChange}
                        error={errors.Returnable_status}
                        touched={touched.Returnable_status}
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                    <Input
                        label={'Strength'}
                        type={'text'}
                        name={'Strength'}
                        id={'Strength'}
                        value={values.Strength}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                </div>
            </div>
            <div className='actionFlexbox'>
                <button type='button' className='draftBtn'>Save Draft</button>
                <div className='rightCol'>
                <button type='button' className='canceltBtn'>Cancel</button>
                <button type='button' className='nextBtn'>Next</button> 
                </div>
            </div>
        </div>
    )

}

export default ProductDetail;