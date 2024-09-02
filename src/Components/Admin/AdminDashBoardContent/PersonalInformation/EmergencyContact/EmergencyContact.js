import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import swal from 'sweetalert';
import { axiosClient } from '../../../../../services/axiosClient';
import { Input, DataList, TextArea } from '../../../../common';
import '../PersonalInformation.scss';

const emergencyContactConfig = [
    { label: 'Full Name', value: 'Full Name', name: 'name' },
    { label: 'Contact Number', value: '+1 (000) 000-0000', name: 'email' },
    { label: 'Email', value: 'Email', name: 'phone' },
    { label: 'Address', value: 'Address', name: 'address' },
];

const emergencyContactInitialValues = {
    name: '',
    email: '',
    phone: '',
    address: '',
};

function EmergencyContact({ mode, setEditMode, emergencyInfo, getEmergencyInfo }) {
    const handleFormSubmit = async values => {
        try {
            const userid = JSON.parse(localStorage.getItem('profileData')).userId
            let response = await axiosClient.post(
                `admin/vendor/emergencyInfo/store`,
                JSON.stringify({ userId: userid, ...values }),
            );
            if (response.status === 200) {
                swal('Success', 'Emergency Information updated successfully', 'success', {
                    buttons: false,
                    timer: 2000,
                }).then(() => {
                    getEmergencyInfo();
                    setEditMode(false);
                });
            }
        } catch (error) {
            swal('Failed', `Error Updating Emergency Information`, 'error');
        }
    };

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: emergencyInfo || emergencyContactInitialValues,
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
            {mode ? (
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
                            <button className='cancelBtn' onClick={() => setEditMode(false)}>
                                Cancel
                            </button>
                            <button className='savebtn' type='submit' onClick={handleSubmit}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <DataList config={emergencyContactConfig} dataSource={emergencyInfo} />
            )}
        </div>
    );
}

export default EmergencyContact;
