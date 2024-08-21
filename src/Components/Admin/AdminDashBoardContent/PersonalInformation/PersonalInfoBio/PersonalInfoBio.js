import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import locales from "../../../../../Constants/en.json";
import '../PersonalInformation.scss'

function PersonalInfoBio(props) {

    return (
        <React.Fragment>
            <div className='personalBioInfo_container'>
                {
                    props.mode ?(
                        <div className='editMode'>
                        <div className='form_container'>
                            <div className='input_box'>
                                <label>Bio</label>
                                <textarea placeholder='Enter staff bio here..' className='biotext'></textarea>
                                </div>
                                <div className='selectBox'>
                                    <label>Experience</label>
                                    <Select
                                            className="experienceselect_Box"
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
                                <div className='button-container'>
                                    <button className='saveBtn'>Save</button>
                                    </div>
                        </div>
                        </div>
                    ) :  (
                        <ul className='data_listing'>
                            <li className='list_item'><span className='label'>Bio</span><span className='value'>Enter staff bio here..</span></li>
                            <li className='list_item'><span className='label'>Experience</span><span className='value'>Startup</span></li>
                        </ul>
                    )  
                }
            </div>
        </React.Fragment>
    )
}

export default PersonalInfoBio;