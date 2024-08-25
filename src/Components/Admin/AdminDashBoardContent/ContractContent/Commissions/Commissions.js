import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect from '@mui/material/Select';
import { Input, DataList, Select } from '../../../../common/';
import { ReactComponent as Arrow } from '../../../../../assets/images/chevron-down.svg';
import '../ContractContent.scss';

const commissionConfig = [
    { label: 'Commission Option', value: 'Non Taxable' },
    { label: 'Amount Option', value: 'Fixed' },
    { label: 'Title', value: 'Title' },
    { label: 'Amount', value: '$1000' },
];

const commissionInitialValues = {
    commission_option: 'Taxable',
    amount_option: 'Fixed',
    title: '',
    amount: '',
};

function Commissions(props) {
    const handleFormSubmit = async values => {
        console.log(values);
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
            {props.mode ? (
                <div className='search_fieldbox'>
                    <input
                        type='text'
                        className='search_input'
                        placeholder='Search Preline'
                    ></input>
                </div>
            ) : null}
            <div className='table_section'>
                <div className='table_container'>
                    <div className='table_head'>
                        <div className='row col-4'>
                            <div className='thead'>
                                <span className='text'>Title</span>
                                <div className='sort'>
                                    <span className='up_icon'>
                                        <Arrow />
                                    </span>
                                    <span className='down_icon'>
                                        <Arrow />
                                    </span>
                                </div>
                            </div>
                            <div className='thead'>
                                <span className='text'>Amount</span>
                                <div className='sort'>
                                    <span className='up_icon'>
                                        <Arrow />
                                    </span>
                                    <span className='down_icon'>
                                        <Arrow />
                                    </span>
                                </div>
                            </div>
                            <div className='thead'>
                                <span className='text'>Commission Option</span>
                                <div className='sort'>
                                    <span className='up_icon'>
                                        <Arrow />
                                    </span>
                                    <span className='down_icon'>
                                        <Arrow />
                                    </span>
                                </div>
                            </div>
                            <div className='thead'>
                                <span className='text'>Amount Option</span>
                                <div className='sort'>
                                    <span className='up_icon'>
                                        <Arrow />
                                    </span>
                                    <span className='down_icon'>
                                        <Arrow />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='table_body'>
                        <div className='no_record'>No records available</div>
                    </div>
                </div>
                <div className='pagination_container'>
                    <div className='navigation'>
                        <ul className='count_list'>
                            <li>
                                <span className='arrow_prev'>
                                    <Arrow />
                                </span>
                            </li>
                            <li>
                                <span className='count selected'>1</span>
                            </li>
                            <li>
                                <span className='count'>2</span>
                            </li>
                            <li>
                                <span className='count'>3</span>
                            </li>
                            <li>
                                <span className='count'>...</span>
                            </li>
                            <li>
                                <span className='count'>10</span>
                            </li>
                            <li>
                                <span className='arrow_next'>
                                    <Arrow />
                                </span>
                            </li>
                        </ul>
                        <MuiSelect
                            className='select_pageBox'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            // value={countryselectedData}
                            label='Age'
                            //  onChange={handleChange}
                        >
                            <MenuItem name='Single' value='Startup'>
                                5 page
                            </MenuItem>
                            <MenuItem name='Married' value='Startup'>
                                10 page
                            </MenuItem>
                        </MuiSelect>
                    </div>
                    <div className='gotopage'>
                        <span className='label'>Go to</span>
                        <input className='gotoInput' type='text'></input>
                        <span className='label'>page</span>
                    </div>
                </div>
            </div>
            {props.mode ? (
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
                <DataList config={commissionConfig} />
            )}
        </div>
    );
}

export default Commissions;
