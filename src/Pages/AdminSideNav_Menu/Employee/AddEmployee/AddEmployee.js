import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import LeftArrow from "../../../../assets/images/aboutus_banner.png"
import { Input, Select, TextArea } from '../../../../Components/common';
import { STATUS_LIST } from '../../../../Constants/Contants.common';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import locales from '../../../../Constants/en.json';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// import { UserSave } from '../../../../services/userSave.service';
import './AddEmployee.scss';

const addEmployeeEditFormSchema = Yup.object({
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

function AddEmployee({ backHRM }) {
    const [roleList, setRoleList] = useState('');
    const [permission, setPermission] = useState([]);
    const [permissionCheck, setPermissionCheck] = useState([]);
    const [selectCountry, setSelectCountry] = useState('');
    const [userAdded, setUserAdded] = useState(false);
    // const data = useSelector(state => state?.userSaveList?.data);
    const [errorModal, SetErrorModal] = useState(false);
    const [errorModalMsg, SetErrorModalMsg] = useState(false);
    const [suggestionList, setSuggestionList] = useState([]);
    const navigate = useNavigate();

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
        useFormik({
            initialValues: addUserInitialValues,
            // validationSchema: addUserEditFormSchema,
            validateOnChange: true,
            validateOnBlur: false,
            enableReinitialize: true,
            onSubmit: (values, action) => {
                // handleFormSubmit(values);
                action.resetForm();
                setPermissionCheck([]);
                setPermission([]);
                backHRM();
            },
        });

    // const handleFormSubmit = async values => {
    //     UserSave(values, selectCountry, permissionCheck).then(response => {
    //         if (response && response.status == true) {
    //             setUserAdded(true);
    //         } else if (response && response.status == false) {
    //             SetErrorModal(true);
    //             SetErrorModalMsg(response?.message && response.message);
    //         }
    //     });
    // };

    // const handleRole = event => {
    //     const { name, value } = event.target;
    //     setFieldValue(name, value);
    //     handleChange(event);
    //     if (value) {
    //         let permissionFilter;
    //         permissionFilter = data.rolePermissionList.filter((item, index) => {
    //             if (item._id == value) {
    //                 return item;
    //             }
    //         });
    //         if (permissionFilter && permissionFilter.length > 0) {
    //             setPermission(permissionFilter[0].permissions);
    //         }
    //     }
    // };

    // const handleCountry = event => {
    //     const { name, value } = event.target;
    //     setFieldValue(name, value);
    //     handleChange(event);
    //     setSelectCountry(value);
    // };

    // const handleStatus = event => {
    //     const { name, value } = event.target;
    //     setFieldValue(name, value);
    //     handleChange(event);
    // };

    // const handleManagePermission = event => {
    //     const { name } = event.target;
    //     if (permissionCheck.includes(name)) {
    //         setPermissionCheck([]);
    //     } else {
    //         setPermissionCheck([...permissionCheck, name]);
    //     }
    // };

    // const handleDialogClose = () => {
    //     setUserAdded(false);
    // };

    // const handleModalErrorPopUP = () => {
    //     SetErrorModal(false);
    // };

    // const handleSearchEmployee = event => {
    //     const { name, value } = event.target;
    //     setFieldValue(name, value);
    //     handleChange(event);
    //     if (value !== '' && value.length >= 3) {
    //         setTimeout(() => {
    //             UserListSearch(value).then(response => {
    //                 if (response && response.status == true) {
    //                     setSuggestionList(response?.data?.employees);
    //                 }
    //             });
    //         }, 1000);
    //     } else if (value == '' && value.length < 3) {
    //         setSuggestionList([]);
    //     }
    // };

    // const handleSelectSuggetion = (id, name) => {
    //     console.log('selectsuggest', id, name);
    // };

    // useEffect(() => {
    //     let rolelistData = [];
    //     data.rolePermissionList &&
    //         data.rolePermissionList.length > 0 &&
    //         data.rolePermissionList.map(item => {
    //             rolelistData.push({ id: item._id, value: item.name });
    //         });
    //     setRoleList(rolelistData);
    // }, []);

    // console.log('suggestion', suggestionList);

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
                        <h4 className='title'>Add Employee</h4>
                    </form>
                </div>         
            </div>
          

           
        </React.Fragment>
    );
}

export default AddEmployee;
