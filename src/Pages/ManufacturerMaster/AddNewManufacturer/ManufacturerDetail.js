import React, { useEffect, useState } from 'react';
import locales from "../../../Constants/en.json";
import { Input, Select, SelectWithInput } from '../../../Components/common';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { axiosClient } from '../../../services/axiosClient';
import { ReactComponent as Info } from "../../../assets/images/info.svg";
import { ReactComponent as Barcode } from "../../../assets/images/sample-bar-code.svg";
import QRcode from "../../../assets/images/sample-qr-code.png";
import SuccessModal from '../../../Components/CommonSuccessModal/SuccessModal';
import ErrorModal from '../../../Components/CommonErrorModal/ErrorModal';
import classNames from 'classnames';
import "./AddNewManufacturer.scss"


const manufacturerDetailEditFormSchema = Yup.object({
    name: Yup.string().required('Name is required.'),
    email: Yup.string().required('Email is required.'),
    contactMobile: Yup.string().required('Contact Number is required.'),
});

const productDetailInitialValues = {

    name: "",
    code: "",
    status: 'active',
    email: "",
    contactName: "",
    contactMobile: "",
    address1: "",
    address2: "",
    country: "",
    city: "",
    postal: "",
    port: "",
    minMargin: "",
    expiry: "",
    creditTerm: "",
    licence: "",
    productType: "",
    trn: "",
    moq: "",
};

function ManufacturerDetail({ ProductCreateList,productTypelist, productDetailData, preview, previewData, back, productBackData,successModalClose }) {
    const [SuccessMsg, setSuccessMsg] = useState("");
    const [SuccessTitle, setSuccessTitle] = useState("");
    const [showLoader, setshowLoader] = useState(false);
    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
        useFormik({
            initialValues: productDetailInitialValues,
            validationSchema: manufacturerDetailEditFormSchema,
            validateOnChange: true,
            validateOnBlur: false,
            enableReinitialize: true,
            onSubmit: (values, action) => {
                handleFormSubmit(values);
                // action.resetForm();
            },
        });
        const [errorModal, setErrorModal] = useState(false);
        const [errorMsg, setErrorMsg] = useState("");
        const [updateClicked, SetUpdateClicked] = useState(false);
        const [addmanufacturerFormData, setAddmanufacturerFormData] = useState("")
        const [successModal, setSucessModal] = useState("");
        const [productAddAPIcall, setProductAddAPIcall] =  useState(false);
        const [formDisabled, setFormDisabled] = useState(true);


    const handleFormSubmit = async values => {
        delete values.createdAt;
        delete values.updatedAt;
        delete values.__v;
            if(previewData){
                handleEditProduct(values)
            }else{
                handleAddProduct(values);
            }
    };

    const  handleUpdateProduct = () => {
        handleAddProduct();
        SetUpdateClicked(true)


    }

    
    const handleAddProduct = async (values) => {

        if (values !== "") {
            const accessToken = `Bearer ${sessionStorage.accessToken} `
            try {
                let response = await axiosClient.post(
                    `admin/manufacturer/create`, values, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-via-device': true,
                        'Authorization': accessToken
                    },


                }

                );

                if (response.status == 200) {
                    // setProductCreateList( response?.data?.data)
                    setSucessModal(true);
                    SetUpdateClicked(false);
                    setAddmanufacturerFormData("");
                    setSuccessMsg("The product has been added into the system");
                    setSuccessTitle("Product has been added successfully")
                }

            } catch (error) {
                console.log("error", error);
                setErrorModal(true);
                setErrorMsg(error.response.data.message);
                setAddmanufacturerFormData("");

            }
        }



    }

    const handleSuccessPopupClose = () => {
        setSucessModal(false);
        successModalClose();
    }

    const handleModalErrorPopUP = () => {
        setErrorModal(false)
    }


    const handleEditProduct = async (values) => {
        if (values !== "") {
            const accessToken = `Bearer ${sessionStorage.accessToken} `
            try {
                let response = await axiosClient.post(
                    `admin/manufacturer/update`, values, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-via-device': true,
                        'Authorization': accessToken
                    },


                }

                );

                if (response.status == 200) {
                    // setProductCreateList( response?.data?.data)
                    setSucessModal(true);
                    SetUpdateClicked(false);
                    setAddmanufacturerFormData("");
                    setSuccessMsg("The product has been updated into the system");
                    setSuccessTitle("Product has been updated successfully")
                }

            } catch (error) {
                console.log("error", error);
                setErrorModal(true);
                setErrorMsg(error.response.data.message);
                setAddmanufacturerFormData("");

            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            if (previewData) {
                Object.entries(previewData).map((item) => {
                    setFieldValue(item[0], item[1]);
                    if (item[0] == 'packaging' && item[1].length > 0) {
                        item[1].map((data, index) => {
                            setFieldValue(`Sales_Packing_${index + 1}`, data.packType);
                            setFieldValue(`Quantity_${index + 1}`, data.quantity);
                            setFieldValue(`Rate_${index + 1}`, data.price);
                            setFieldValue(`Stock_${index + 1}`, data.stock);


                        })


                    }
                })
            }
            if (productBackData) {
                Object.entries(productBackData).map((item) => {
                    setFieldValue(item[0], item[1]);
                    if (item[0] == 'packaging' && item[1].length > 0) {
                        item[1].map((data, index) => {
                            setFieldValue(`Sales_Packing_${index + 1}`, data.packType);
                            setFieldValue(`Quantity_${index + 1}`, data.quantity);
                            setFieldValue(`Rate_${index + 1}`, data.price);
                            setFieldValue(`Stock_${index + 1}`, data.stock);


                        })


                    }
                })
            }
            setshowLoader(false)
        }, 700);
    }, [])


    return (
        <React.Fragment>
            <div className={`manufacturerDetail_container  ${preview ? 'preview_active' : ''}`}>
                <div className='first_flexbox'>
                    <div className='inputBox manufacturerCode sm-40 lg-50'>
                        <Input
                            label={'Manufacturer Code'}
                            type={'text'}
                            name={'manufacturerCode'}
                            id={'manufacturerCode'}
                            value={values.code}
                            wrapperClass={'col12'}
                            onChange={handleChange}
                            error={errors.code}
                            touched={touched.code}
                            ReadOnly={true}

                        />
                        <Select
                            label={'Status'}
                            name={'status'}
                            value={values.status?values.status:'Active'}
                            options={[
                                { id: 'true', value: 'Active' },
                                { id: 'false', value: 'Inactive' },
                            ]}
                            wrapperClass={'col6'}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='inputBox Product_Name sm-40 lg-50'>
                        <Input
                            label={'Name'}
                            type={'text'}
                            name={'name'}
                            id={'Name'}
                            value={values.name}
                            wrapperClass={'col12'}
                            onChange={handleChange}
                            error={errors.name}
                            touched={touched.name}
                            ReadOnly={preview ? true : false}
                            isRequired
                        />
                        <Input
                            label={'Email'}
                            type={'text'}
                            name={'email'}
                            id={'email'}
                            placeholder={'Email'}
                            value={values.email}
                            error={errors.email}
                            touched={touched.email}
                            wrapperClass={'col6'}
                            onChange={handleChange}
                            isRequired
                        />
                    </div>
                    <div className='inputBox Product_Name sm-40 lg-50'>
                        <Input
                            label={'Contact Person Name'}
                            type={'text'}
                            name={'contactName'}
                            id={'contactName'}
                            value={values.contactName}
                            wrapperClass={'col12'}
                            onChange={handleChange}
                            error={errors.contactName}
                            touched={touched.contactName}
                            ReadOnly={preview ? true : false}
                        />
                        <Input
                            label={'Contact Number'}
                            // selectName={'country'}
                            // options={[
                            //     { id: 'India', value: 'IND' },
                            //     { id: 'USA', value: 'USA' },
                            //     { id: 'England', value: 'ENG' },
                            // ]}
                            type={'text'}
                            name={'contactMobile'}
                            id={'contactMobile'}
                            value={values.contactMobile}
                            wrapperClass={'col12'}
                            onChange={handleChange}
                            error={errors.contactMobile}
                            touched={touched.contactMobile}
                            ReadOnly={preview ? true : false}
                        />
                    </div>
                </div>
                <div className='second_flexbox'>
                    <div className={`rightCol ${preview && 'preview'}`}>
                    <h5 className='title'>Address</h5>
                        <div className='inputBox Product_Name sm-60 lg-70'>
                            <Select
                                label={'Country'}
                                name={'country'}
                                options={
                                    ProductCreateList &&
                                    ProductCreateList.country.length > 0 &&
                                    ProductCreateList.country.map((item) => {
                                        return (

                                            { id: item._id, value: item.name }

                                        )
                                    })
                                }
                                // isRequired
                                wrapperClass={'col12'}
                                value={values.country}
                                onChange={handleChange}
                                error={errors.country}
                                touched={touched.country}
                                disabled={preview ? true : false}
                            />

                            <Input
                                label={"City"}
                                type={"text"}
                                name={"city"}
                                id={"city"}
                                wrapperClass={"col6"}
                                value={values.city}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Input
                                label={"Zip Code / Postal Code"}
                                type={"text"}
                                name={"postal"}
                                id={"postal"}
                                wrapperClass={"col6"}
                                value={values.postal}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        <div className='inputBox Product_Name sm-60 lg-70'>
                            <Input
                                label={"Address Line 1"}
                                type={"text"}
                                name={"address1"}
                                id={"address1"}
                                wrapperClass={"col6"}
                                value={values.address1}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Input
                                label={"Address Line 2"}
                                type={"text"}
                                name={"address2"}
                                id={"address2"}
                                wrapperClass={"col6"}
                                value={values.address2}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                    </div>
                </div>
                 <div className='third_flexbox'>
                    <div className='leftCol'>
                        <h5 className='title'>Additonal Information</h5>
                        <div className='flexbox'>
                            <div className='inputBox sm-30 lg-80'>
                                <Input
                                    label={'Port of Entry'}
                                    type={'text'}
                                    name={'port'}
                                    id={'port'}
                                    value={values.port}
                                    wrapperClass={'col12'}
                                    onChange={handleChange}
                                    ReadOnly={preview ? true : false}
                                    placeholder={preview && values.port == "" ? '-' : "Please type"}
                                    
                                />
                                  <Input
                                    label={'Minimum Margin'}
                                    type={'text'}
                                    name={'minMargin'}
                                    id={'minMargin'}
                                    value={values.minMargin}
                                    wrapperClass={'col12'}
                                    onChange={handleChange}
                                    ReadOnly={preview ? true : false}
                                    placeholder={preview && values.minMargin == "" ? '-' : "Please type"}
                                />
                                  <Input
                                    label={'Expiry Receive Upto'}
                                    type={'text'}
                                    name={'expiry'}
                                    id={'expiry'}
                                    value={values.expiry}
                                    wrapperClass={'col12'}
                                    onChange={handleChange}
                                    ReadOnly={preview ? true : false}
                                    placeholder={preview && values.expiry == "" ? '-' : "Please type"}
                                />
                                <Input
                                    label={'Credit Terms'}
                                    type={'text'}
                                    name={'creditTerm'}
                                    id={'creditTerm'}
                                    value={values.creditTerm}
                                    wrapperClass={'col12'}
                                    onChange={handleChange}
                                    ReadOnly={preview ? true : false}
                                    placeholder={preview && values.creditTerm == "" ? '-' : "Please type"}
                                />
                            </div>
                            <div className='inputBox sm-30 lg-80'>
                                <Input
                                    label={'License Number'}
                                    type={'text'}
                                    name={'licence'}
                                    id={'licence'}
                                    value={values.licence}
                                    wrapperClass={'col12'}
                                    onChange={handleChange}
                                    ReadOnly={preview ? true : false}
                                    placeholder={preview && values.licence == "" ? '-' : "Please type"}
                                    
                                />
                                <Select
                                label={'Product Type'}
                                name={'productType'}
                                options={
                                    productTypelist &&
                                    productTypelist.length > 0 &&
                                    productTypelist.map((item) => {
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
                                disabled={preview ? true : false}
                            />
                                  <Input
                                    label={'TRN'}
                                    type={'text'}
                                    name={'trn'}
                                    id={'trn'}
                                    value={values.trn}
                                    wrapperClass={'col12'}
                                    onChange={handleChange}
                                    ReadOnly={preview ? true : false}
                                    placeholder={preview && values.trn == "" ? '-' : "Please type"}
                                />
                                <Input
                                    label={'MOQ (minimal Order Quantity)'}
                                    type={'text'}
                                    name={'moq'}
                                    id={'moq'}
                                    value={values.moq}
                                    wrapperClass={'col12'}
                                    onChange={handleChange}
                                    ReadOnly={preview ? true : false}
                                    placeholder={preview && values.moq == "" ? '-' : "Please type"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bottom_actions'>
                            <button className='cancelBtn' onClick={() => back()}>
                                {locales.cancel_label}
                            </button>
                            <button type='button' className='saveBtn' onClick={handleSubmit}> {locales.save_label}</button>
                        </div>
            </div>
            {
                successModal &&
                <SuccessModal
                    handleSuccessClose={handleSuccessPopupClose}
                    SuccessPopUp={successModal}
                    SuccessMsg={SuccessMsg}
                    SuccessTitle={SuccessTitle}
                />
            }
            {errorModal && (
                <ErrorModal
                    handleErrorClose={handleModalErrorPopUP}
                    ErrorPopUp={errorModal}
                    ErrorMsg={errorMsg}
                />
            )}
        </React.Fragment>
    )

}

export default ManufacturerDetail;