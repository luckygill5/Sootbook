import React, { useState } from 'react';
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
import "./AddNewProduct.scss"


const eCommerceDetailInitialValues = {
    Short_Info: "",
    Long_Info: "",
    Ingredients: "",
    Symptoms: "",
    Dosage: "",
    Strength: "",
    Form: "",
    Discount: "",
    Classification: "",
    Body_System: "",
    Country_Origin: "",
};


function ECommerceDetails() {
    const [display, setDisplay] = useState('');

    const handleCanDisplay = (event) => {
        setDisplay(event.target.value);
    };

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

    };

    console.log("display", display)

    return (
        <div className='eCommerceDetails-container'>
            <div className='canDisplay'>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Can Display?</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={display}
                        onChange={handleCanDisplay}
                    >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </div>
            {display == 'Yes' ? <div className='categoryLevelFlexbox'>
                <div className='inputBox sm-30 lg-30'>
                <Select
                        label={'Category-Level 1'}
                        name={'Form'}
                        options={[
                            { id: 'IND', value: 'IND' },
                            { id: 'USA', value: 'USA' },
                            { id: 'ENG', value: 'ENG' },
                        ]}
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.Form}
                        onChange={handleChange}
                        error={errors.Form}
                        touched={touched.Form}
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                <Select
                        label={'Category-Level 2'}
                        name={'Form'}
                        options={[
                            { id: 'IND', value: 'IND' },
                            { id: 'USA', value: 'USA' },
                            { id: 'ENG', value: 'ENG' },
                        ]}
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.Form}
                        onChange={handleChange}
                        error={errors.Form}
                        touched={touched.Form}
                    />
                </div>
                <div className='inputBox sm-30 lg-30'>
                <Select
                        label={'Category-Level 3'}
                        name={'Form'}
                        options={[
                            { id: 'IND', value: 'IND' },
                            { id: 'USA', value: 'USA' },
                            { id: 'ENG', value: 'ENG' },
                        ]}
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.Form}
                        onChange={handleChange}
                        error={errors.Form}
                        touched={touched.Form}
                    />
                </div>
            </div> : null}
            <div className='second_flexbox'>
                <div className='inputBox sm-50 lg-50'>
                    <TextArea
                        label={'Short Info'}
                        name={'Short_Info'}
                        value={values.Short_Info}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        placeholder='Enter staff bio here..'
                    />
                </div>
                <div className='inputBox sm-50 lg-50'>
                    <TextArea
                        label={'Long Info'}
                        name={'Long_Info'}
                        value={values.Long_Info}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        placeholder='Enter staff bio here..'
                    />
                </div>
                <div className='inputBox sm-50 lg-50'>
                    <TextArea
                        label={'Ingredients'}
                        name={'Ingredients'}
                        value={values.Ingredients}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                        placeholder='Enter staff bio here..'
                    />
                </div>
                <div className='inputBox sm-50 lg-50'>
                    <TextArea
                        label={'Symptoms'}
                        name={'Symptoms'}
                        value={values.Symptoms}
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
                        name={'Dosage'}
                        id={'Dosage'}
                        value={values.Dosage}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-25 lg-25'>
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
                <div className='inputBox sm-25 lg-25'>
                    <Select
                        label={'Form'}
                        name={'Form'}
                        options={[
                            { id: 'IND', value: 'IND' },
                            { id: 'USA', value: 'USA' },
                            { id: 'ENG', value: 'ENG' },
                        ]}
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.Form}
                        onChange={handleChange}
                        error={errors.Form}
                        touched={touched.Form}
                    />
                </div>
                <div className='inputBox sm-25 lg-25'>
                    <Input
                        label={'Discount %'}
                        type={'text'}
                        name={'Discount'}
                        id={'Discount'}
                        value={values.Discount}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-25 lg-25'>
                    <Input
                        label={'Classification'}
                        type={'text'}
                        name={'Classification'}
                        id={'Classification'}
                        value={values.Classification}
                        wrapperClass={'col12'}
                        onChange={handleChange}
                    />
                </div>
                <div className='inputBox sm-25 lg-25'>
                    <Select
                        label={'Body System'}
                        name={'Body_System'}
                        options={[
                            { id: 'IND', value: 'IND' },
                            { id: 'USA', value: 'USA' },
                            { id: 'ENG', value: 'ENG' },
                        ]}
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.Body_System}
                        onChange={handleChange}
                        error={errors.Body_System}
                        touched={touched.Body_System}
                    />
                </div>
                <div className='inputBox sm-25 lg-25'>
                    <Select
                        label={'Country of Origin'}
                        name={'Country_Origin'}
                        options={[
                            { id: 'IND', value: 'IND' },
                            { id: 'USA', value: 'USA' },
                            { id: 'ENG', value: 'ENG' },
                        ]}
                        // isRequired
                        wrapperClass={'col12'}
                        value={values.Country_Origin}
                        onChange={handleChange}
                        error={errors.Country_Origin}
                        touched={touched.Country_Origin}
                    />
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

export default ECommerceDetails