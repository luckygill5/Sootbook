import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import LeftArrow from '../../../../assets/images/arrow-left.svg';
import { Input, Select, TextArea } from '../../../../Components/common';
import { STATUS_LIST } from '../../../../Constants/Contants.common';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import locales from '../../../../Constants/en.json';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { UserSave } from '../../../../services/userSave.service';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseX from '../../../../assets/images/x-cross.svg';
import SuccessIcon from '../../../../assets/images/Static Icon.svg';
import ErrorModal from '../../../../Components/CommonErrorModal/ErrorModal';
import { UserListSearch } from '../../../../services/UserEmployeeSearch.service';
import './AddUser.scss';

const addUserEditFormSchema = Yup.object({
    Role: Yup.string().required('Role is required.'),
    Status: Yup.string().required('Status is required.'),
    Email: Yup.string().email().required('Email is required.'),
    password: Yup.string().min(6).required('password is required.'),
    confirm_password: Yup.string()
        .required()
        .oneOf([Yup.ref('password'), null], 'password must match'),
    Status: Yup.string().required('Status is required'),
});

const addUserInitialValues = {
    Search_employee: '',
    Name: '',
    Email: '',
    Role: '',
    role_description: '',
    Status: '',
    password: '',
    confirm_password: '',
    Contact_Number: '',
    country_code: '',
};

function AddUser({ NewRole, backHRM }) {
    const [roleList, setRoleList] = useState('');
    const [permission, setPermission] = useState([]);
    const [permissionCheck, setPermissionCheck] = useState([]);
    const [selectCountry, setSelectCountry] = useState('');
    const [userAdded, setUserAdded] = useState(false);
    const data = useSelector(state => state?.userSaveList?.data);
    const [errorModal, SetErrorModal] = useState(false);
    const [errorModalMsg, SetErrorModalMsg] = useState(false);
    const [suggestionList, setSuggestionList] = useState([]);
    const navigate = useNavigate();

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
        useFormik({
            initialValues: addUserInitialValues,
            validationSchema: addUserEditFormSchema,
            validateOnChange: true,
            validateOnBlur: false,
            enableReinitialize: true,
            onSubmit: (values, action) => {
                handleFormSubmit(values);
                action.resetForm();
                setPermissionCheck([]);
                setPermission([]);
                backHRM();
            },
        });

    const handleFormSubmit = async values => {
        UserSave(values, selectCountry, permissionCheck).then(response => {
            if (response && response.status == true) {
                setUserAdded(true);
            } else if (response && response.status == false) {
                SetErrorModal(true);
                SetErrorModalMsg(response?.message && response.message);
            }
        });
    };

    const handleRole = event => {
        const { name, value } = event.target;
        setFieldValue(name, value);
        handleChange(event);
        if (value) {
            let permissionFilter;
            permissionFilter = data.rolePermissionList.filter((item, index) => {
                if (item._id == value) {
                    return item;
                }
            });
            if (permissionFilter && permissionFilter.length > 0) {
                setPermission(permissionFilter[0].permissions);
            }
        }
    };

    const handleCountry = event => {
        const { name, value } = event.target;
        setFieldValue(name, value);
        handleChange(event);
        setSelectCountry(value);
    };

    const handleStatus = event => {
        const { name, value } = event.target;
        setFieldValue(name, value);
        handleChange(event);
    };

    const handleManagePermission = event => {
        const { name } = event.target;
        if (permissionCheck.includes(name)) {
            setPermissionCheck([]);
        } else {
            setPermissionCheck([...permissionCheck, name]);
        }
    };

    const handleDialogClose = () => {
        setUserAdded(false);
    };

    const handleModalErrorPopUP = () => {
        SetErrorModal(false);
    };

    const handleSearchEmployee = event => {
        const { name, value } = event.target;
        setFieldValue(name, value);
        handleChange(event);
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

    const handleSelectSuggetion = (id, name) => {
        console.log('selectsuggest', id, name);
    };

    useEffect(() => {
        let rolelistData = [];
        data.rolePermissionList &&
            data.rolePermissionList.length > 0 &&
            data.rolePermissionList.map(item => {
                rolelistData.push({ id: item._id, value: item.name });
            });
        setRoleList(rolelistData);
    }, []);

    console.log('suggestion', suggestionList);

    return (
        <React.Fragment>
            <div className='addUser_container'>
                <div className='backHrm-link'>
                    <button className='backBtn' type='button' onClick={() => backHRM()}>
                        <span className='icon'>
                            <img src={LeftArrow} alt='left-arrow' className='img_block'></img>
                        </span>
                        Back to HRM
                    </button>
                </div>
                <div className='form_container'>
                    <form>
                        <h4 className='title'>Add user</h4>
                        {/* <div className='input_flexbox searchBox disabled'>
                            <Input
                                label={'Search for the Employee by Name / Email'}
                                type={'text'}
                                name={'Search_employee'}
                                id={'Search_employee'}
                                wrapperClass={'col12'}
                                value={values.Search_employee}
                                onChange={e => handleSearchEmployee(e)}
                                onBlur={handleBlur}
                                disabled
                                //   isRequired
                                error={errors.Search_employee}
                                touched={touched.Search_employeeirst_name}
                            />
                            {suggestionList && suggestionList.length > 0 && (
                                <div className='suggestion_container'>
                                    <ul className='employee_listing'>
                                        {suggestionList.map((item, index) => {
                                            return (
                                                <li
                                                    className='list_item'
                                                    name={item._id}
                                                    key={index}
                                                    onClick={() =>
                                                        handleSelectSuggetion(
                                                            item._id,
                                                            `${item.first_name} ${item.last_name}`,
                                                        )
                                                    }
                                                >{`${item.first_name} ${item.last_name}`}</li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div> */}
                        <div className='input_flexbox'>
                            <Input
                                label={'Name'}
                                type={'text'}
                                name={'Name'}
                                id={'Name'}
                                wrapperClass={'col6'}
                                value={values.Name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                //   isRequired
                                error={errors.Name}
                                touched={touched.Name}
                            />
                            <Input
                                label={'Email'}
                                type={'email'}
                                name={'Email'}
                                id={'Email'}
                                wrapperClass={'col6'}
                                value={values.Email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                //   isRequired
                                error={errors.Email}
                                touched={touched.Email}
                            />
                        </div>
                        <div className='input_flexbox '>
                            <div className=' contactNumber col6'>
                                <label className='label'>Contact Number</label>
                                <div className='flexbox '>
                                    <Select
                                        label={''}
                                        name={'country_code'}
                                        options={[
                                            { id: 'IND', value: 'IND' },
                                            { id: 'USA', value: 'USA' },
                                            { id: 'ENG', value: 'ENG' },
                                        ]}
                                        // isRequired
                                        wrapperClass={'col2'}
                                        value={values.country_code}
                                        onChange={e => handleCountry(e)}
                                        error={errors.country_code}
                                        touched={touched.country_code}
                                    />
                                    <Input
                                        label={''}
                                        type={'text'}
                                        name={'Contact_Number'}
                                        id={'Contact_Number'}
                                        wrapperClass={'col8'}
                                        value={values.Contact_Number}
                                        placeholder={'+1 (000) 000-0000'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        maxLength={selectCountry == 'IND' ? 10 : 15}
                                        ReadOnly={selectCountry !== '' ? false : true}
                                        //   isRequired
                                        error={errors.Contact_Number}
                                        touched={touched.Contact_Number}
                                    />
                                </div>
                            </div>
                            <div className='role_control col6'>
                                <span className='ceate_role_link' onClick={() => NewRole()}>
                                    Create New Role
                                </span>
                                <Select
                                    label={'Role'}
                                    name={'Role'}
                                    options={[...roleList]}
                                    isRequired
                                    wrapperClass={'col12'}
                                    value={values.Role}
                                    onChange={e => handleRole(e)}
                                    error={errors.Role}
                                    touched={touched.Role}
                                />
                            </div>
                        </div>
                        <div className='input_flexbox'>
                            <TextArea
                                label={'Role Description'}
                                name={'role_description'}
                                value={values.role_description}
                                wrapperClass={'col6'}
                                onChange={handleChange}
                                placeholder='Enter staff bio here..'
                            />
                            <Select
                                label={'Status'}
                                name={'Status'}
                                options={STATUS_LIST}
                                isRequired
                                wrapperClass={'col6'}
                                value={values.Status}
                                onChange={e => handleStatus(e)}
                                error={errors.Status}
                                touched={touched.Status}
                            />
                        </div>
                        {permission && permission.length > 0 && (
                            <div className='privileges_section'>
                                <FormGroup>
                                    {permission &&
                                        permission.length > 0 &&
                                        permission.map((item, index) => {
                                            return (
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={
                                                                permissionCheck.includes(item._id)
                                                                    ? true
                                                                    : false
                                                            }
                                                            name={item._id}
                                                            onChange={handleManagePermission}
                                                        />
                                                    }
                                                    label={item.name}
                                                />
                                            );
                                        })}
                                </FormGroup>
                            </div>
                        )}
                        <div className='input_flexbox'>
                            <Input
                                label={'Password'}
                                type={'password'}
                                name={'password'}
                                id={'password'}
                                wrapperClass={'col12'}
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isRequired
                                error={errors.password}
                                touched={touched.password}
                            />
                            <Input
                                label={'Confirm Password'}
                                type={'password'}
                                name={'confirm_password'}
                                id={'confirm_password'}
                                wrapperClass={'col12'}
                                value={values.confirm_password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isRequired
                                error={errors.confirm_password}
                                touched={touched.confirm_password}
                            />
                        </div>
                        <div className='bottom_actions'>
                            <button className='cancelBtn' onClick={() => backHRM()}>
                                {locales.cancel_label}
                            </button>
                            <button className='saveBtn' onClick={handleSubmit}>
                                {locales.save_label}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {userAdded && (
                <Dialog
                    className='addUser_successModal'
                    onClose={handleDialogClose}
                    open={userAdded}
                >
                    <button className='close_btn' type='submit' onClick={() => handleDialogClose()}>
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
                    handleErrorClose={handleModalErrorPopUP}
                    ErrorPopUp={errorModal}
                    ErrorMsg={errorModalMsg}
                />
            )}
        </React.Fragment>
    );
}

export default AddUser;
