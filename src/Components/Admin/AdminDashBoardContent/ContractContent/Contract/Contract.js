import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import locales from "../../../../../Constants/en.json";
import "../ContractContent.scss"


function Contract(props) {

    return (
        <div className='contract_container'>
            {
                props.mode ? (
                    <div className='editMode'>
                        <div className='form_container'>
                        <div className='input_box col-5'>
                                <label className='mandate'>Contract Date</label>
                                <input type='text' placeholder='24-02-2024' className='input_element'></input>
                            </div>
                            <div className='input_flexbox col-2'>
                                <div className='selectBox'>
                                    <label className='mandate'>Department</label>
                                    <Select
                                        className="select_inputBox"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={countryselectedData}
                                        label="Age"
                                    //  onChange={handleChange}
                                    >
                                        <MenuItem name="Single" value="Startup">Startup</MenuItem>
                                        <MenuItem name="Married" value="Startup">Startup</MenuItem>
                                    </Select>
                                </div>
                                <div className='selectBox'>
                                    <label className='mandate'>Designation</label>
                                    <Select
                                        className="select_inputBox"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={countryselectedData}
                                        label="Age"
                                    //  onChange={handleChange}
                                    >
                                        <MenuItem name="Single" value="Startup">Startup</MenuItem>
                                        <MenuItem name="Married" value="Startup">Startup</MenuItem>
                                    </Select>
                                </div>
                            </div>
                            <div className='input_flexbox col-3'>
                                <div className='selectBox'>
                                    <label className='mandate'>Basic Salary</label>
                                    <Select
                                        className="select_inputBox"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={countryselectedData}
                                        label="Age"
                                    //  onChange={handleChange}
                                    >
                                        <MenuItem name="Single" value="Startup">Startup</MenuItem>
                                        <MenuItem name="Married" value="Startup">Startup</MenuItem>
                                    </Select>
                                </div>
                                <div className='selectBox'>
                                    <label>Hourly Rate</label>
                                    <Select
                                        className="select_inputBox"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={countryselectedData}
                                        label="Age"
                                    //  onChange={handleChange}
                                    >
                                        <MenuItem name="Single" value="Startup">Startup</MenuItem>
                                        <MenuItem name="Married" value="Startup">Startup</MenuItem>
                                    </Select>
                                </div>
                                <div className='selectBox'>
                                    <label className='mandate'>Payslip Type</label>
                                    <Select
                                        className="select_inputBox"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={countryselectedData}
                                        label="Age"
                                    //  onChange={handleChange}
                                    >
                                        <MenuItem name="Single" value="Startup">Startup</MenuItem>
                                        <MenuItem name="Married" value="Startup">Startup</MenuItem>
                                    </Select>
                                </div>
                            </div>
                            <div className='input_box col-12'>
                                <label >Leave Categories</label>
                                <input type='text' placeholder='24-02-2024' className='input_element'></input>
                                <span className='info'>If All is selected, then all leave categories will show to employee which are added in the system.</span>
                            </div>
                            <div className='input_box'>
                                <label className='mandate'>Role Description</label>
                                <textarea placeholder='Enter role description here..' className='textareaInput'></textarea>
                            </div>
                            <div className='button-container'>
                                <button className='saveBtn' onClick={() => props.submit()}>Save</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <ul className='data_listing'>
                        <li className='list_item'><span className='label'>Contract date</span><span className='value'>24/02/2024</span></li>
                        <li className='list_item'><span className='label'>Department</span><span className='value'>Human resources</span></li>
                        <li className='list_item'><span className='label'>Basic salary</span><span className='value'>$1500</span></li>
                        <li className='list_item'><span className='label'>Hourly Rate</span><span className='value'>$10.00</span></li>
                        <li className='list_item'><span className='label'>Payslip Type</span><span className='value'>Per Month</span></li>
                        <li className='list_item'><span className='label'>Office Shift</span><span className='value'>Morning Shift</span></li>
                        <li className='list_item'><span className='label'>Contract End</span><span className='value'>Date Of Leaving</span></li>
                        <li className='list_item'><span className='label'>Categories</span><span className='value'><div className='badge green'>Badge</div></span></li>
                        <li className='list_item'><span className='label'>Role Description</span><span className='value'>Description</span></li>
                    </ul>
                )
            }
        </div>
    )
}

export default Contract