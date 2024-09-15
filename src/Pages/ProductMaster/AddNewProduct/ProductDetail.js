import React, { useEffect, useState } from 'react';
import locales from "../../../Constants/en.json";
import { Input, Select } from '../../../Components/common';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { axiosClient } from '../../../services/axiosClient';
import {ReactComponent as Info} from  "../../../assets/images/info.svg"
import "./AddNewProduct.scss"


const productDetailEditFormSchema = Yup.object({
    name: Yup.string().required('Product Name is required.'),
    productType : Yup.string().required('Product Type is required.'),
    manufacturer: Yup.string().required('Manufacturer is required.'),
});

const productDetailInitialValues = {
    // productCode: '',
    productType: '',
    name: '',
    genericName:"",
    manufacturer:"",
    supplier:"",
    dispensingMode : "",
    rack:"",
    barcode:"",
    orderLevel:"",
    minOrder:"",
    maxOrder:"",
    buyingPrice:"",
    mrp:"",
    profit:"",
    netPrice:"",
    invPrice:"",
    vat:"",
    shelf:"",
    strength:"",
    Sales_Packing_1:"",
    Sales_Packing_2:"",
    Sales_Packing_3:"",
    Quantity_1:"",
    Quantity_2:"",
    Quantity_3:"",
    Rate_1:"",
    Rate_2:"",
    Rate_3:"",
    Stock_1:"",
    Stock_2:"",
    Stock_3:"",
    expDuration:"",
    weight:"",
    storageCondition:"",
    returnable:"",
    isInsurance:""

};

function ProductDetail({changeTab,ProductCreateList, productDetailData, preview, previewData}) {

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
        useFormik({
            initialValues: productDetailInitialValues,
            validationSchema: productDetailEditFormSchema,
            validateOnChange: true,
            validateOnBlur: false,
            enableReinitialize: true,
            onSubmit: (values, action) => {
                handleFormSubmit(values);
                action.resetForm();
            },
        });


    const handleFormSubmit = async values => {
        productDetailData(values)
        changeTab(1)
    };
    
    useEffect(() => {
        if(previewData){
        Object.entries(previewData).map((item) => {
            setFieldValue(item[0], item[1]);
            if(item[0] == 'packaging' && item[1].length > 0 ){
                item[1].map((data,index) => {
                    setFieldValue( `Sales_Packing_${index+1}` , data.packType);  
                    setFieldValue( `Quantity_${index+1}` , data.quantity);
                    setFieldValue( `Rate_${index+1}` , data.price);
                    setFieldValue( `Stock_${index+1}` , data.stock);
                      
                    
                })


            }
        })
        }

    }, [])

    const handleDraft = () => {
        // changeTab(1)
      addProduct()
    }

    const addProduct = async event => {
        const {__v, _id, vendor, packaging, productCode, status, createdBy, updatedBy, createdAt, updatedAt,   ...newpreviewData} = previewData
        const collection = { ...newpreviewData, isDraft: true };
            const accessToken = `Bearer ${sessionStorage.accessToken} `
            try {
                let response = await axiosClient.post(
                    `admin/product/create`, collection, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-via-device': true,
                        'Authorization': accessToken
                    },


                }

                );

                if (response.status == 200) {
                    // setProductCreateList( response?.data?.data)
                    // setSucessModal(true)
                    console.log("statuss", response)
                }

            } catch (error) {
                console.log("error", error);
                // setErrorModal(true);
                // setErrorMsg(error.response.data.message)

            }
        


    }
    

    return (
        <div className={`productDetail_container  ${preview ? 'preview_active' : ''}`}>
            <div className='first_flexbox'>
                <div className='inputBox sm-20 lg-15'>
                    <Input
                        label={'Product Code'}
                        type={'text'}
                        name={'productCode'}
                        id={'productCode'}
                        value={values.productCode}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.productCode}
                        touched={touched.productCode}
                        ReadOnly={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-20 lg-15'>
                    <Select
                        label={'Product Type'}
                        name={'productType'}
                        options={
                            
                            ProductCreateList &&
                            ProductCreateList.productType.length > 0 &&
                            ProductCreateList.productType.map((item) => {
                                return (
                                    
                                    { id: item._id, value: item.name }
                                    
                                )  
                            })
                            
                           }
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.productType}
                        onChange={handleChange}
                        error={errors.productType}
                        touched={touched.productType}
                        Disabled={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-40 lg-50'>
                    <Input
                        label={'Product Name'}
                        type={'text'}
                        name={'name'}
                        id={'Product_Name'}
                        value={values.name}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.name}
                        touched={touched.name}
                        ReadOnly={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={'Generic Name'}
                        type={'text'}
                        name={'genericName'}
                        id={'genericName'}
                        value={values.genericName}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        ReadOnly={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-25 lg-25'>
                    <Select
                        label={'Manufacturer'}
                        name={'manufacturer'}
                        options={
                            ProductCreateList &&
                            ProductCreateList.manufacturer.length > 0 &&
                            ProductCreateList.manufacturer.map((item) => {
                                return (
                                    
                                    { id: item._id, value: item.name }
                                    
                                )  
                            })
                        }
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.manufacturer}
                        onChange={handleChange}
                        error={errors.manufacturer}
                        touched={touched.manufacturer}
                        Disabled={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-25 lg-25'>
                    <Select
                        label={'Supplier'}
                        name={'supplier'}
                        options={
                            ProductCreateList &&
                            ProductCreateList.supplier.length > 0 &&
                            ProductCreateList.supplier.map((item) => {
                                return (
                                    
                                    { id: item._id, value: item.name }
                                    
                                )  
                            })
                        }
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.supplier}
                        onChange={handleChange}
                        error={errors.supplier}
                        touched={touched.supplier}
                        Disabled={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Select
                        label={'Dispensing Mode'}
                        name={'dispensingMode'}
                        options={[
                            { id: 'Tablet', value: 'Tablet' },
                            { id: 'Strip', value: 'Strip' },
                            { id: 'Box', value: 'Box' },
                        ]}
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.dispensingMode}
                        onChange={handleChange}
                        error={errors.dispensingMode}
                        touched={touched.dispensingMode}
                        Disabled={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={'Rack'}
                        type={'text'}
                        name={'rack'}
                        id={'rack'}
                        value={values.rack}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        ReadOnly={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-10 lg-10'>
                    <Input
                        label={'Shelf'}
                        type={'text'}
                        name={'shelf'}
                        id={'shelf'}
                        value={values.shelf}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        ReadOnly={preview ? true :false }
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
                        name={'barcode'}
                        id={'title'}
                        value={values.barcode}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={'Order Level'}
                        type={'text'}
                        name={'orderLevel'}
                        id={'title'}
                        value={values.orderLevel}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={'Min order'}
                        type={'text'}
                        name={'minOrder'}
                        id={'title'}
                        value={values.minOrder}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={'Max order'}
                        type={'text'}
                        name={'maxOrder'}
                        id={'title'}
                        value={values.maxOrder}
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
                        name={'buyingPrice'}
                        id={'buyingPrice'}
                        value={values.buyingPrice}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        ReadOnly={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                    <Input
                        label={'MRP'}
                        type={'text'}
                        name={'mrp'}
                        id={'mrp'}
                        value={values.mrp}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        ReadOnly={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                    <Input
                        label={'Profit %'}
                        type={'text'}
                        name={'profit'}
                        id={'profit'}
                        value={values.profit}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        ReadOnly={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                    <Input
                        label={'Net price '}
                        type={'text'}
                        name={'netPrice'}
                        id={'netPrice'}
                        value={values.netPrice}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        ReadOnly={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                    <Input
                        label={'Inv Rate'}
                        type={'text'}
                        name={'invPrice'}
                        id={'invPrice'}
                        value={values.invPrice}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        ReadOnly={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                    <Input
                        label={'VAT %'}
                        type={'text'}
                        name={'vat'}
                        id={'vat'}
                        value={values.vat}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        ReadOnly={preview ? true :false }
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
                        name={'Sales_Packing_1'}
                        options={[
                            { id: 'Tablet', value: 'Tablet' },
                            { id: 'Box', value: 'Box' },
                            { id: 'Strip', value: 'Strip' },
                        ]}
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.Sales_Packing_1}
                        onChange={handleChange}
                        error={errors.Sales_Packing_1}
                        touched={touched.Sales_Packing_1}
                        Disabled={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={'Quantity'}
                        type={'text'}
                        name={'Quantity_1'}
                        id={'Quantity_1'}
                        value={values.Quantity_1}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        ReadOnly={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={'Rate'}
                        type={'text'}
                        name={'Rate_1'}
                        id={'Rate_1'}
                        value={values.Rate_1}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        ReadOnly={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={'Stock'}
                        type={'text'}
                        name={'Stock_1'}
                        id={'Stock_1'}
                        value={values.Stock_1}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        ReadOnly={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                     <Select
                        label={''}
                        name={'Sales_Packing_2'}
                        options={[
                            { id: 'Tablet', value: 'Tablet' },
                            { id: 'Box', value: 'Box' },
                            { id: 'Strip', value: 'Strip' },
                        ]}
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.Sales_Packing_2}
                        onChange={handleChange}
                        error={errors.Sales_Packing_2}
                        touched={touched.Sales_Packing_2}
                        Disabled={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={''}
                        type={'text'}
                        name={'Quantity_2'}
                        id={'Quantity_2'}
                        value={values.Quantity_2}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        ReadOnly={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={''}
                        type={'text'}
                        name={'Rate_2'}
                        id={'Rate_2'}
                        value={values.Rate_2}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        ReadOnly={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={''}
                        type={'text'}
                        name={'Stock_2'}
                        id={'Stock_2'}
                        value={values.Stock_2}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        ReadOnly={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                     <Select
                        label={''}
                        name={'Sales_Packing_3'}
                        options={[
                            { id: 'Tablet', value: 'Tablet' },
                            { id: 'Box', value: 'Box' },
                            { id: 'Strip', value: 'Strip' },
                        ]}
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.Sales_Packing_3}
                        onChange={handleChange}
                        error={errors.Sales_Packing_3}
                        touched={touched.Sales_Packing_3}
                        Disabled={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={''}
                        type={'text'}
                        name={'Quantity_3'}
                        id={'Quantity_3'}
                        value={values.Quantity_3}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        ReadOnly={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={''}
                        type={'text'}
                        name={'Rate_3'}
                        id={'Rate_3'}
                        value={values.Rate_3}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        ReadOnly={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-20 lg-20'>
                    <Input
                        label={''}
                        type={'text'}
                        name={'Stock_3'}
                        id={'Stock_3'}
                        value={values.Stock_3}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        ReadOnly={preview ? true :false }
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
                        name={'expDuration'}
                        id={'expDuration'}
                        value={values.expDuration}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        ReadOnly={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                    <Select
                        label={'Insurance Status'}
                        name={'isInsurance'}
                        options={[
                            { id: 'Covered', value: 'Covered' },
                            { id: 'Not Insured', value: 'Not Insured' },
                        ]}
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.isInsurance}
                        onChange={handleChange}
                        error={errors.isInsurance}
                        touched={touched.isInsurance}
                        Disabled={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                    <Input
                        label={'Weight'}
                        type={'text'}
                        name={'weight'}
                        id={'weight'}
                        value={values.weight}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        ReadOnly={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                    <Input
                        label={'Storage Condition'}
                        type={'text'}
                        name={'storageCondition'}
                        id={'storageCondition'}
                        value={values.storageCondition}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        ReadOnly={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                    <Select
                        label={'Returnable status'}
                        name={'returnable'}
                        options={[
                            { id: true, value: 'Yes' },
                            { id: false, value: 'No' },
                        ]}
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.returnable}
                        onChange={handleChange}
                        error={errors.returnable}
                        touched={touched.returnable}
                        Disabled={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                    <Input
                        label={'Strength'}
                        type={'text'}
                        name={'strength'}
                        id={'strength'}
                        value={values.strength}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        ReadOnly={preview ? true :false }
                    />
                </div>
                </div>
            </div>
            <div className='actionFlexbox'>
                <button type='button' className='draftBtn' onClick={handleDraft}>Save Draft</button>
                <div className='rightCol'>
                <button type='button' className='canceltBtn'>Cancel</button>
                <button type='button' className='nextBtn' onClick={handleSubmit}>Next</button> 
                </div>
            </div>
        </div>
    )

}

export default ProductDetail;