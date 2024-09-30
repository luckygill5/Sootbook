import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import swal from 'sweetalert';
import { axiosClient } from '../../../../../services/axiosClient';
import { Input, DataList, Select } from '../../../../common/';
import '../ContractContent.scss';

const statutoryDeductionsConfig = [
    { label: 'Deduction Option', value: 'Non Taxable', name: 'deduction_option' },
    { label: 'Title', value: 'Title', name: 'title' },
    { label: 'Amount', value: '$1000', name: 'amount' },
];

const deductionInitialValues = {
    deduction_option: 'Taxable',
    title: '',
    amount: '',
};

function StatutoryDeductions({ mode, setEditMode, deductionInformation, getDeductionInfo }) {
    const userid = JSON.parse(localStorage.getItem('profileData'))?.userId;
    if (deductionInformation && !isEmpty(deductionInformation)) {
        for (let key in deductionInitialValues) {
            deductionInitialValues[key] = deductionInformation[key];
        }
    }

    const handleFormSubmit = async values => {
        values.currencyId="66d13dfd3e088b621d0ea8cc";
        try {
            let response = {};

            if (deductionInformation?._id) {
                response = await axiosClient.post(
                    `admin/statuary_deduction/update`,
                    JSON.stringify({id: deductionInformation._id, userId: userid, ...values }),
                );
            } else {
                response = await axiosClient.post(
                    `admin/statuary_deduction/create`,
                    JSON.stringify({ userId: userid, ...values }),
                );
            }
            if (response.status === 200) {
                swal('Success', 'Deduction updated successfully', 'success', {
                    buttons: false,
                    timer: 2000,
                }).then(() => {
                    getDeductionInfo();
                    setEditMode(false);
                });
            }
        } catch (error) {
            swal('Failed', `Error Updating Deduction`, 'error');
        }
    };

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: deductionInitialValues,
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
        <div className='satutoryDeductions_container'>
            {mode ? (
                <div className='form_container'>
                    <form onSubmit={handleSubmit}>
                        <div className='input_flexbox'>
                            <Select
                                label={'Deduction Option'}
                                name={'deduction_option'}
                                value={values.deduction_option}
                                options={[
                                    { id: 'Taxable', value: 'Taxable' },
                                    { id: 'Non Taxable', value: 'Non Taxable' },
                                ]}
                                wrapperClass={'col6'}
                                onChange={handleChange}
                            />
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
                <DataList config={statutoryDeductionsConfig} dataSource={deductionInformation} />
            )}
        </div>
    );
}

export default StatutoryDeductions;
