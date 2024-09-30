import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { useFormik } from 'formik';
import swal from 'sweetalert';
import { axiosClient } from '../../../../../services/axiosClient';
import { Input, DataList, Select } from '../../../../common/';
import '../ContractContent.scss';

const commissionConfig = [
    { label: 'Commission Option', value: 'Non Taxable', name: 'commission_option' },
    { label: 'Amount Option', value: 'Fixed', name: 'amount_option' },
    { label: 'Title', value: 'Title', name: 'title' },
    { label: 'Amount', value: '$1000', name: 'amount' },
];

const commissionInitialValues = {
    commission_option: 'Taxable',
    amount_option: 'Fixed',
    title: '',
    amount: '',
};

function Commissions({ mode, setEditMode, commissionInformation, getCommissionInfo }) {
    const userid = JSON.parse(localStorage.getItem('profileData'))?.userId;
    if (commissionInformation && !isEmpty(commissionInformation)) {
        for (let key in commissionInitialValues) {
            commissionInitialValues[key] = commissionInformation[key];
        }
    }

    const handleFormSubmit = async values => {
        values.currencyId="66d13dfd3e088b621d0ea8cc";
        try {
            let response = {};

            if (commissionInformation?._id) {
                response = await axiosClient.post(
                    `admin/commission/update`,
                    JSON.stringify({id: commissionInformation._id, userId: userid, ...values }),
                );
            } else {
                response = await axiosClient.post(
                    `admin/commission/create`,
                    JSON.stringify({ userId: userid, ...values }),
                );
            }
            if (response.status === 200) {
                swal('Success', 'Allowance updated successfully', 'success', {
                    buttons: false,
                    timer: 2000,
                }).then(() => {
                    getCommissionInfo();
                    setEditMode(false);
                });
            }
        } catch (error) {
            swal('Failed', `Error Updating Allowance`, 'error');
        }
    };

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: commissionInitialValues,
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
        <div className='commissions_container'>
            {mode ? (
                <div className='form_container'>
                    <form onSubmit={handleSubmit}>
                        <div className='input_flexbox'>
                            <Select
                                label={'Commission Option'}
                                name={'commission_option'}
                                value={values.commission_option}
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
                <DataList config={commissionConfig} dataSource={commissionInformation} />
            )}
        </div>
    );
}

export default Commissions;
