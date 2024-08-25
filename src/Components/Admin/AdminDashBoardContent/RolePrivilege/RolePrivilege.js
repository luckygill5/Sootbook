import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { DataList, Input, Select } from '../../../common';
import locales from '../../../../Constants/en.json';
import Pen from '../../../../assets/images/pen.svg';
import BasicDatePicker from '../../../common/DatePicker';
import './RolePrivilege.scss';

const rolePrivilegeInitialValues = {
    name: '',
    status: '',
    contractDate: '',
};

function RolePrivilege(props) {
    const [editMode, setEditMode] = useState(false);

    const rolePrivilegeData = [
        { label: 'Role', value: 'Manager' },
        { label: 'Status', value: 'Active' },
        { label: 'Contract Date', value: '24-02-2024' },
        // {
        //     label: "Privileges", value: "", CheckList: true, ChecklistClass: "check_listing", CheckListData: [
        //         { label: "Ability to create and manage vendor profiles." },
        //         { label: "View and update inventory levels, track production." },
        //         { label: "Monitor the status of shipments." },

        //     ]
        // },
    ];

    const handleFormSubmit = async values => {
        console.log(values);
    };

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: rolePrivilegeInitialValues,
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
        <div className='rolePrivilege_container'>
            {editMode ? (
                <div className='form_container'>
                    <form onSubmit={handleSubmit}>
                        <div className='input_flexBox col-2'>
                            <Select
                                label={'Role'}
                                name={'name'}
                                value={values.name}
                                options={[
                                    { id: 'Startup', value: 'Startup' },
                                    { id: 'Startup', value: 'Startup' },
                                    { id: 'Startup', value: 'Startup' },
                                ]}
                                wrapperClass={'col6'}
                                onChange={handleChange}
                            />
                            <Select
                                label={'Status'}
                                name={'status'}
                                value={values.status}
                                options={[
                                    { id: 'Startup', value: 'Startup' },
                                    { id: 'Startup', value: 'Startup' },
                                    { id: 'Startup', value: 'Startup' },
                                ]}
                                wrapperClass={'col6'}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input_flexBox w-50'>
                            <BasicDatePicker 
                            label={'Contract Date'}
                            wrapperClass={'col12'}/>
                        </div>
                        <div className='privilege_section'>
                            <h5 className='title'>Privileges</h5>
                            <ul className='check_listing'>
                                <li className='check_item'>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label='Ability to create and manage vendor profiles.'
                                    />
                                </li>
                                <li className='check_item'>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label='View and update inventory levels, track production.'
                                    />
                                </li>
                                <li className='check_item'>
                                    <FormControlLabel
                                        control={<Checkbox />}
                                        label='Monitor the status of shipments.'
                                    />
                                </li>
                            </ul>
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
                <React.Fragment>
                    <div className='header_flex'>
                        <h5 className='title'>Role and Privileges</h5>
                        <button className='edit_btn' onClick={() => setEditMode(true)}>
                            <span className='icon'>
                                <img src={Pen} alt='edit'></img>
                            </span>
                            {locales.edit_title}
                        </button>
                    </div>
                    <DataList config={rolePrivilegeData} />
                </React.Fragment>
            )}
        </div>
    );
}

export default RolePrivilege;
