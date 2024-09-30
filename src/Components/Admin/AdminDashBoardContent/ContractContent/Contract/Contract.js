import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { useFormik } from 'formik';
import * as Yup from "yup";
import swal from 'sweetalert';
import { axiosClient } from '../../../../../services/axiosClient';
import { DatePicker, Input, DataList, Select, TextArea } from '../../../../common/';
import { DEPARTMENTS_LIST } from '../../../../../Constants/Contants.common';
import '../ContractContent.scss';
import '../../../../common/common.component.scss';

const contractConfig = [
    { label: 'Contract date', value: '24/02/2024', name: 'contract_start', type: 'date' },
    { label: 'Department', value: 'Human resources', name: 'department' },
    { label: 'Designation', value: 'Human resources', name: 'designation' },
    { label: 'Basic salary', value: '$1500', name: 'basic_salary' },
    { label: 'Hourly Rate', value: '$10.00', name: 'hourly_rate' },
    { label: 'Payslip Type', value: 'Per Month', name: 'payslip_type' },
    { label: 'Office Shift', value: 'Morning Shift', name: 'office_shift' },
    { label: 'Contract End', value: '24/02/2024', name: 'contract_end', type: 'date' },
    { label: 'Categories', value: 'Badge', valueClass: 'badge green', name: 'leave_category' },
    { label: 'Role Description', value: 'Description', name: 'role_description' },
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

const contractFormSchema = Yup.object({
    contract_start: Yup.string().required("Contract date is required."),
    department: Yup.string().required("Department is required."),
    designation: Yup.string().required("Designation is required."),
    basic_salary: Yup.string().required("Basic salary is required."),
    office_shift: Yup.string().required("Office Shift is required."),
    payslip_type: Yup.string().required("Payslip Type is required."),
    contract_end: Yup.string().required("Contract End Date is required.")
  });

//selectBox
function Contract({ mode, setEditMode, contractInformation, getContractInfo }) {
    const userid = JSON.parse(localStorage.getItem('profileData'))?.userId;
    if (contractInformation && !isEmpty(contractInformation)) {
        for (let key in contractInitialValues) {
            contractInitialValues[key] = contractInformation[key];
        }
    }
    const handleFormSubmit = async values => {
        values.currencyId = '66d13dfd3e088b621d0ea8cc';
        try {
            let response = {};

            if (contractInformation?._id) {
                response = await axiosClient.post(
                    `admin/contract/update`,
                    JSON.stringify({ id: contractInformation._id, userId: userid, ...values }),
                );
            } else {
                response = await axiosClient.post(
                    `admin/contract/create`,
                    JSON.stringify({ userId: userid, ...values }),
                );
            }
            if (response.status === 200) {
                swal('Success', 'Contract updated successfully', 'success', {
                    buttons: false,
                    timer: 2000,
                }).then(() => {
                    getContractInfo();
                    setEditMode(false);
                });
            }
        } catch (error) {
            swal('Failed', `Error Updating Contract`, 'error');
            setEditMode(false);
        }
    };

    const { values, handleChange, handleSubmit, setFieldValue, errors, touched } = useFormik({
        initialValues: contractInitialValues,
        validationSchema: contractFormSchema,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,
        onSubmit: (values, action) => {
            handleFormSubmit(values);
            action.resetForm();
        },
    });

    return (
        <div className='contract_container'>
            {mode ? (
                <div className='container'>
                    <form onSubmit={handleSubmit}>
                        <div className='input_flexbox'>
                            <DatePicker
                                label={'Contract Date'}
                                wrapperClass={'col6'}
                                dateFormat={'dd/MM/yyyy'}
                                name={'contract_start'}
                                value={values.contract_start}
                                onChange={({ name, value }) => setFieldValue(name, value)}
                                isRequired
                                error={errors.contract_start}
                                touched={touched.contract_start}
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
                                error={errors.department}
                                touched={touched.department}
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
                                error={errors.designation}
                                touched={touched.designation}
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
                                error={errors.basic_salary}
                                touched={touched.basic_salary}
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
                                name={'payslip_type'}
                                value={values.payslip_type}
                                options={[
                                    { id: 'week', value: 'Per Week' },
                                    { id: 'month', value: 'Per Month' },
                                ]}
                                wrapperClass={'col4'}
                                onChange={handleChange}
                                isRequired
                                error={errors.payslip_type}
                                touched={touched.payslip_type}
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
                                wrapperClass={'col4'}
                                onChange={handleChange}
                                isRequired
                                error={errors.office_shift}
                                touched={touched.office_shift}
                            />
                            <DatePicker
                                label={'Contract End'}
                                wrapperClass={'col4'}
                                dateFormat={'dd/MM/yyyy'}
                                name={'contract_end'}
                                value={values.contract_end}
                                onChange={({ name, value }) => setFieldValue(name, value)}
                            />
                        </div>
                        <div className='input_flexbox'>
                            <div className='inputField col12'>
                                <label>Leave Categories</label>
                                <input
                                    type='text'
                                    placeholder='24-02-2024'
                                    className='input_element'
                                    name={'leave_category'}
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
                                name={'role_description'}
                                value={values.role_description}
                                wrapperClass={'col8'}
                                onChange={handleChange}
                                placeholder='Enter role description here..'
                            />
                        </div>
                        <div className='button-container'>
                            <button className='cancelBtn' onClick={() => setEditMode(false)}>
                                Cancel
                            </button>
                            <button className='saveBtn' type='submit' onClick={handleSubmit}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <DataList config={contractConfig} dataSource={contractInformation} />
            )}
        </div>
    );
}

export default Contract;
