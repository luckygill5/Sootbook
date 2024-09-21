import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import swal from 'sweetalert';
import { axiosClient } from '../../../../services/axiosClient';
import { DataList, DatePicker, Input, Select } from '../../../common';
import locales from '../../../../Constants/en.json';
import Pen from '../../../../assets/images/pen.svg';
import './RolePrivilege.scss';

const rolePrivilegeInitialValues = {
    role: '',
    status: 'active',
    contractDate: '',
};

const rolePrivilegeConfig = [
    { label: 'Role', value: 'Manager', name: 'role' },
    { label: 'Status', value: 'Active', name: 'status' },
    { label: 'Contract Date', value: '24-02-2024', name: 'contractDate' },
    // {
    //     label: "Privileges", value: "", CheckList: true, ChecklistClass: "check_listing", CheckListData: [
    //         { label: "Ability to create and manage vendor profiles." },
    //         { label: "View and update inventory levels, track production." },
    //         { label: "Monitor the status of shipments." },

    //     ]
    // },
];

function RolePrivilege(props) {
    const [editMode, setEditMode] = useState(false);
    const [rolesInfo, setRolesInfo] = useState({});
    const userid = JSON.parse(localStorage.getItem('profileData'))?.userId

    const getRolesInfo = async () => {
        let response = await axiosClient.post(
            `admin/vendor/rolePreviligesInfo`,
            JSON.stringify({ userId: userid }),
        );
        if (response.status === 200) {
            setRolesInfo(response.data?.data?.vendor || {});
        }
    };

    useEffect(() => {
        getRolesInfo();
    }, []);

    const handleFormSubmit = async values => {
        delete values.contractDate;
        values.permission = [];
        try {
            let response = {};
            delete values._id;
            response = await axiosClient.post(
                `admin/vendor/rolePreviligesInfo/store`,
                JSON.stringify({
                    userId: userid,
                    ...values,
                }),
            );
            if (response.status === 200) {
                swal('Success', 'Roles and Privileges updated successfully', 'success', {
                    buttons: false,
                    timer: 2000,
                }).then(() => {
                    getRolesInfo();
                    setEditMode(false)
                });
            }
        } catch (error) {
            swal('Failed', `Error Updating Roles and Privileges`, 'error');
            setEditMode(false)
        }
    };

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: rolesInfo || rolePrivilegeInitialValues,
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
                                name={'role'}
                                value={values.role}
                                options={[
                                    { id: '66b79100312fc2996027b129', value: 'Super Admin' },
                                    { id: '66b79237312fc2996027b142', value: 'Admin' },
                                ]}
                                wrapperClass={'col6'}
                                onChange={handleChange}
                            />
                            <Select
                                label={'Status'}
                                name={'status'}
                                value={values.status}
                                options={[
                                    { id: 'true', value: 'Active' },
                                    { id: 'false', value: 'Inactive' },
                                ]}
                                wrapperClass={'col6'}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input_flexBox w-50'>
                            <DatePicker
                                label={'Contract Date'}
                                dateFormat={'dd/MM/yyyy'}
                                wrapperClass={'col12'}
                            />
                        </div>
                        <div className='privilege_section'>
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
                    <DataList config={rolePrivilegeConfig} dataSource={rolesInfo} />
                </React.Fragment>
            )}
        </div>
    );
}

export default RolePrivilege;
