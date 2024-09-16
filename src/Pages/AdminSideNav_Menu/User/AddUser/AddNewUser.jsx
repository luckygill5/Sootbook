import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import classNames from 'classnames';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Input, Select, SelectWithInput, TextArea } from '../../../../Components/common';
import { STATUS_LIST } from '../../../../Constants/Contants.common';
import { UserSave } from '../../../../services/userSave.service';
import { UserListSearch } from '../../../../services/UserEmployeeSearch.service';
import CloseX from '../../../../assets/images/x-cross.svg';
import SuccessIcon from '../../../../assets/images/Static Icon.svg';
import ErrorModal from '../../../../Components/CommonErrorModal/ErrorModal';
import locales from '../../../../Constants/en.json';
import LeftArrow from '../../../../assets/images/arrow-left.svg';

const addUserEditFormSchema = Yup.object({
    Role: Yup.string().required('Role is required.'),
    Status: Yup.string().required('Status is required'),
});

const addUserInitialValues = {
    name: '',
    email: '',
    phone: '',
    role: '',
    status: '',
    permissions: [],
    role_description: '',
    country: 'India',
};

export default function AddNewUser({ NewRole, backHRM, editUserData }) {
    const [roleList, setRoleList] = useState('');
    const [formDisabled, setFormDisabled] = useState(true);
    const [userAdded, setUserAdded] = useState(false);
    const [errorModal, SetErrorModal] = useState(false);
    const [errorModalMsg, SetErrorModalMsg] = useState("");
    const state = useSelector(state => state);
    const [search, setSearch] = useState([]);
    const [suggestionList, setSuggestionList] = useState([]);

    useEffect(() => {
        let rolelistData = [];
        const { userSaveList: { data: { rolePermissionList } = {} } = {} } = state;
        if (rolePermissionList?.length) {
            rolePermissionList.map(item => {
                rolelistData.push({ id: item._id, value: item.name });
            });
        }
        setRoleList(rolelistData);
    }, []);

    const handleFormSubmit = async values => {
        UserSave(values).then(response => {
            if (response && response.status == true) {
                setUserAdded(true);
            } else if (response && response.status == false) {
                SetErrorModal(true);
                SetErrorModalMsg(response?.message && response.message);
            }
        });
    };

    const handleSearchEmployee = ({ target: { value } }) => {
        setSearch(value);
        if (value !== '' && value.length >= 3) {
            setTimeout(() => {
                UserListSearch(value).then(response => {
                    if (response && response.status == true) {
                        setSuggestionList(response?.data?.employees);
                    }
                });
            }, 1000);
        } else if (value == '' && value.length < 3) {
            setSuggestionList([]);
        }
    };

    const handleSelectSuggetion = emp => {
        if (emp && !isEmpty(emp)) {
            for (let key in values) {
                values[key] = emp[key];
                if (key === 'name') {
                    values[key] = emp['first_name'] + emp['last_name'];
                }
            }
            setFormDisabled(false);
        }
        setSearch('');
        setSuggestionList([]);
    };

    const { values, handleChange, handleSubmit, errors, touched, handleReset } = useFormik({
        initialValues: addUserInitialValues,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,
        onSubmit: (values, action) => {
            values.permissions = [];
            console.log({ values });
            handleFormSubmit(values);
            action.resetForm();
        },
    });

    useEffect(() => {
        if (editUserData && !isEmpty(editUserData)) {
            for (let key in values) {
                values[key] = editUserData[key];
                if (key === 'name') {
                    values[key] = editUserData['first_name'] + editUserData['last_name'];
                }
            }
            setFormDisabled(false);
        }
    }, [editUserData])

    return (
        <div className='addUser_container'>
            <div className='backHrm-link'>
                <button className='backBtn' type='button' onClick={backHRM}>
                    <span className='icon'>
                        <img src={LeftArrow} alt='left-arrow' className='img_block'></img>
                    </span>
                    Back to HRM
                </button>

                <div className='form_container'>
                    <h4 className='title'>Add user</h4>
                    <form onSubmit={handleSubmit}>
                        <div className='input_flexbox searchBox'>
                            <Input
                                label={'Search for the Employee by Name / Email'}
                                type={'text'}
                                name={'Search_employee'}
                                id={'Search_employee'}
                                wrapperClass={'col12'}
                                value={search}
                                onChange={handleSearchEmployee}
                            />
                            {suggestionList?.length > 0 && (
                                <div className='suggestion_container'>
                                    <ul className='employee_listing'>
                                        {suggestionList.map((item, index) => {
                                            return (
                                                <li className='list_item' name={item._id} key={index} onClick={() => handleSelectSuggetion(item)}>
                                                    {`${item.first_name} ${item.last_name}`}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className='input_flexbox'>
                            <Input label={'Name'} type={'text'} name={'name'} id={'name'} wrapperClass={'col6'} value={values.name} disabled />
                            <Input label={'Email'} type={'email'} name={'email'} id={'email'} wrapperClass={'col6'} value={values.email} disabled />
                        </div>
                        <div className='input_flexbox '>
                            <SelectWithInput
                                label={'Contact Number'}
                                selectName={'country'}
                                options={[
                                    { id: 'India', value: 'IND' },
                                    { id: 'USA', value: 'USA' },
                                    { id: 'England', value: 'ENG' },
                                ]}
                                inputName={'phone'}
                                placeholder={'+1 (000) 000-0000'}
                                wrapperClass={'col6'}
                                disabled
                                values={values}
                                touched={touched}
                                errors={errors}
                            />
                            <div className='role_control col6'>
                                <span className='ceate_role_link' onClick={() => NewRole()}>
                                    Create New Role
                                </span>
                                <Select
                                    label={'Role'}
                                    name={'role'}
                                    options={[...roleList]}
                                    isRequired
                                    disabled={formDisabled}
                                    wrapperClass={'col12'}
                                    value={values.role}
                                    onChange={handleChange}
                                    error={errors.role}
                                    touched={touched.role}
                                />
                            </div>
                        </div>
                        <div className='input_flexbox'>
                            <TextArea
                                label={'Role Description'}
                                name={'role_description'}
                                value={values.role_description}
                                disabled
                                wrapperClass={'col6'}
                                onChange={handleChange}
                                placeholder='Enter staff bio here..'
                            />
                            <Select
                                label={'Status'}
                                name={'status'}
                                options={STATUS_LIST}
                                isRequired
                                disabled={formDisabled}
                                wrapperClass={'col6'}
                                value={values.status}
                                onChange={handleChange}
                                error={errors.status}
                                touched={touched.status}
                            />
                        </div>

                        <div className='bottom_actions'>
                            <button className='cancelBtn' onClick={() => backHRM()}>
                                {locales.cancel_label}
                            </button>
                            <button
                                className={classNames('saveBtn', { disabled: formDisabled })}
                                type='submit'
                                disabled={formDisabled}
                                onClick={() => {
                                    console.log('CLICKED');
                                    handleSubmit();
                                }}
                            >
                                {locales.save_label}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {userAdded && (
                <Dialog
                    className='addUser_successModal'
                    onClose={()=>{setUserAdded(false)}}
                    open={userAdded}
                >
                    <button className='close_btn' type='submit' onClick={() => setUserAdded(false)}>
                        <img src={CloseX} alt='close_icon' className='close_img'></img>
                    </button>
                    <div className='successiconBlock'>
                        <img src={SuccessIcon} alt='static_icon' className='success_icon'></img>
                    </div>
                    <DialogTitle className='modal_title'>
                        User has been assigned successfully
                    </DialogTitle>
                    <p className='message'>The user has been successfully added with the role.</p>
                </Dialog>
            )}
            {errorModal && (
                <ErrorModal
                    handleErrorClose={()=>{SetErrorModal(false)}}
                    ErrorPopUp={errorModal}
                    ErrorMsg={errorModalMsg}
                />
            )}
        </div>
    );
}
