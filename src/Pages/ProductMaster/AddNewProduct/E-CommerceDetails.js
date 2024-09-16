import React, { useState, useEffect } from 'react';
import locales from "../../../Constants/en.json";
import { Input, Select, TextArea } from '../../../Components/common';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ReactComponent as Info } from "../../../assets/images/info.svg";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { axiosClient } from '../../../services/axiosClient';
import "./AddNewProduct.scss"


const eCommerceDetailInitialValues = {
    canDisplay: "",
    firstCategory:"",
    secondCategory:"",
    thirdCategory:"",
    shortInfo: "",
    longInfo: "",
    ingredient: "",
    symptom: "",
    dosage: "",
    strength: "",
    dosageForm: "",
    discount: "",
    classification: "",
    bodySystem: "",
    country: "",
};


function ECommerceDetails({ProductCreateList, changeTab,ECommerceDetailsData, preview, previewData}) {

    const [categoryLevel2, setCategoryLevel2] = useState('');
    const [categoryLevel3, setCategoryLevel3] = useState('');


    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
        useFormik({
            initialValues: eCommerceDetailInitialValues,
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
        ECommerceDetailsData(values)
        changeTab(2)
    };


    const handleFirstCategoryChange = (event) => {
        const {name, value} = event.target;
        setFieldValue(name, value);
        if(value!==""){
            handleFirstCategory(value);  
      
        }

    }

    const handleSecondCategoryChange = (event) => {
        const {name, value} = event.target;
        setFieldValue(name, value);
        if(value!==""){
            handleSecondCategory(value);  
      
        }
    }

    const handleFirstCategory = async (event) => { 
        const accessToken =  `Bearer ${sessionStorage.accessToken} ` 
            try{
            let response = await axiosClient.post(
                `admin/category/list`,
                JSON.stringify({ categoryId: event,}),
                {
                    headers : {
                        'Content-Type': 'application/json',
                        'x-via-device': true,
                        'Authorization' : accessToken
                    },
                }

            );
            if(response.status == 200){
                setCategoryLevel2(response?.data?.data?.category)
            }

        }catch(error){
            console.log("error", error)
        }
    }


    const handleSecondCategory = async (event) => { 
        const accessToken =  `Bearer ${sessionStorage.accessToken} ` 
            try{
            let response = await axiosClient.post(
                `admin/category/list`,
                JSON.stringify({ categoryId: event,}),
                {
                    headers : {
                        'Content-Type': 'application/json',
                        'x-via-device': true,
                        'Authorization' : accessToken
                    },
                }

            );
            if(response.status == 200){
                setCategoryLevel3(response?.data?.data?.category)
            }

        }catch(error){
            console.log("error", error)
        }
    }


    useEffect(() => {
        if(previewData){
        Object.entries(previewData).map((item) => {
            setFieldValue(item[0], item[1]);
        })
        }

    }, [])

    const handleDraft = () => {
        changeTab(2)
    //   addProduct()
    }


    return (
        <div className={`eCommerceDetails-container ${preview ? 'preview_active' : ''}`}>
            <div className='canDisplay'>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Can Display?</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="canDisplay"
                        value={values.canDisplay}
                        onChange={handleChange}
                    >
                        <FormControlLabel value={true} control={<Radio />} label="Yes" />
                        <FormControlLabel value={false} control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </div>
            {values.canDisplay == true || values.canDisplay == "true" ? <div className='categoryLevelFlexbox'>
                <div className='inputBox sm-30 lg-30'>
                    <Select
                        label={'Category-Level 1'}
                        name={'firstCategory'}
                        options={
                            ProductCreateList &&
                            ProductCreateList.category.length > 0 &&
                            ProductCreateList.category.map((item) => {
                                return (
                                    
                                    { id: item._id, value: item.name }
                                    
                                )  
                            })
                        }
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.firstCategory}
                        onChange={(e) => handleFirstCategoryChange(e)}
                        error={errors.firstCategory}
                        touched={touched.firstCategory}
                        disabled={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                    <Select
                        label={'Category-Level 2'}
                        name={'secondCategory'}
                        options={
                            categoryLevel2 &&
                            categoryLevel2.length > 0 &&
                            categoryLevel2.map((item) => {
                                return (
                                    
                                    { id: item._id, value: item.name }
                                    
                                )  
                            })
                        }
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.secondCategory}
                        onChange={(e) => handleSecondCategoryChange(e)}
                        error={errors.secondCategory}
                        touched={touched.secondCategory}
                        disabled={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                    <Select
                        label={'Category-Level 3'}
                        name={'thirdCategory'}
                        options={
                            categoryLevel3 &&
                            categoryLevel3.length > 0 &&
                            categoryLevel3.map((item) => {
                                return (
                                    
                                    { id: item._id, value: item.name }
                                    
                                )  
                            })
                        }
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.thirdCategory}
                        onChange={handleChange}
                        error={errors.thirdCategory}
                        touched={touched.thirdCategory}
                        disabled={preview ? true :false }
                    />
                </div>
            </div> : null}
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
                        ReadOnly={preview ? true :false }
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
                        ReadOnly={preview ? true :false }
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
                        disabled={preview ? true :false }
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
                        ReadOnly={preview ? true :false }
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
                        ReadOnly={preview ? true :false }
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
                        disabled={preview ? true :false }
                    />
                </div>
                <div className='inputBox sm-25 lg-25'>
                    <Select
                        label={'Country of Origin'}
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
                        disabled={preview ? true :false }
                    />
                </div>
            </div>
            <div className='actionFlexbox'>
                <button type='button' className='draftBtn' onClick={handleDraft}>Save Draft</button>
                <div className='rightCol'>
                    <button type='button' className='canceltBtn' onClick={() => changeTab(0)}>Cancel</button>
                    <button type='button' className='nextBtn' onClick={handleSubmit}>Next</button>
                </div>
            </div>
        </div>
    )

}

export default ECommerceDetails