import React, { useState, useEffect, useRef } from 'react';
import Pen from "../../../../assets/images/pen.svg";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import locales from "../../../../Constants/en.json";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DataList, Input, Select } from '../../../common';
import './RolePrivilege.scss'

function RolePrivilege(props) {
    const [editMode, setEditMode] = useState(false);

    const handleEdit = () => {
        setEditMode(true)
    }

    const handleSubmit = () => {
        setEditMode(false)
    }

    const rolePrivilegeData = [
        { label: "Role", value: "Manager" },
        { label: "Status", value: "Active" },
        { label: "Contract Date", value: "24-02-2024" },
        {
            label: "Privileges", value: "", CheckList: true, ChecklistClass: "check_listing", CheckListData: [
                { label: "Ability to create and manage vendor profiles." },
                { label: "View and update inventory levels, track production." },
                { label: "Monitor the status of shipments." },

            ]
        },
    ]
    return (
        <div className='rolePrivilege_container'>

            {editMode ? <div className='editMode'>

                <div className='form_container'>
                    <form>
                        <div className='input_flexBox col-2'>
                            <Select
                                label={'Role'}
                                name={'Role'}
                                value={'Startup'}
                                options={[
                                    { id: 'Startup', value: 'Startup' },
                                    { id: 'Startup', value: 'Startup' },
                                    { id: 'Startup', value: 'Startup' },
                                ]}
                                wrapperClass={'col6'}
                                onChange={() => { }}
                                isRequired
                            />
                            {/* <div className='selectBox'>
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
                        </div> */}
                            <Select
                                label={'Status'}
                                name={'Status'}
                                value={'Startup'}
                                options={[
                                    { id: 'Startup', value: 'Startup' },
                                    { id: 'Startup', value: 'Startup' },
                                    { id: 'Startup', value: 'Startup' },
                                ]}
                                wrapperClass={'col6'}
                                onChange={() => { }}

                            />
                        </div>
                        <div className='input_flexBox w-50'>
                            <Input
                                label={'Contract Date'}
                                type={'text'}
                                placeholder={'24-02-2024'}
                                name={'ContractDate'}
                                id={'title'}
                                value={'Title'}
                                wrapperClass={'col12'}
                                onChange={() => { }}
                                isRequired
                            />
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
                    </form>
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
                <DataList config={rolePrivilegeData} />
            </React.Fragment>
            }
        </div>
    )

}

export default RolePrivilege