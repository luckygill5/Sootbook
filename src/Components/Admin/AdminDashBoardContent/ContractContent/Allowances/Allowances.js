import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { useFormik } from 'formik';
import swal from 'sweetalert';
import { axiosClient } from '../../../../../services/axiosClient';
import { Input, DataList, Select } from '../../../../common/';
import '../ContractContent.scss';

const allowanceConfig = [
    { label: 'Allowance Option', value: 'Non Taxable', name: 'allowance_option' },
    { label: 'Amount Option', value: 'Fixed', name: 'amount_option' },
    { label: 'Title', value: 'Title', name: 'title' },
    { label: 'Amount', value: '$1000', name: 'amount' },
];

const allowanceInitialValues = {
    allowance_option: 'Taxable',
    amount_option: 'Fixed',
    title: '',
    amount: '',
};

function Allowances({ mode, setEditMode, allowanceInformation, getAllowanceInfo }) {
    const userid = JSON.parse(localStorage.getItem('profileData'))?.userId;
    if (allowanceInformation && !isEmpty(allowanceInformation)) {
        for (let key in allowanceInitialValues) {
            allowanceInitialValues[key] = allowanceInformation[key];
        }
    }

    const handleFormSubmit = async values => {
        values.currencyId = '66d13dfd3e088b621d0ea8cc';
        try {
            let response = {};

            if (allowanceInformation?._id) {
                response = await axiosClient.post(
                    `admin/allowance/update`,
                    JSON.stringify({ id: allowanceInformation._id, userId: userid, ...values }),
                );
            } else {
                response = await axiosClient.post(
                    `admin/allowance/create`,
                    JSON.stringify({ userId: userid, ...values }),
                );
            }
            if (response.status === 200) {
                swal('Success', 'Allowance updated successfully', 'success', {
                    buttons: false,
                    timer: 2000,
                }).then(() => {
                    getAllowanceInfo();
                    setEditMode(false);
                });
            }
        } catch (error) {
            swal('Failed', `Error Updating Allowance`, 'error');
        }
    };

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: allowanceInitialValues,
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
        <div className='allowances_container'>
            {mode ? (
                <div className='form_container'>
                    <form onSubmit={handleSubmit}>
                        <div className='input_flexbox'>
                            <Select
                                label={'Allowance Option'}
                                name={'allowance_option'}
                                value={values.allowance_option}
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
                <DataList config={allowanceConfig} dataSource={allowanceInformation} />
            )}
        </div>
    );
}

export default Allowances;
