import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import locales from "../../../../../Constants/en.json";
import { ReactComponent as Arrow } from "../../../../../assets/images/chevron-down.svg";
import "../ContractContent.scss"


function StatutoryDeductions(props) {

    return (
        <div className='satutoryDeductions_container'>
             {
               props.mode ? (
                <div className='search_fieldbox'>
                    <input type='text' className='search_input' placeholder='Search Preline'></input>
                </div>
               ) : null 
            }
               <div className='table_section'>
                <div className='table_container'>
                <div className='table_head'>
                    <div className='row col-3'>
                        <div className='thead'>
                            <span className='text'>Title</span>
                            <div className='sort'>
                                <span className='up_icon'>
                                    <Arrow/>
                                </span>
                                <span className='down_icon'>
                                <Arrow/>
                                </span>
                            </div>
                        </div>
                        <div className='thead'>
                        <span className='text'>Amount</span>
                            <div className='sort'>
                                <span className='up_icon'>
                                    <Arrow/>
                                </span>
                                <span className='down_icon'>
                                <Arrow/>
                                </span>
                            </div>
                        </div>
                        <div className='thead'>
                        <span className='text'>Deduction Option</span>
                            <div className='sort'>
                                <span className='up_icon'>
                                    <Arrow/>
                                </span>
                                <span className='down_icon'>
                                <Arrow/>
                                </span>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className='table_body'>
                    <div className='no_record'>
                    No records available
                    </div>
                </div>
                </div>
                <div className='pagination_container'>
                    <div className='navigation'>
                        <ul className='count_list'>
                            <li>
                                <span className='arrow_prev'><Arrow/></span>
                            </li>
                            <li>
                            <span className='count selected'>1</span>
                            </li>
                            <li>
                            <span className='count'>2</span>
                            </li>
                            <li>
                            <span className='count'>3</span>
                            </li>
                            <li>
                            <span className='count'>...</span>
                            </li>
                            <li>
                                <span className='count'>10</span>
                            </li>
                            <li>
                            <span className='arrow_next'><Arrow/></span>
                            </li>
                        </ul>
                        <Select
                                    className="select_pageBox"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={countryselectedData}
                                    label="Age"
                                //  onChange={handleChange}
                                >
                                    <MenuItem name="Single" value="Startup">5 page</MenuItem>
                                    <MenuItem name="Married" value="Startup">10 page</MenuItem>
                                </Select>
                    </div>
                    <div className='gotopage'>
                        <span className='label'>Go to</span>
                        <input className='gotoInput' type='text'></input>
                        <span className='label'>page</span>
                    </div>
                </div>
            </div>
            {
                props.mode ? (
                    <div className='form_container'>
                        <div className='input_flexbox col-3'>
                            <div className='selectBox'>
                                <label className='mandate'>Commission Option</label>
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
                            <div className='input_box'>
                                <label className='mandate'>Title</label>
                                <input type='text' className='input_element' placeholder='Title'></input>
                            </div>
                            <div className='selectBox'>
                                <label className='mandate'>Amount Option</label>
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
                        <div className='button-container'>
                                <button className='saveBtn'>Save</button>
                            </div>
                    </div>
                ) : (
                    <ul className='data_listing'>
                        <li className='list_item'><span className='label'>Deduction Option</span><span className='value'>Morning Shift</span></li>
                        <li className='list_item'><span className='label'>Title</span><span className='value'>Title</span></li>
                        <li className='list_item'><span className='label'>Amount</span><span className='value'>$1000</span></li>
                    </ul>
                )
            }
        </div>
    )
}

export default StatutoryDeductions;