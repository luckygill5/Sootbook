import React, { useState, useEffect, useRef } from 'react';
import Pen from "../../../../assets/images/pen.svg";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import locales from "../../../../Constants/en.json";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './RolePrivilege.scss'

function RolePrivilege(props) {
    const [editMode, setEditMode] = useState(false);

    const handleEdit = () => {
        setEditMode(true)
    }

    const handleSubmit = () => {
        setEditMode(false)
    }

    return (
        <div className='rolePrivilege_container'>

            {editMode ? <div className='editMode'>

                <div className='form_container'>
                    <div className='input_flexBox col-2'>
                        <div className='selectBox'>
                            <label className='mandate'>Role</label>
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
                            <label>Status</label>
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
                    <div className='input_flexBox w-50'>
                        <div className='input_box'>
                            <label>Contract Date</label>
                            <input type='text' className='input_element' placeholder='24-02-2024'></input>
                        </div>

                    </div>
                    <div className='privilege_section'>
                        <h5 className='title'>Privileges</h5>
                        <ul className='check_listing'>
                            <li className='check_item'>
                                <FormControlLabel control={<Checkbox />} label="Ability to create and manage vendor profiles." />
                            </li>
                            <li className='check_item'>
                                <FormControlLabel control={<Checkbox />} label="View and update inventory levels, track production." />
                            </li>
                            <li className='check_item'>
                                <FormControlLabel control={<Checkbox />} label="Monitor the status of shipments." />
                            </li>
                        </ul>
                    </div>
                    <div className='button-container'>
                        <button className='saveBtn' onClick={() => handleSubmit()}>Save</button>
                    </div>
                </div>
            </div> : <React.Fragment>
                <div className='header_flex'>
                    <h5 className='title'>Role and Privileges</h5>
                    <button className='edit_btn' onClick={() => handleEdit()}>
                        <span className='icon'>
                            <img src={Pen} alt="edit"></img>
                        </span>
                        {locales.edit_title}
                    </button>
                </div>
                <ul className='data_listing'>
                    <li className='list_item'><span className='label'>Role</span><span className='value'>Manager</span></li>
                    <li className='list_item'><span className='label'>Status</span><span className='value'>Active</span></li>
                    <li className='list_item'><span className='label'>Contract Date</span><span className='value'>24-02-2024</span></li>
                    <li className='list_item'><span className='label'>Privileges</span>
                        <span className='value'>
                            <ul className='check_listing'>
                                <li className='check_item'>
                                    <FormControlLabel control={<Checkbox />} label="Ability to create and manage vendor profiles." />
                                </li>
                                <li className='check_item'>
                                    <FormControlLabel control={<Checkbox />} label="View and update inventory levels, track production." />
                                </li>
                                <li className='check_item'>
                                    <FormControlLabel control={<Checkbox />} label="Monitor the status of shipments." />
                                </li>
                            </ul>
                        </span></li>

                </ul>

            </React.Fragment>
            }
        </div>
    )

}

export default RolePrivilege