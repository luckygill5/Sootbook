import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import swal from 'sweetalert';
import { isEmpty } from 'lodash';
import { useFormik } from "formik";
import classNames from 'classnames';
import { DatePicker, Input, Select, MyUploadButton } from "../../../Components/common";
import { BLOOD_GROUP_LIST,  COUNTRIES_LIST, NATIONALITY_LIST, RELIGION_LIST } from "../../../Constants/Contants.common"; 
import Avtar from "../../../assets/images/avatar-large.png";
import "./BasicInformation.scss";
import { EmployeeSaveList } from "../../Services/employeeSaveList.service";
import { useSelector } from "react-redux";
import { UserListSearch } from "../../../services/UserEmployeeSearch.service";
import locales from "../../../Constants/en.json";

const basicInformationEditFormSchema = Yup.object({
  first_name: Yup.string().required("Full Name is required."),
  phone: Yup.string().required("Contact Number is required."),
  email: Yup.string().required("Email Id is required."),
password :Yup.string().required("Password is required"),
  empId: Yup.string().required("Employee Id is required."),
  dob: Yup.string().required("Date of Birth is required.")
});

const basicInformationInitialValues = {
  first_name: "",
  last_name: "",
  email:"",
  phone: "",
  gender: "male",
  empId: "",
  password:"",
  dob: "",
  martial_status: "Single",
  state: "",
  city: "",
  postal: "",
  religion: "Hinduism",
  blood_group: "A+",
  nationality: "Indian",
  citizenship: "India",
  address_1: "",
  address_2: "",
  avatar:"",
  country :"India",
};


function BasicInformation({ SetUserId, setReadMode, onTabChange, basicInformation, getBasicInfo,editUserData,handleBackHRM }) {
    const [files, setFiles] = useState([])

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
      console.log(values);

      

        EmployeeSaveList(values).then(response => {
            if (response && response.status == true) {
                setUserAdded(true);
                onTabChange(null,1);
                SetUserId(response?.data?.employee?._id);
                

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
                if (key === 'first_name') {
                    values[key] = emp['first_name'] + emp['last_name'];
                }
                if (key === 'userId') {
                    values[key] = emp['_id'];
                }
            }
            setFormDisabled(false);
        }
        setSearch('');
        setSuggestionList([]);
    };

    const { values, handleChange,handleBlur, handleSubmit, errors, touched, handleReset,setFieldValue } = useFormik({
        initialValues: basicInformationInitialValues,
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
                if (key === 'userId') {
                    values[key] = editUserData['_id'];
                }
            }
            setFormDisabled(false);
        }
    }, [editUserData])

  return (
    <React.Fragment>
        <form onSubmit={handleSubmit}>
          <div className="profile_uploadSection">
            <label>Profile Picture Hi</label>
            <div className="flexbox">
              <span className="avtaar">
                <img src={files[0]?.fileUrl || basicInformation?.avatar || Avtar} alt="profile_icon"></img>
              </span>
              <button className="uploadbtn" type="button">
                Upload new picture
                <MyUploadButton setFiles={setFiles} />
              </button>
              <button className="deleteBtn" onClick={() => setFiles([])}>Delete</button>
            </div>
          </div>

          <div className="input_flexbox">
            <Input
              label={"Name"}
              type={"text"}
              name={"first_name"}
              id={"first_name"}
              wrapperClass={"col6"}
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              isRequired
              error={errors.name}
              touched={touched.name}
            />
            <Input
              label={"Email"}
              type={"text"}
              name={"email"}
              id={"email"}
              // wrapperClass={"col6"}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isRequired
              error={errors.email}
              touched={touched.email}
            />
            <Input
             label={"Password"}
             type={"text"}
             name={"password"}
             id={"password"}
             wrapperClass={"col4"}
             value={values?.password}
             onChange={handleChange}
             onBlur={handleBlur}
             isRequired
             error={errors?.password}
             touched={touched?.password}/> 
            <Select
              label={"Gender"}
              name={"gender"}
              options={[
                { id: "Male", value: "Male" },
                { id: "Female", value: "Female" },
                { id: "Other", value: "Other" },
              ]}
              // wrapperClass={"col6"}
              value={values.gender}
              onChange={handleChange}
            />
          </div>

          <div className="input_flexbox">
            <Input
              label={"Employee ID"}
              type={"text"}
              name={"empId"}
              id={"empId"}
              wrapperClass={"col6"}
              value={values.empId}
              onChange={handleChange}
              onBlur={handleBlur}
              isRequired
              error={errors.empId}
              touched={touched.empId}
            />
           <Input
              label={"City"}
              type={"text"}
              name={"city"}
              id={"city"}
              wrapperClass={"col6"}
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
                                label={'Contact Number'}
                                type={'text'}
                                name={'phone'}
                                id={'phone'}
                                value={values.phone}
                                placeholder={'Contact Number'}
                                wrapperClass={'col6'}
                                onChange={handleChange}
                                isRequired

                            />
            <DatePicker
              label={'Date of Birth'}
              wrapperClass={'col6'}
              dateFormat={'dd/MM/yyyy'}
              name={'dob'}
              value={values.contract_start}
              onChange={({ name, value }) => setFieldValue(name, value)}
              isRequired
              error={errors.contract_start}
              touched={touched.contract_start}
            />
            
          </div>
          <div className="input_flexbox">
            <Select
              label={"Marital Status"}
              name={"martial_status"}
              options={[
                { id: "Single", value: "Single" },
                { id: "Married", value: "Married" },
              ]}
              // wrapperClass={"col6"}
              value={values.martial_status}
              onChange={handleChange}
            />
            <Input
              label={"State / Province"}
              type={"text"}
              name={"state"}
              id={"state"}
              wrapperClass={"col6"}
              value={values.state}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Select
              label={"Citizenship"}
              name={"citizenship"}
              options={COUNTRIES_LIST}
              wrapperClass={"col6"}
              value={values.citizenship}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
         
          <div className="input_flexbox">
          <Select
              label={"Nationality"}
              name={"nationality"}
              options={NATIONALITY_LIST}
              wrapperClass={"col6"}
              value={values.nationality}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            
            <Select
              label={"Religion"}
              name={"religion"}
              options={RELIGION_LIST}
              wrapperClass={"col6"}
              value={values.religion}
              onChange={handleChange}
            />
            <Select
              label={"Blood Group"}
              name={"blood_group"}
              options={BLOOD_GROUP_LIST}
              wrapperClass={"col6"}
              value={values.blood_group}
              onChange={handleChange}
            />
          </div>
          <div className="input_flexbox">
          <Input
              label={"Zip Code / Postal Code"}
              type={"text"}
              name={"postal"}
              id={"postal"}
              wrapperClass={"col6"}
              value={values.postal}
              onChange={handleChange}
              onBlur={handleBlur}
            />
             <Input
              label={"Address Line 1"}
              type={"text"}
              name={"address_1"}
              id={"address_1"}
              wrapperClass={"col6"}
              value={values.address_1}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              label={"Address Line 2"}
              type={"text"}
              name={"address_2"}
              id={"address_2"}
              wrapperClass={"col6"}
              value={values.address_2}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            
          </div>

          <div className="bottom_actions">
            <button className="cancelBtn" onClick={() => handleBackHRM()}>
            {locales.cancel_label}
            </button>
            <button onClick={handleSubmit} className='saveBtn'
                            >
                                {locales.save_label}</button>
          </div>
        </form>
      
    </React.Fragment>
  );
}

export default BasicInformation;
