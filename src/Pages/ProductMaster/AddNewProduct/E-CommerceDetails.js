import React, { useState, useEffect } from 'react';
import locales from '../../../Constants/en.json';
import { Input, Select, TextArea } from '../../../Components/common';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ReactComponent as Info } from '../../../assets/images/info.svg';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { axiosClient } from '../../../services/axiosClient';
import SuccessModal from '../../../Components/CommonSuccessModal/SuccessModal';
import './AddNewProduct.scss';

const eCommerceDetailInitialValues = {
    canDisplay: 'false',
    firstCategory: '',
    secondCategory: '',
    thirdCategory: '',
    shortInfo: '',
    longInfo: '',
    ingredient: '',
    symptom: '',
    dosage: '',
    strength: '',
    dosageForm: '',
    discount: '',
    classification: '',
    bodySystem: '',
    country: '',
};

function ECommerceDetails({
    ProductCreateList,
    changeTab,
    ECommerceDetailsData,
    preview,
    previewData,
    ecommerceBackData,
    productData,
    draftPopUpClose,
    categoriesAllData
}) {
    const [draftClicked, setDraftClicked] = useState(false);
    const [categoryLevel1, setCategoryLevel1] = useState('');
    const [categoryLevel2, setCategoryLevel2] = useState('');
    const [categoryLevel3, setCategoryLevel3] = useState('');
    const [draftsuccessModal, setDraftSuccessModal] = useState(false);
    const [SuccessMsg, setSuccessMsg] = useState('');
    const [SuccessTitle, setSuccessTitle] = useState('');
    const [draftButtonClick, setDraftButtonClick] = useState(false);

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } = useFormik({
        initialValues: eCommerceDetailInitialValues,
        // validationSchema: addUserEditFormSchema,
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
            handleDraft(productData, values);
        } else {
          
            ECommerceDetailsData(values);
            changeTab(2);
        }
    };

    const handleDraft = (productData, data) => {
        if (draftButtonClick == false) {
            setDraftButtonClick(true);
            const Packaging = {
                packaging: [
                    {
                        packType: productData.Sales_Packing_1,
                        quantity: productData.Quantity_1,
                        price: productData.Rate_1,
                        stock: productData.Stock_1,
                    },
                    {
                        packType: productData.Sales_Packing_2,
                        quantity: productData.Quantity_2,
                        price: productData.Rate_2,
                        stock: productData.Stock_2,
                    },
                    {
                        packType: productData.Sales_Packing_3,
                        quantity: productData.Quantity_3,
                        price: productData.Rate_3,
                        stock: productData.Stock_3,
                    },
                ],
            };

            delete productData.Sales_Packing_1;
            delete productData.Sales_Packing_2;
            delete productData.Sales_Packing_3;
            delete productData.Quantity_1;
            delete productData.Quantity_2;
            delete productData.Quantity_3;
            delete productData.Rate_1;
            delete productData.Rate_2;
            delete productData.Rate_3;
            delete productData.Stock_1;
            delete productData.Stock_2;
            delete productData.Stock_3;
            const collection = { ...productData, ...data, ...Packaging, isDraft: true };
            saveDraft(collection);
        }
    };

    const saveDraft = async event => {
        const accessToken = `Bearer ${sessionStorage.accessToken} `;
        try {
            let response = await axiosClient.post(`admin/product/create`, event, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-via-device': true,
                    Authorization: accessToken,
                },
            });

            if (response.status == 200) {
                setDraftClicked(false);
                setDraftSuccessModal(true);
                setSuccessTitle('Draft saved successfull');
                setDraftButtonClick(false);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleFirstCategoryChange = event => {
        const { name, value } = event.target;
        setFieldValue(name, value);
        if (value !== '') {
            handleFirstCategory(value);
        }
    };

    const handleSecondCategoryChange = event => {
        const { name, value } = event.target;
        setFieldValue(name, value);
        if (value !== '') {
            handleSecondCategory(value);
        }
    };

    const handleFirstCategory = async event => {
        if(event){
           let filterLevel2;
          
           filterLevel2 =  categoriesAllData && categoriesAllData.filter((data) => {
            if(event == data.parent){
                
                return data
            }
           })
          
           setCategoryLevel2(filterLevel2) 
        }
    };

    const handleSecondCategory = async event => {
        if(event){
            let filterLevel2;
           
            filterLevel2 =  categoriesAllData && categoriesAllData.filter((data) => {
             if(event == data.parent){
                 
                 return data
             }
            })
           
            setCategoryLevel3(filterLevel2) 
         }
    };

    const handleDraftSuccessPopupClose = () => {
        draftPopUpClose();
    };

    useEffect(() => {
        if (previewData) {
            Object.entries(previewData).map(item => {
                setFieldValue(item[0], item[1]);
            });
        }
        if (ecommerceBackData) {
            Object.entries(ecommerceBackData).map(item => {
                setFieldValue(item[0], item[1]);
            });
        }
        if(categoriesAllData && categoriesAllData.length > 0){
            let filterlevel1;
           filterlevel1 =  categoriesAllData.filter((data) => {
                if(data.level == 1){
                    return data
                }
            })
            setCategoryLevel1(filterlevel1)
        }
    }, []);

    useEffect(() => {
        if(previewData){
            if(previewData.firstCategory!==""){
                if(categoriesAllData && categoriesAllData.length > 0){
                    let filterlevel1;
                   filterlevel1 =  categoriesAllData.filter((data) => {
                        if(data._id == previewData.firstCategory){
                            return data
                        }
                    })
                    setCategoryLevel1(filterlevel1)
                }
            }
            if(previewData.secondCategory!==""){
                if(categoriesAllData && categoriesAllData.length > 0){
                    let filterlevel2;
                   filterlevel2 =  categoriesAllData.filter((data) => {
                        if(data._id == previewData.secondCategory){
                            return data
                        }
                    })
                    
                    setCategoryLevel2(filterlevel2)
                }
            }
            if(previewData.thirdCategory!==""){
                if(categoriesAllData && categoriesAllData.length > 0){
                    let filterlevel3;
                   filterlevel3 =  categoriesAllData.filter((data) => {
                        if(data._id == previewData.thirdCategory){
                            return data
                        }
                    })
                    
                    setCategoryLevel3(filterlevel3)
                }
            }

        }
    }, [previewData])

    return (
        <React.Fragment>
            <div className={`eCommerceDetails-container ${preview ? 'preview_active' : ''}`}>
                <div className='canDisplay'>
                    <FormControl>
                        <FormLabel id='demo-controlled-radio-buttons-group'>Can Display?</FormLabel>
                        <RadioGroup
                            aria-labelledby='demo-controlled-radio-buttons-group'
                            name='canDisplay'
                            value={values.canDisplay}
                            onChange={handleChange}
                        >
                            <FormControlLabel value={true} control={<Radio />} label='Yes' />
                            <FormControlLabel value={false} control={<Radio />} label='No' />
                        </RadioGroup>
                    </FormControl>
                </div>
                {values.canDisplay == true || values.canDisplay == 'true' ? (
                    <div className='categoryLevelFlexbox'>
                        <div className='inputBox sm-30 lg-30'>
                            <Select
                                label={'Category-Level 1'}
                                name={'firstCategory'}
                                options={
                                    categoryLevel1 &&
                                    categoryLevel1.length > 0 &&
                                    categoryLevel1.map(item => {
                                        return { id: item._id, value: item.name };
                                    })
                                }
                                // isRequired
                                wrapperClass={'col12'}
                                value={values.firstCategory}
                                onChange={e => handleFirstCategoryChange(e)}
                                error={errors.firstCategory}
                                touched={touched.firstCategory}
                                disabled={preview ? true : false}
                            />
                        </div>
                        <div className='inputBox sm-30 lg-30'>
                            <Select
                                label={'Category-Level 2'}
                                name={'secondCategory'}
                                options={
                                    categoryLevel2 &&
                                    categoryLevel2.length > 0 &&
                                    categoryLevel2.map(item => {
                                        return { id: item._id, value: item.name };
                                    })
                                }
                                // isRequired
                                wrapperClass={'col12'}
                                value={values.secondCategory}
                                onChange={e => handleSecondCategoryChange(e)}
                                error={errors.secondCategory}
                                touched={touched.secondCategory}
                                disabled={preview ? true : false}
                            />
                        </div>
                        <div className='inputBox sm-30 lg-30'>
                            <Select
                                label={'Category-Level 3'}
                                name={'thirdCategory'}
                                options={
                                    categoryLevel3 &&
                                    categoryLevel3.length > 0 &&
                                    categoryLevel3.map(item => {
                                        return { id: item._id, value: item.name };
                                    })
                                }
                                // isRequired
                                wrapperClass={'col12'}
                                value={values.thirdCategory}
                                onChange={handleChange}
                                error={errors.thirdCategory}
                                touched={touched.thirdCategory}
                                disabled={preview ? true : false}
                            />
                        </div>
                    </div>
                ) : null}
                <div className='second_flexbox'>
                    <div className='inputBox sm-50 lg-50'>
                        <TextArea
                            label={'Short Info'}
                            name={'shortInfo'}
                            value={values.shortInfo}
                            wrapperClass={'col12'}
                            onChange={handleChange}
                            placeholder='Enter staff bio here..'
                        />
                    </div>
                    <div className='inputBox sm-50 lg-50'>
                        <TextArea
                            label={'Long Info'}
                            name={'longInfo'}
                            value={values.longInfo}
                            wrapperClass={'col12'}
                            onChange={handleChange}
                            placeholder='Enter staff bio here..'
                        />
                    </div>
                    <div className='inputBox sm-50 lg-50'>
                        <TextArea
                            label={'Ingredients'}
                            name={'ingredient'}
                            value={values.ingredient}
                            wrapperClass={'col12'}
                            onChange={handleChange}
                            placeholder='Enter staff bio here..'
                        />
                    </div>
                    <div className='inputBox sm-50 lg-50'>
                        <TextArea
                            label={'Symptoms'}
                            name={'symptom'}
                            value={values.symptom}
                            wrapperClass={'col12'}
                            onChange={handleChange}
                            placeholder='Enter staff bio here..'
                        />
                    </div>
                </div>
                <div className='bottom_flexbox'>
                    <div className='inputBox sm-25 lg-25'>
                        <Input
                            label={'Dosage'}
                            type={'text'}
                            name={'dosage'}
                            id={'dosage'}
                            value={values.dosage}
                            wrapperClass={'col12'}
                            onChange={handleChange}
                            ReadOnly={preview ? true : false}
                        />
                    </div>
                    <div className='inputBox sm-25 lg-25'>
                        <Input
                            label={'Strength'}
                            type={'text'}
                            name={'strength'}
                            id={'strength'}
                            value={values.strength}
                            wrapperClass={'col12'}
                            onChange={handleChange}
                            ReadOnly={preview ? true : false}
                        />
                    </div>
                    <div className='inputBox sm-25 lg-25'>
                        <Select
                            label={'Form'}
                            name={'dosageForm'}
                            options={[
                                { id: 'Syrup', value: 'Syrup' },
                                { id: 'Tablet', value: 'Tablet' },
                                { id: 'Powder', value: 'Powder' },
                            ]}
                            // isRequired
                            wrapperClass={'col12'}
                            value={values.dosageForm}
                            onChange={handleChange}
                            error={errors.dosageForm}
                            touched={touched.dosageForm}
                            disabled={preview ? true : false}
                        />
                    </div>
                    <div className='inputBox sm-25 lg-25'>
                        <Input
                            label={'Discount %'}
                            type={'text'}
                            name={'discount'}
                            id={'discount'}
                            value={values.discount}
                            wrapperClass={'col12'}
                            onChange={handleChange}
                            ReadOnly={preview ? true : false}
                        />
                    </div>
                    <div className='inputBox sm-25 lg-25'>
                        <Input
                            label={'Classification'}
                            type={'text'}
                            name={'classification'}
                            id={'classification'}
                            value={values.classification}
                            wrapperClass={'col12'}
                            onChange={handleChange}
                            ReadOnly={preview ? true : false}
                        />
                    </div>
                    <div className='inputBox sm-25 lg-25'>
                        <Select
                            label={'Body System'}
                            name={'bodySystem'}
                            options={[
                                { id: 'Musculoskeletal', value: 'Musculoskeletal' },
                                // { id: 'USA', value: 'USA' },
                                // { id: 'ENG', value: 'ENG' },
                            ]}
                            // isRequired
                            wrapperClass={'col12'}
                            value={values.bodySystem}
                            onChange={handleChange}
                            error={errors.bodySystem}
                            touched={touched.bodySystem}
                            disabled={preview ? true : false}
                        />
                    </div>
                    <div className='inputBox sm-25 lg-25'>
                        <Select
                            label={'Country of Origin'}
                            name={'country'}
                            options={
                                ProductCreateList &&
                                ProductCreateList.country.length > 0 &&
                                ProductCreateList.country.map(item => {
                                    return { id: item._id, value: item.name };
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
                    </div>
                </div>
                <div className='actionFlexbox'>
                    {preview ? null : (
                        <React.Fragment>
                            <button
                                type='button'
                                className='draftBtn'
                                onClick={() => {
                                    setDraftClicked(true);
                                    handleSubmit();
                                }}
                            >
                                Save Draft
                            </button>
                            <div className='rightCol'>
                                <button type='button' className='canceltBtn' onClick={() => changeTab(0)}>
                                    Back
                                </button>
                                <button type='button' className='nextBtn' onClick={handleSubmit}>
                                    Next
                                </button>
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </div>
            {draftsuccessModal && (
                <SuccessModal
                    handleSuccessClose={handleDraftSuccessPopupClose}
                    SuccessPopUp={draftsuccessModal}
                    SuccessMsg={SuccessMsg}
                    SuccessTitle={SuccessTitle}
                />
            )}
        </React.Fragment>
    );
}

export default ECommerceDetails;
