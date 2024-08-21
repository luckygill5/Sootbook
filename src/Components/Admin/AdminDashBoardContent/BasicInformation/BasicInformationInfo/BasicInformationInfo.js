import React, { useState, useEffect } from 'react';
import locales from "../../../../../Constants/en.json";
import Pen from "../../../../../assets/images/pen.svg";
import Avtar from "../../../../../assets/images/avatar-large.png";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "../BasicInformation.scss"


function BasicInformationInfo(props) {
    const data = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [readMode, setReadMode] = useState(true)

    return (
        <React.Fragment>
            <div className='basicInformation_info_container'>
                <div className='haeder_section'>
                    {readMode ? <><h5 className='title'>Basic Information</h5>
                        <button className='edit_btn' onClick={() => setReadMode(false)}>
                            <span className='icon'>
                                <img src={Pen} alt="edit"></img>
                            </span>
                            {locales.edit_title}
                        </button></> : null}
                </div>
                <div className='body_section'>
                    {readMode ?
                        <div className='read_mode'>
                            <div className='profile_listing_data'>
                                <ul>
                                    <li className='list_item'>
                                        <span className='label'>Profile pictiure</span>
                                        <span className='value'>
                                            <div className='avatar_iconblock'>
                                                <img src={Avtar} alt="avtar"></img>
                                            </div>
                                        </span>
                                    </li>
                                    <li className='list_item'>
                                        <span className='label'>First Name</span>
                                        <span className='value'>Alex</span>
                                    </li>
                                    <li className='list_item'>
                                        <span className='label'>Last Name</span>
                                        <span className='value'>Black</span>
                                    </li>
                                    <li className='list_item'>
                                        <span className='label'>Contact Number</span>
                                        <span className='value'>+1 (000) 000-0000</span>
                                    </li>
                                    <li className='list_item'>
                                        <span className='label'>Gender</span>
                                        <span className='value'>Male</span>
                                    </li>
                                    <li className='list_item'>
                                        <span className='label'>User ID</span>
                                        <span className='value'>306776</span>
                                    </li>
                                    <li className='list_item'>
                                        <span className='label'>Date of Birth</span>
                                        <span className='value'>Date of Birth</span>
                                    </li>
                                    <li className='list_item'>
                                        <span className='label'>Marital Status</span>
                                        <span className='value'>Single</span>
                                    </li>
                                    <li className='list_item'>
                                        <span className='label'>State / Province</span>
                                        <span className='value'>State / Province</span>
                                    </li>
                                    <li className='list_item'>
                                        <span className='label'>City</span>
                                        <span className='value'>City</span>
                                    </li>
                                    <li className='list_item'>
                                        <span className='label'>Zip Code / Postal Code</span>
                                        <span className='value'>Zip Code / Postal Code</span>
                                    </li>
                                    <li className='list_item'>
                                        <span className='label'>Religion</span>
                                        <span className='value'>Religion</span>
                                    </li>
                                    <li className='list_item'>
                                        <span className='label'>Blood Group</span>
                                        <span className='value'>Blood Group</span>
                                    </li>
                                    <li className='list_item'>
                                        <span className='label'>Nationality</span>
                                        <span className='value'>Nationality</span>
                                    </li>
                                    <li className='list_item'>
                                        <span className='label'>Citizenship</span>
                                        <span className='value'>Citizenship</span>
                                    </li>
                                    <li className='list_item'>
                                        <span className='label'>Address Line 1</span>
                                        <span className='value'>Address Line 1</span>
                                    </li>
                                    <li className='list_item'>
                                        <span className='label'>Address Line 2</span>
                                        <span className='value'>Address Line 2</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        :
                        <div className='edit_mode'>
                            <div className='form_container'>
                                <div className='profile_uplodSection'>
                                    <label>Profile Picture</label>
                                    <div className='flexbox'>
                                        <span className='avtaar'>
                                            <img src={Avtar} alt="profile_icon"></img>
                                        </span>
                                        <button className='uploadbtn'>Upload new picture</button>
                                        <button className='deleteBtn'>Delete</button>
                                    </div>
                                </div>
                                <div className='input_flexbox'>
                                    <div className='input_box'>
                                        <label>First Name</label>
                                        <input type="text" className='input_element' placeholder='Alex'></input>
                                    </div>
                                    <div className='input_box'>
                                        <label>Last Name</label>
                                        <input type="text" className='input_element' placeholder='Black'></input>
                                    </div>
                                </div>
                                <div className='input_flexbox'>
                                    <div className='input_box'>
                                        <label>Contact Number</label>
                                        <div className='countrySelectobox'>
                                        <Select
                                            className="countryselect_fieldBox"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={countryselectedData}
                                            label="Age"
                                        //  onChange={handleChange}
                                        >
                                            <MenuItem name="Single" value="Single">US</MenuItem>
                                            <MenuItem name="Married" value="Single">IND</MenuItem>
                                        </Select>
                                        <input type='text' className='countryInput' placeholder='+1 (000) 000-0000'></input>
                                            </div>
                                    </div>
                                    <div className='input_box'>
                                        <label>Gender</label>
                                        <input type="text" className='input_element' placeholder='Male'></input>
                                    </div>
                                </div>
                                <div className='input_flexbox'>
                                    <div className='input_box'>
                                        <label>Employee ID</label>
                                        <input type="text" className='input_element' placeholder='306776'></input>
                                    </div>
                                    <div className='input_box'>
                                        <label>Date of Birth</label>
                                        <input type="text" className='input_element' placeholder='Date of Birth'></input>
                                    </div>
                                </div>
                                <div className='input_flexbox'>
                                    <div className='input_box'>
                                        <label>Marital Status</label>
                                        <Select
                                            className="select_fieldBox"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={countryselectedData}
                                            label="Age"
                                        //  onChange={handleChange}
                                        >
                                            <MenuItem name="Single" value="Single">Single</MenuItem>
                                            <MenuItem name="Married" value="Single">Married</MenuItem>
                                        </Select>
                                    </div>
                                    <div className='input_box'>
                                        <label>State / Province</label>
                                        <input type="text" className='input_element' placeholder='State / Province'></input>
                                    </div>
                                </div>
                                <div className='input_flexbox'>
                                    <div className='input_box'>
                                        <label>City</label>
                                        <input type="text" className='input_element' placeholder='City'></input>
                                    </div>
                                    <div className='input_box'>
                                        <label>Zip Code / Postal Code</label>
                                        <input type="text" className='input_element' placeholder='Zip Code / Postal Code'></input>
                                    </div>
                                </div>
                                <div className='input_flexbox'>
                                    <div className='input_box'>
                                        <label>Religion</label>
                                        <Select
                                            className="select_fieldBox"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={countryselectedData}
                                            label="Age"
                                        //  onChange={handleChange}
                                        >
                                            <MenuItem name="Single" value="Single">Hindu</MenuItem>
                                            <MenuItem name="Married" value="Single">Muslim</MenuItem>
                                        </Select>
                                    </div>
                                    <div className='input_box'>
                                        <label>Blood Group</label>
                                        <Select
                                            className="select_fieldBox"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={countryselectedData}
                                            label="Age"
                                        //  onChange={handleChange}
                                        >
                                            <MenuItem name="Single" value="Single">b+</MenuItem>
                                            <MenuItem name="Married" value="Single">AB+</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                                <div className='input_flexbox'>
                                    <div className='input_box'>
                                        <label>Nationality</label>
                                        <Select
                                            className="select_fieldBox"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={countryselectedData}
                                            label="Age"
                                        //  onChange={handleChange}
                                        >
                                            <MenuItem name="Single" value="Single">Indian</MenuItem>
                                            <MenuItem name="Married" value="Single">Others</MenuItem>
                                        </Select>
                                    </div>
                                    <div className='input_box'>
                                        <label>Citizenship</label>
                                        <Select
                                            className="select_fieldBox"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // value={countryselectedData}
                                            label="Age"
                                        //  onChange={handleChange}
                                        >
                                            <MenuItem name="Single" value="Single">Blood Group</MenuItem>
                                            <MenuItem name="Married" value="Single">Blood Group</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                                <div className='input_flexbox'>
                                    <div className='input_box'>
                                        <label>Address Line 1</label>
                                        <input type="text" className='input_element' placeholder='Address Line 1'></input>
                                    </div>
                                    <div className='input_box'>
                                        <label>Address Line 2</label>
                                        <input type="text" className='input_element' placeholder='Address Line 2'></input>
                                    </div>
                                </div>

                                <div className='button_container'>
                                    <button className='cancelBtn'>Cancel</button>
                                    <button className='savebtn'>Save</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </React.Fragment>
    )

}

export default BasicInformationInfo;