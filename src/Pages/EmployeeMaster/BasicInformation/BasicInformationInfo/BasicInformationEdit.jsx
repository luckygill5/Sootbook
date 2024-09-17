import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import swal from 'sweetalert';
import { isEmpty } from 'lodash';
import { useFormik } from "formik";
import { DatePicker, Input, Select, MyUploadButton } from "../../../../Components/common";
import { axiosClient } from "../../../../services/axiosClient";
import { BLOOD_GROUP_LIST,  COUNTRIES_LIST, NATIONALITY_LIST, RELIGION_LIST } from "../../../../Constants/Contants.common"; 
import Avtar from "../../../../assets/images/avatar-large.png";
import "../BasicInformation.scss";


const basicInformationEditFormSchema = Yup.object({
  first_name: Yup.string().required("Full Name is required."),
  last_name: Yup.string().required("Last Name is required."),
  phone: Yup.string().required("Contact Number is required."),
  empId: Yup.string().required("Employee Id is required."),
  dob: Yup.string().required("Date of Birth is required.")
});

const basicInformationInitialValues = {
  first_name: "",
  last_name: "",
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
  address_2: ""
};


function BasicInformationEdit({ setReadMode, basicInformation, getBasicInfo }) {
  const [files, setFiles] = useState([])
  const handleFormSubmit = async (values) => {
    console.log(values);
    if (basicInformation && !isEmpty(basicInformation)) {
      for (let key in basicInformationInitialValues) {
        basicInformationInitialValues[key] = basicInformation[key];
      }
    }
    try {
      const userid = JSON.parse(localStorage.getItem('profileData')).userId
      let response = await axiosClient.post(`admin/vendor/basicInfo/store`, JSON.stringify({ userId: userid, ...values }));
      if (response.status === 200) {
        swal("Success", "Basic Information updated successfully", "success", {
          buttons: false,
          timer: 2000,
        })
          .then(() => {
            getBasicInfo();
            setReadMode(true)
          });
      }
    }
    catch (error) {
      swal("Failed", `Error Updating Basic Information`, "error")
    }
  }

  const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
      initialValues: basicInformationInitialValues,
      validationSchema: basicInformationEditFormSchema,
      validateOnChange: true,
      validateOnBlur: false,
      enableReinitialize: true,
      onSubmit: (values, action) => {
        handleFormSubmit(values);
        action.resetForm();
      },
    });

  useEffect(() => {
    // const countryCodeOptions = getCountryCode(countries);
    // setCountryCodes(countryCodeOptions);
    // axiosClient.get("/universities").then((res) => {
    //   setUniversities(res.data);
    // });
  }, []);

  return (
    <React.Fragment>
        <form onSubmit={handleSubmit}>
          <div className="profile_uploadSection">
            <label>Profile Picture</label>
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
              name={"name"}
              id={"name"}
              wrapperClass={"col6"}
              value={values.name}
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
              label={"Password"}
              type={"text"}
              name={"password"}
              id={"password"}
              wrapperClass={"col6"}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
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
              label={"City"}
              type={"text"}
              name={"city"}
              id={"city"}
              wrapperClass={"col6"}
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            
          </div>
          <div className="input_flexbox">
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

          <div className="button-container">
            <button className="cancelBtn" onClick={() => setReadMode(true)}>
              Cancel
            </button>
            <button className="savebtn" type="submit" onClick={handleSubmit}>Save</button>
          </div>
        </form>
      
    </React.Fragment>
  );
}

export default BasicInformationEdit;
