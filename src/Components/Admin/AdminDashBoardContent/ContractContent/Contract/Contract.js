import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Input, DataList, Select, TextArea } from '../../../../common/';
import { DEPARTMENTS_LIST } from '../../../../../Constants/Contants.common';
import '../ContractContent.scss';
import '../../../../common/common.component.scss';
import BasicDatePicker from '../../../../common/DatePicker';

const contractConfig = [
    { label: 'Contract date', value: '24/02/2024' },
    { label: 'Department', value: 'Human resources' },
    { label: 'Basic salary', value: '$1500' },
    { label: 'Hourly Rate', value: '$10.00' },
    { label: 'Payslip Type', value: 'Per Month' },
    { label: 'Office Shift', value: 'Morning Shift' },
    { label: 'Contract End', value: 'Date Of Leaving' },
    { label: 'Categories', value: 'Badge', valueClass: 'badge green' },
    { label: 'Role Description', value: 'Description' },
];

const contractInitialValues = {
    contract_start: '',
    contract_end: '',
    department: '',
    designation: '',
    basic_salary: '',
    hourly_rate: '',
    payslip_type: 'week',
    office_shift: 'Morning',
    leave_category: '',
    role_description: '',
};

//selectBox
function Contract(props) {
    const handleFormSubmit = async values => {
        console.log(values);
        // try{
        //     let response = await axiosClient.patch(`/profiles/${profileData.profileid}`, JSON.stringify(editformDataPreparer(values, profileData.profileid, userid)));
        //     if (response.status === 204 ) {
        //         swal("Success", "Profile updated successfully", "success", {
        //             buttons: false,
        //             timer: 2000,
        //         })
        //         .then(() => {
        //             if(values.country) {
        //                 let country = countries.find(item => item.id === values.country);
        //                 dispatch(updateCountryInfo({country}));
        //             }
        //             if(values.state) {
        //                 let state = states.find(item => item.id === values.state);
        //                 dispatch(updateStateInfo({state}));
        //             }
        //             if(values.universityid) {
        //                 let university = universities.find(item => item.id === values.universityid);
        //                 dispatch(updateUniversityInfo({university}));
        //             }
        //             dispatch(updateProfileInfo({profileData: values}))
        //             navigate('/profile');
        //         });
        //     }
        // }
        // catch(error) {
        //     showPopupError(error, 'Oops!')
        // }
    };

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: contractInitialValues,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,
        onSubmit: (values, action) => {
            handleFormSubmit(values);
            action.resetForm();
        },
    });

    useEffect(() => {
        // const countryCodeOptions = getCountryCode(countries);
        // setCountryCodes(countryCodeOptions);
        // axiosClient.get("/universities").then((res) => {
        //   setUniversities(res.data);
        // });
    }, []);

    return (
        <div className='contract_container'>
            {props.mode ? (
                <div className='form_container'>
                    <form onSubmit={handleSubmit}>
                        <div className='input_flexbox'>
                            <BasicDatePicker 
                             label={'Contract Date'}
                            wrapperClass={'col6'}
                            isRequired
                            />
                        </div>
                        <div className='input_flexbox'>
                            <Select
                                label={'Department'}
                                name={'department'}
                                value={values.department}
                                options={DEPARTMENTS_LIST}
                                wrapperClass={'col6'}
                                onChange={handleChange}
                                isRequired
                            />
                            <Input
                                label={'Designation'}
                                type={'text'}
                                name={'designation'}
                                id={'designation'}
                                value={values.designation}
                                wrapperClass={'col6'}
                                onChange={handleChange}
                                isRequired
                            />
                        </div>
                        <div className='input_flexbox'>
                            <Input
                                label={'Basic Salary'}
                                type={'text'}
                                name={'basic_salary'}
                                id={'basic_salary'}
                                value={values.basic_salary}
                                wrapperClass={'col6'}
                                onChange={handleChange}
                                isRequired
                            />
                            <Input
                                label={'Hourly Rate'}
                                type={'text'}
                                name={'hourly_rate'}
                                id={'hourly_rate'}
                                value={values.hourly_rate}
                                wrapperClass={'col6'}
                                onChange={handleChange}
                            />
                            <Select
                                label={'Payslip Type'}
                                name={'payslipType'}
                                value={values.payslip_type}
                                options={[
                                    { id: 'week', value: 'Per Week' },
                                    { id: 'month', value: 'Per Month' },
                                ]}
                                wrapperClass={'col4'}
                                onChange={handleChange}
                                isRequired
                            />
                        </div>
                        <div className='input_flexbox'>
                            <Select
                                label={'Office Shift'}
                                name={'office_shift'}
                                value={values.office_shift}
                                options={[
                                    { id: 'Morning', value: 'Morning' },
                                    { id: 'Afternoon', value: 'Afternoon' },
                                    { id: 'Evening', value: 'Evening' },
                                ]}
                                wrapperClass={'col6'}
                                onChange={handleChange}
                                isRequired
                            />
                            <BasicDatePicker 
                             label={'Contract End'}
                             wrapperClass={'col6'}/>
                        </div>
                        <div className='input_flexbox'>
                            <div className='inputField col12'>
                                <label>Leave Categories</label>
                                <input
                                    type='text'
                                    placeholder='24-02-2024'
                                    className='input_element'
                                    value={values.leave_category}
                                    onChange={handleChange}
                                ></input>
                                <span className='info'>
                                    If All is selected, then all leave categories will show to
                                    employee which are added in the system.
                                </span>
                            </div>
                        </div>
                        <div className='input_flexbox'>
                            <TextArea
                                label={'Role Description'}
                                name={'description'}
                                value={values.role_description}
                                wrapperClass={'col12'}
                                onChange={handleChange}
                                placeholder='Enter role description here..'
                                isRequired
                            />
                        </div>
                        <div className='button-container'>
                            <button className='cancelBtn' onClick={() => props.setEditMode(false)}>
                                Cancel
                            </button>
                            <button className='saveBtn' type='submit' onClick={handleSubmit}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <DataList config={contractConfig} />
            )}
        </div>
    );
}

export default Contract;
