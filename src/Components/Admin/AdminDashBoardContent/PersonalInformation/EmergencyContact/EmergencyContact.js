import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Input, DataList, TextArea } from '../../../../common';
import '../PersonalInformation.scss';

const emergencyContactConfig = [
    { label: 'Full Name', value: 'Full Name' },
    { label: 'Contact Number', value: '+1 (000) 000-0000' },
    { label: 'Email', value: 'Email' },
    { label: 'Address', value: 'Address' },
];

const emergencyContactInitialValues = {
    name: '',
    email: '',
    phone: '',
    address: '',
};

function EmergencyContact(props) {
    const handleFormSubmit = async values => {
        console.log(values);
    };

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: emergencyContactInitialValues,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,
        onSubmit: (values, action) => {
            handleFormSubmit(values);
            action.resetForm();
        },
    });

    useEffect(() => {}, []);

    return (
        <div className='personalinfo_emergencycontact_container'>
            {props.mode ? (
                <div className='form_container'>
                    <form onSubmit={handleSubmit}>
                        <div className='input_flexbox'>
                            <Input
                                label={'Full Name'}
                                type={'text'}
                                name={'name'}
                                id={'name'}
                                value={values.name}
                                placeholder={'Full Name'}
                                wrapperClass={'col12'}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input_flexbox'>
                            <Input
                                label={'Contact Number'}
                                type={'text'}
                                name={'phone'}
                                id={'phone'}
                                value={values.phone}
                                placeholder={'Contact Number'}
                                wrapperClass={'col6'}
                                onChange={handleChange}
                            />
                            <Input
                                label={'Email'}
                                type={'text'}
                                name={'email'}
                                id={'email'}
                                placeholder={'Email'}
                                value={values.email}
                                wrapperClass={'col6'}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input_flexbox'>
                            <TextArea
                                label={'Address'}
                                name={'address'}
                                value={values.address}
                                wrapperClass={'col12'}
                                onChange={handleChange}
                                placeholder='Address'
                            />
                        </div>
                        <div className='button-container'>
                            <button className='cancelBtn' onClick={() => props.setEditMode(false)}>
                                Cancel
                            </button>
                            <button className='savebtn' type='submit' onClick={handleSubmit}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <DataList config={emergencyContactConfig} />
            )}
        </div>
    );
}

export default EmergencyContact;
