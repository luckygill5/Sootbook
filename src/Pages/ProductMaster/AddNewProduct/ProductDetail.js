import React, { useEffect, useState } from 'react';
import locales from "../../../Constants/en.json";
import { Input, Select } from '../../../Components/common';
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
import "./AddNewProduct.scss"


const productDetailEditFormSchema = Yup.object({
    name: Yup.string().required('Product Name is required.'),
    productType: Yup.string().required('Product Type is required.'),
    manufacturer: Yup.string().required('Manufacturer is required.'),
});

const productDetailInitialValues = {
    // productCode: '',
    productType: '',
    name: '',
    genericName: "",
    manufacturer: "",
    supplier: "",
    dispensingMode: "",
    rack: "",
    barcode: "",
    orderLevel: "",
    minOrder: "",
    maxOrder: "",
    buyingPrice: "",
    mrp: "",
    profit: "",
    netPrice: "",
    invPrice: "",
    vat: "",
    shelf: "",
    strength: "",
    Sales_Packing_1: "",
    Sales_Packing_2: "",
    Sales_Packing_3: "",
    Quantity_1: "",
    Quantity_2: "",
    Quantity_3: "",
    Rate_1: "",
    Rate_2: "",
    Rate_3: "",
    Stock_1: "",
    Stock_2: "",
    Stock_3: "",
    expDuration: "",
    weight: "",
    storageCondition: "",
    returnable: false,
    isInsurance: ""

};

function ProductDetail({ changeTab, ProductCreateList, productDetailData, preview, previewData, back, productBackData, draftPopUpClose }) {

    const [draftClicked, setDraftClicked] = useState(false);
    const [draftsuccessModal, setDraftSuccessModal] = useState(false);
    const [SuccessMsg, setSuccessMsg] = useState("");
    const [SuccessTitle, setSuccessTitle] = useState("");
    const [showLoader, setshowLoader] = useState(false)
    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
        useFormik({
            initialValues: productDetailInitialValues,
            validationSchema: productDetailEditFormSchema,
            validateOnChange: true,
            validateOnBlur: false,
            enableReinitialize: true,
            onSubmit: (values, action) => {
                handleFormSubmit(values);
                // action.resetForm();
            },
        });


    const handleFormSubmit = async values => {
        if (draftClicked) {
            handleDraft(values)
        } else {
            productDetailData(values)
            changeTab(1)
        }

    };

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


    const handleDraft = (data) => {

        const Packaging = {
            packaging: [

                {
                    packType: data.Sales_Packing_1,
                    quantity: data.Quantity_1,
                    price: data.Rate_1,
                    stock: data.Stock_1,
                },
                {
                    packType: data.Sales_Packing_2,
                    quantity: data.Quantity_2,
                    price: data.Rate_2,
                    stock: data.Stock_2,
                },
                {
                    packType: data.Sales_Packing_3,
                    quantity: data.Quantity_3,
                    price: data.Rate_3,
                    stock: data.Stock_3,
                }

            ]
        }

        delete data.Sales_Packing_1;
        delete data.Sales_Packing_2;
        delete data.Sales_Packing_3;
        delete data.Quantity_1;
        delete data.Quantity_2;
        delete data.Quantity_3;
        delete data.Rate_1;
        delete data.Rate_2;
        delete data.Rate_3;
        delete data.Stock_1;
        delete data.Stock_2;
        delete data.Stock_3;
        const collection = { ...data, ...Packaging, isDraft: true };
        saveDraft(collection)
    }

    const saveDraft = async event => {
        const accessToken = `Bearer ${sessionStorage.accessToken} `
        try {
            let response = await axiosClient.post(
                `admin/product/create`, event, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-via-device': true,
                    'Authorization': accessToken
                },
            });

            if (response.status == 200) {
                setDraftClicked(false);
                setDraftSuccessModal(true);
                setSuccessTitle("Draft saved successfull")
            }

        } catch (error) {
            console.log("error", error);

        }



    }

    const handleDraftSuccessPopupClose = () => {
        draftPopUpClose()
    }

    return (
        <React.Fragment>
            <div className={`productDetail_container  ${preview ? 'preview_active' : ''}`}>
                <div className='first_flexbox'>
                    <div className='inputBox productCode sm-20 lg-15'>
                        <Input
                            label={'Product Code'}
                            type={'text'}
                            name={'productCode'}
                            id={'productCode'}
                            value={values.productCode}
                            wrapperClass={'col12'}
                            onChange={handleChange}
                            error={errors.productCode}
                            touched={touched.productCode}
                            ReadOnly={true}

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
                            isRequired
                            wrapperClass={'col12'}
                            value={values.productType}
                            onChange={handleChange}
                            error={errors.productType}
                            touched={touched.productType}
                            disabled={preview ? true : false}
                        />
                    </div>
                    <div className='inputBox Product_Name sm-40 lg-50'>
                        <Input
                            label={'Product Name'}
                            type={'text'}
                            name={'name'}
                            id={'Product_Name'}
                            value={values.name}
                            wrapperClass={'col12'}
                            onChange={handleChange}
                            error={errors.name}
                            touched={touched.name}
                            ReadOnly={preview ? true : false}
                            isRequired
                        />
                    </div>
                    <div className='inputBox genericName sm-20 lg-20'>
                        <Input
                            label={'Generic Name'}
                            type={'text'}
                            name={'genericName'}
                            id={'genericName'}
                            value={values.genericName}
                            wrapperClass={'col12'}
                            onChange={handleChange}
                            ReadOnly={preview ? true : false}
                            placeholder={preview && values.genericName == "" ? '-' : "Please type"}
                        />
                    </div>
                    <div className='inputBox manufacturer sm-25 lg-25'>
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
                            isRequired
                            wrapperClass={'col12'}
                            value={values.manufacturer}
                            onChange={handleChange}
                            error={errors.manufacturer}
                            touched={touched.manufacturer}
                            disabled={preview ? true : false}
                        />
                    </div>
                    <div className='inputBox supplier sm-25 lg-25'>
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
                            disabled={preview ? true : false}
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
                            disabled={preview ? true : false}
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
                            ReadOnly={preview ? true : false}
                            placeholder={preview && values.rack == "" ? '-' : "Please type"}
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
                            ReadOnly={preview ? true : false}
                            placeholder={preview && values.shelf == "" ? '-' : "Please type"}
                        />
                    </div>
                </div>
                <div className='second_flexbox'>
                    <div className={`leftCol ${preview && 'preview'}`}>
                        <div className='qrCodeFlexBox'>
                            <div className='leftCol'>
                                <h5 className='title'>QR Code {preview ? null : <span className='icon'><Info /></span>}</h5>
                                {preview ? <div className='qrCode_container'>
                                    <img src={QRcode} alt="qrcode" className='qrcode-icon'></img>
                                </div> : <ul className='qrcodeinfo_list'>
                                    <li>When clicking on “Scan QR code” point your camera at the QR code.</li>
                                    <li>When clicking on “Auto generate” a new generated QR code will be displayed.</li>
                                </ul>}
                            </div>
                            {preview ? null : <div className='rightCol'>
                                <div className='actions'>
                                    <button type='button' className='autoBtn'>Auto generate</button>
                                    <button type='button' className='scanBtn'>Scan QR Code</button>
                                </div>
                            </div>}
                        </div>
                    </div>
                    <div className={`rightCol ${preview && 'preview'}`}>
                        <div className='inputBox barcode_section sm-40 lg-40'>
                            {
                                preview ? <div className='barcode_box'>
                                    <label className='label'>Bar Code</label>
                                    <div className='barcode_container'>
                                        <Barcode />
                                    </div>
                                </div> : <Input
                                    label={'Bar Code'}
                                    type={'text'}
                                    name={'barcode'}
                                    id={'title'}
                                    value={values.barcode}
                                    wrapperClass={'col12'}
                                    onChange={handleChange}
                                    placeholder={preview && values.barcode == "" ? '-' : "Please type"}
                                />
                            }
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
                                placeholder={preview && values.orderLevel == "" ? '-' : "Please type"}
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
                                placeholder={preview && values.minOrder == "" ? '-' : "Please type"}
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
                                placeholder={preview && values.maxOrder == "" ? '-' : "Please type"}
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
                                    ReadOnly={preview ? true : false}
                                    placeholder={preview && values.buyingPrice == "" ? '-' : "Please type"}
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
                                    ReadOnly={preview ? true : false}
                                    placeholder={preview && values.mrp == "" ? '-' : "Please type"}
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
                                    ReadOnly={preview ? true : false}
                                    placeholder={preview && values.profit == "" ? '-' : "Please type"}
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
                                    ReadOnly={preview ? true : false}
                                    placeholder={preview && values.netPrice == "" ? '-' : "Please type"}
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
                                    ReadOnly={preview ? true : false}
                                    placeholder={preview && values.invPrice == "" ? '-' : "Please type"}
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
                                    ReadOnly={preview ? true : false}
                                    placeholder={preview && values.vat == "" ? '-' : "Please type"}
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
                                    disabled={preview ? true : false}
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
                                    ReadOnly={preview ? true : false}
                                    placeholder={preview && values.Quantity_1 == "" ? '-' : "Please type"}
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
                                    ReadOnly={preview ? true : false}
                                    placeholder={preview && values.Rate_1 == "" ? '-' : "Please type"}
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
                                    ReadOnly={preview ? true : false}
                                    placeholder={preview && values.Stock_1 == "" ? '-' : "Please type"}
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
                                    disabled={preview ? true : false}
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
                                    ReadOnly={preview ? true : false}
                                    placeholder={preview && values.Quantity_2 == "" ? '-' : "Please type"}
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
                                    ReadOnly={preview ? true : false}
                                    placeholder={preview && values.Rate_2 == "" ? '-' : "Please type"}
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
                                    ReadOnly={preview ? true : false}
                                    placeholder={preview && values.Stock_2 == "" ? '-' : "Please type"}
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
                                    disabled={preview ? true : false}
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
                                    ReadOnly={preview ? true : false}
                                    placeholder={preview && values.Quantity_3 == "" ? '-' : "Please type"}
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
                                    ReadOnly={preview ? true : false}
                                    placeholder={preview && values.Rate_3 == "" ? '-' : "Please type"}
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
                                    ReadOnly={preview ? true : false}
                                    placeholder={preview && values.Stock_3 == "" ? '-' : "Please type"}
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
                                ReadOnly={preview ? true : false}
                                placeholder={preview && values.expDuration == "" ? '-' : "Please type"}
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
                                disabled={preview ? true : false}
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
                                ReadOnly={preview ? true : false}
                                placeholder={preview && values.weight == "" ? '-' : "Please type"}
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
                                ReadOnly={preview ? true : false}
                                placeholder={preview && values.storageCondition == "" ? '-' : "Please type"}
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
                                disabled={preview ? true : false}
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
                                ReadOnly={preview ? true : false}
                                placeholder={preview && values.strength == "" ? '-' : "Please type"}
                            />
                        </div>
                    </div>
                </div>
                <div className='actionFlexbox'>
                    {preview ? null : <React.Fragment><button type='button' className='draftBtn' onClick={() => { setDraftClicked(true); handleSubmit() }}>Save Draft</button>
                        <div className='rightCol'>
                            <button type='button' className='canceltBtn' onClick={() => back()}>Back</button>
                            <button type='button' className='nextBtn' onClick={handleSubmit}>Next</button>
                        </div> </React.Fragment>}
                </div>
            </div>

            <Box className={`loader_container ${showLoader ? 'show': ''}`}>
                <CircularProgress />
            </Box>
            {
                draftsuccessModal &&
                <SuccessModal
                    handleSuccessClose={handleDraftSuccessPopupClose}
                    SuccessPopUp={draftsuccessModal}
                    SuccessMsg={SuccessMsg}
                    SuccessTitle={SuccessTitle}
                />
            }
        </React.Fragment>
    )

}

export default ProductDetail;