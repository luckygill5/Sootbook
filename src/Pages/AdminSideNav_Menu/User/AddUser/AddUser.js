import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import LeftArrow from "../../../../assets/images/arrow-left.svg";
import { Input, Select, TextArea } from '../../../../Components/common';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import locales from "../../../../Constants/en.json"
import './AddUser.scss'


function AddUser({NewRole, backHRM}) {
    const navigate = useNavigate();

    return (
        <div className='addUser_container'>
            <div className='backHrm-link'>
                <button className='backBtn' type='button' onClick={() => backHRM()}><span className='icon'>
                    <img src={LeftArrow} alt="left-arrow" className='img_block'></img>
                </span>Back to HRM</button>
            </div>
            <div className='form_container'>
                <form>
                    <h4 className='title'>Add user</h4>
                    <div className='input_flexbox searchBox'>
                        <Input
                            label={"Search for the Employee by Name / Email"}
                            type={"text"}
                            name={"Search_employee"}
                            id={"Search_employee"}
                            wrapperClass={"col12"}
                            value={''}
                        //   onChange={handleChange}
                        //   onBlur={handleBlur}
                        //   isRequired
                        //   error={errors.first_name}
                        //   touched={touched.first_name}
                        />
                    </div>
                    <div className='input_flexbox'>
                        <Input
                            label={"Name"}
                            type={"text"}
                            name={"Name"}
                            id={"Name"}
                            wrapperClass={"col6"}
                            value={''}
                        //   onChange={handleChange}
                        //   onBlur={handleBlur}
                        //   isRequired
                        //   error={errors.first_name}
                        //   touched={touched.first_name}
                        />
                        <Input
                            label={"Email"}
                            type={"text"}
                            name={"Email"}
                            id={"Email"}
                            wrapperClass={"col6"}
                            value={''}
                        //   onChange={handleChange}
                        //   onBlur={handleBlur}
                        //   isRequired
                        //   error={errors.first_name}
                        //   touched={touched.first_name}
                        />
                    </div>
                    <div className='input_flexbox '>
                        <div className=' contactNumber col6'>
                        <label className='label'>Contact Number</label>
                        <div className='flexbox '>
                        <Select
                            label={""}
                            name={"country_code"}
                            options={[
                                { id: "IND", value: "IND" },
                                { id: "USA", value: "USA" },
                                { id: "ENG", value: "ENG" },
                            ]}
                            // isRequired
                            wrapperClass={"col2"}
                        //   value={values.gender}
                        //   onChange={handleChange}
                        />
                        <Input
                            label={""}
                            type={"text"}
                            name={"Contact_Number"}
                            id={"Contact_Number"}
                            wrapperClass={"col8"}
                            value={''}
                            placeholder={'+1 (000) 000-0000'}
                        //   onChange={handleChange}
                        //   onBlur={handleBlur}
                        //   isRequired
                        //   error={errors.first_name}
                        //   touched={touched.first_name}
                        />
                        </div>
                        </div>
                        <div className='role_control col6'>
                            <span className='ceate_role_link' onClick={() => NewRole()}>Create New Role</span>
                        <Select
                            label={"Role"}
                            name={"Role"}
                            options={[
                                { id: "Super Admin", value: "Super Admin" },
                                { id: "Admin", value: "Admin" },
                                { id: "other", value: "Other" },
                            ]}
                            isRequired
                            wrapperClass={"col12"}
                        //   value={values.gender}
                        //   onChange={handleChange}
                        />
                        </div>
                    </div>
                    <div className='input_flexbox'>
                        <TextArea
                            label={'Role Description'}
                            name={'role_description'}
                            // value={values.bio}
                            wrapperClass={'col6'}
                            // onChange={handleChange}
                            placeholder='Enter staff bio here..'
                        />
                        <Select
                            label={"Status"}
                            name={"Status"}
                            options={[
                                { id: "Select status", value: "Select status" },
                                { id: "Admin", value: "Admin" },
                                { id: "other", value: "Other" },
                            ]}
                            isRequired
                            wrapperClass={"col6"}
                        //   value={values.gender}
                        //   onChange={handleChange}
                        />
                    </div>
                    <div className='privileges_section'>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Create, edit, and delete user accounts" />
                            <FormControlLabel control={<Checkbox />} label="Assign and manage roles and permissions for all users" />
                            <FormControlLabel control={<Checkbox />} label="Reset passwords and manage account recovery" />
                        </FormGroup>
                    </div>
                    <div className='input_flexbox'>
                        <Input
                            label={"Password"}
                            type={"password"}
                            name={"password"}
                            id={"password"}
                            wrapperClass={"col12"}
                            value={''}
                            //   onChange={handleChange}
                            //   onBlur={handleBlur}
                            isRequired
                        //   error={errors.first_name}
                        //   touched={touched.first_name}
                        />
                        <Input
                            label={"Confirm Password"}
                            type={"password"}
                            name={"confirm_password"}
                            id={"confirm_password"}
                            wrapperClass={"col12"}
                            value={''}
                            //   onChange={handleChange}
                            //   onBlur={handleBlur}
                            isRequired
                        //   error={errors.first_name}
                        //   touched={touched.first_name}
                        />
                    </div>
                    <div className='bottom_actions'>
                        <button className='cancelBtn'>{locales.cancel_label}</button>
                        <button className='saveBtn'>{locales.save_label}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUser;