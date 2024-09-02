import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import swal from 'sweetalert';
import { axiosClient } from '../../../../../services/axiosClient';
import { Input, DataList, Select } from '../../../../common/';
import '../ContractContent.scss';

const reimbursementConfig = [
    { label: 'Reimbursements Option', value: 'Non Taxable', name: 'reimbursement_option' },
    { label: 'Amount Option', value: 'Fixed', name: 'amount_option' },
    { label: 'Title', value: 'Title', name: 'title' },
    { label: 'Amount', value: '$1000', name: 'amount' },
];

const reimbursementInitialValues = {
    reimbursement_option: 'Taxable',
    amount_option: 'Fixed',
    title: '',
    amount: '',
};

function Reimbursements({ mode, setEditMode, reimbursementInformation, getReimbursementInfo }) {
    const userid = JSON.parse(localStorage.getItem('profileData')).userId;
    if (reimbursementInformation && !isEmpty(reimbursementInformation)) {
        for (let key in reimbursementInitialValues) {
            reimbursementInitialValues[key] = reimbursementInformation[key];
        }
    }

    const handleFormSubmit = async values => {
        values.currencyId = '66d13dfd3e088b621d0ea8cc';
        try {
            let response = {};

            if (reimbursementInformation?._id) {
                response = await axiosClient.post(
                    `admin/reimbursement/update`,
                    JSON.stringify({ id: reimbursementInformation._id, userId: userid, ...values }),
                );
            } else {
                response = await axiosClient.post(
                    `admin/reimbursement/create`,
                    JSON.stringify({ userId: userid, ...values }),
                );
            }
            if (response.status === 200) {
                swal('Success', 'Reimbursements updated successfully', 'success', {
                    buttons: false,
                    timer: 2000,
                }).then(() => {
                    getReimbursementInfo();
                    setEditMode(false);
                });
            }
        } catch (error) {
            swal('Failed', `Error Updating Reimbursements`, 'error');
        }
    };

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: reimbursementInitialValues,
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
        <div className='reimbursements_container'>
            {mode ? (
                <div className='form_container'>
                    <form onSubmit={handleSubmit}>
                        <div className='input_flexbox'>
                            <Select
                                label={'Reimbursement Option'}
                                name={'reimbursement_option'}
                                value={values.reimbursement_option}
                                options={[
                                    { id: 'Taxable', value: 'Taxable' },
                                    { id: 'Non Taxable', value: 'Non Taxable' },
                                ]}
                                wrapperClass={'col6'}
                                onChange={handleChange}
                            />
                            <Select
                                label={'Amount Option'}
                                name={'amount_option'}
                                value={values.amount_option}
                                options={[
                                    { id: 'Fixed', value: 'Fixed' },
                                    { id: 'Flexible', value: 'Flexible' },
                                ]}
                                wrapperClass={'col6'}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input_flexbox'>
                            <Input
                                label={'Title'}
                                type={'text'}
                                name={'title'}
                                id={'title'}
                                value={values.title}
                                wrapperClass={'col6'}
                                onChange={handleChange}
                            />
                            <Input
                                label={'Amount'}
                                type={'text'}
                                name={'amount'}
                                id={'amount'}
                                value={values.amount}
                                wrapperClass={'col6'}
                                onChange={handleChange}
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
                <DataList config={reimbursementConfig} dataSource={reimbursementInformation} />
            )}
        </div>
    );
}

export default Reimbursements;
