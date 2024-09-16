import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { useFormik } from 'formik';
import { axiosClient } from '../../../../services/axiosClient';
import { Input, DataList } from '../../../../Components/common';
import '../PersonalInformation.scss';

//accountInfo_listing
const bankAccountConfig = [
    { label: 'Account Title', value: 'Account Title', name: 'account_title' },
    { label: 'Account Number', value: 'Account Number', name: 'account_number' },
    { label: 'Bank Name', value: 'Bank Name', name: 'bank_name' },
    { label: 'IBAN', value: 'IBAN', name: 'iban' },
    { label: 'Swift Code', value: 'Swift Code', name: 'swift_code' },
    { label: 'Bank Branch', value: 'Bank Branch', name: 'bank_branch' },
];

const bankAccountEditFormSchema = Yup.object({
    account_title: Yup.string().required('Account Title is required.'),
    account_number: Yup.string().required('Account Number is required.'),
    bank_name: Yup.string().required('Bank Name is required.'),
    iban: Yup.string().required('IBAN is required.'),
    swift_code: Yup.string().required('Swift Code is required.'),
    bank_branch: Yup.string().required('Bank Branch is required.'),
});

const bankAccountInitialValues = {
    account_title: '',
    account_number: '',
    bank_name: '',
    iban: '',
    swift_code: '',
    bank_branch: '',
};

function BankAccount({ mode, setEditMode, bankInfo, getBankInfo }) {
    const handleFormSubmit = async values => {
        try {
            const userid = JSON.parse(localStorage.getItem('profileData')).userId
            let response = await axiosClient.post(
                `admin/vendor/bankInfo/store`,
                JSON.stringify({ userId: userid, ...values }),
            );
            if (response.status === 200) {
                swal('Success', 'Bank Information updated successfully', 'success', {
                    buttons: false,
                    timer: 2000,
                }).then(() => {
                    getBankInfo();
                    setEditMode(false);
                });
            }
        } catch (error) {
            swal('Failed', `Error Updating Bank Information`, 'error');
        }
    };

    const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
        initialValues: bankInfo || bankAccountInitialValues,
        validationSchema: bankAccountEditFormSchema,
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
        <div className='personalinfoBankaccount_container'>
            {mode ? (
                <div className='form_container' onSubmit={handleSubmit}>
                    <form onSubmit={handleSubmit}>
                        <div className='input_flexbox'>
                            <Input
                                label={'Account Title'}
                                type={'text'}
                                name={'account_title'}
                                id={'account_title'}
                                wrapperClass={'col6'}
                                value={values.account_title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isRequired
                                error={errors.account_title}
                                touched={touched.account_title}
                            />
                            <Input
                                label={'Account Number'}
                                type={'text'}
                                name={'account_number'}
                                id={'account_number'}
                                wrapperClass={'col6'}
                                value={values.account_number}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isRequired
                                error={errors.account_number}
                                touched={touched.account_number}
                            />
                        </div>
                        <div className='input_flexbox'>
                            <Input
                                label={'Bank Name'}
                                type={'text'}
                                name={'bank_name'}
                                id={'bank_name'}
                                wrapperClass={'col6'}
                                value={values.bank_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isRequired
                                error={errors.bank_name}
                                touched={touched.bank_name}
                            />
                            <Input
                                label={'IBAN'}
                                type={'text'}
                                name={'iban'}
                                id={'iban'}
                                wrapperClass={'col6'}
                                value={values.iban}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isRequired
                                error={errors.iban}
                                touched={touched.iban}
                            />
                        </div>
                        <div className='input_flexbox'>
                            <Input
                                label={'Swift Code'}
                                type={'text'}
                                name={'swift_code'}
                                id={'swift_code'}
                                wrapperClass={'col6'}
                                value={values.swift_code}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isRequired
                                error={errors.swift_code}
                                touched={touched.swift_code}
                            />
                            <Input
                                label={'Bank Branch'}
                                type={'text'}
                                name={'bank_branch'}
                                id={'bank_branch'}
                                wrapperClass={'col6'}
                                value={values.bank_branch}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isRequired
                                error={errors.bank_branch}
                                touched={touched.bank_branch}
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
                <DataList config={bankAccountConfig} dataSource={bankInfo} />
            )}
        </div>
    );
}

export default BankAccount;
