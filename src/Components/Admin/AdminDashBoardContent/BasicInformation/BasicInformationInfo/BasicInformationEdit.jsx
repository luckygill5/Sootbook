import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Avtar from "../../../../../assets/images/avatar-large.png";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Input, Select as MySelect } from "../../../../common";
import "../BasicInformation.scss";

const basicInformationEditFormSchema = Yup.object({
  full_name: Yup.string().required("Full Name is required."),
  email: Yup.string()
    .email("Email must be valid")
    .required("Email is required."),
  country: Yup.object().required("Country is required."),
  university: Yup.object().required("University is required."),
});
function BasicInformationEdit({ setReadMode }) {
  // const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
  //   useFormik({
  //     initialValues,
  //     validationSchema: editFormSchema,
  //     validateOnChange: true,
  //     validateOnBlur: false,
  //     enableReinitialize: true,
  //     onSubmit: (values, action) => {
  //       const changedValues = getChangedValues(values, initialValues);
  //       if (!isEmptyObject(changedValues)) {
  //         handleFormSubmit(changedValues);
  //         action.resetForm();
  //       }
  //     },
  //   });

  // useEffect(() => {
  //   const countryCodeOptions = getCountryCode(countries);
  //   setCountryCodes(countryCodeOptions);
  //   axiosClient.get("/universities").then((res) => {
  //     setUniversities(res.data);
  //   });
  // }, []);

  return (
    <React.Fragment>
      <div className="form_container">
        <form>
          <div className="profile_uplodSection">
            <label>Profile Picture</label>
            <div className="flexbox">
              <span className="avtaar">
                <img src={Avtar} alt="profile_icon"></img>
              </span>
              <button className="uploadbtn">Upload new picture</button>
              <button className="deleteBtn">Delete</button>
            </div>
          </div>

          <div className="input_flexbox">
            <Input
              label={"First Name"}
              type={"text"}
              name={"first_name"}
              id={"first_name"}
              placeholder={"Alex"}
              wrapperClass={"col6"}
              onChange={() => { }}
            />
            <Input
              label={"Last Name"}
              type={"text"}
              name={"last_name"}
              id={"last_name"}
              placeholder={"Black"}
              wrapperClass={"col6"}
              onChange={() => { }}
            />
          </div>
          <div className="input_flexbox">
            <div className="inputField">
              <label>Contact Number</label>
              <div className="countrySelectobox">
                <Select
                  className="countryselect_fieldBox"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem name="Single" value="Single">
                    US
                  </MenuItem>
                  <MenuItem name="Married" value="Single">
                    IND
                  </MenuItem>
                </Select>
                <input
                  type="text"
                  className="countryInput"
                  placeholder="+1 (000) 000-0000"
                ></input>
              </div>
            </div>
            <Input
              label={"Gender"}
              type={"text"}
              name={"gender"}
              id={"gender"}
              placeholder={"Male"}
              wrapperClass={"col6"}
              onChange={() => { }}
            />
          </div>
          <div className="input_flexbox">
            <Input
              label={"Employee ID"}
              type={"text"}
              name={"employeeID"}
              id={"employeeID"}
              placeholder={"306776"}
              wrapperClass={"col6"}
              onChange={() => { }}
            />
            <Input
              label={"Date of Birth"}
              type={"text"}
              name={"dob"}
              id={"dob"}
              placeholder={"Date of Birth"}
              wrapperClass={"col6"}
              onChange={() => { }}
            />
          </div>
          <div className="input_flexbox">
            <MySelect
              label={"Marital Status"}
              name={"maritalStatus"}
              value={"Hindu"}
              options={[
                { id: "Single", value: "Single" },
                { id: "Married", value: "Married" },
              ]}
              wrapperClass={"col6"}
              onChange={() => { }}
            />
            <Input
              label={"State / Province"}
              type={"text"}
              name={"state"}
              id={"state"}
              placeholder={"State / Province"}
              wrapperClass={"col6"}
              onChange={() => { }}
            />
          </div>
          <div className="input_flexbox">
            <Input
              label={"City"}
              type={"text"}
              name={"city"}
              id={"city"}
              placeholder={"City"}
              wrapperClass={"col6"}
              onChange={() => { }}
            />
            <Input
              label={"Zip Code / Postal Code"}
              type={"text"}
              name={"zipCode"}
              id={"zipCode"}
              placeholder={"Zip Code / Postal Code"}
              wrapperClass={"col6"}
              onChange={() => { }}
            />
          </div>
          <div className="input_flexbox">
            <MySelect
              label={"Religion"}
              name={"religion"}
              value={"Hindu"}
              options={[
                { id: "Hindu", value: "Hindu" },
                { id: "Muslim", value: "Muslim" },
              ]}
              wrapperClass={"col6"}
              onChange={() => { }}
            />
            <MySelect
              label={"Blood Group"}
              name={"bloodGroup"}
              value={"Indian"}
              options={[
                { id: "b+", value: "b+" },
                { id: "AB+", value: "AB+" },
              ]}
              wrapperClass={"col6"}
              onChange={() => { }}
            />
          </div>
          <div className="input_flexbox">
            <MySelect
              label={"Nationality"}
              name={"nationality"}
              value={"Indian"}
              options={[
                { id: "Indian", value: "Indian" },
                { id: "Arab", value: "Arab" },
                { id: "American", value: "American" },
              ]}
              wrapperClass={"col6"}
              onChange={() => { }}
            />
            <MySelect
              label={"Citizenship"}
              name={"citizenship"}
              value={"Indian"}
              options={[
                { id: "Indian", value: "Indian" },
                { id: "Arab", value: "Arab" },
                { id: "American", value: "American" },
              ]}
              wrapperClass={"col6"}
              onChange={() => { }}
            />
          </div>
          <div className="input_flexbox">
            <Input
              label={"Address Line 1"}
              type={"text"}
              name={"addressLine1"}
              id={"addressLine1"}
              placeholder={"Address Line 1"}
              wrapperClass={"col6"}
              onChange={() => { }}
            />
            <Input
              label={"Address Line 2"}
              type={"text"}
              name={"addressLine2"}
              id={"addressLine2"}
              placeholder={"Address Line 2"}
              wrapperClass={"col6"}
              onChange={() => { }}
            />
          </div>

          <div className="button_container">
            <button className="cancelBtn" onClick={() => setReadMode(true)}>
              Cancel
            </button>
            <button className="savebtn">Save</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default BasicInformationEdit;
