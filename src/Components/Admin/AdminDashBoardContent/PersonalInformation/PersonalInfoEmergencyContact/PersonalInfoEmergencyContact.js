import React, { useState, useEffect } from 'react';
import locales from "../../../../../Constants/en.json";
import '../PersonalInformation.scss'

function EmergencyContact(props){

    return (
        <div className='personalinfo_emergencycontact_container'>
            {
                props.mode ? (
                    <div className='editMode'>
                        <div className='form_container'>
                            <div className='input_box'>
                                <label>Full Name</label>
                                <input type='text' className='input_element' placeholder='Full Name'></input>
                        </div> 
                        <div className='input_flebox'>
                            <div className='flexItem'>
                            <div className='input_box'>
                                <label>Contact Number</label>
                                <input type='text' className='input_element' placeholder='Contact Number'></input>
                            </div>   
                            </div>
                            <div className='flexItem'>
                            <div className='input_box'>
                                <label>Email</label>
                                <input type='text' className='input_element' placeholder='Email'></input>
                            </div>   
                            </div>
                            </div>
                        <div className='input_box'>
                                <label>Address</label>
                                <textarea type='text' className='addressText' placeholder='Address'></textarea>
                        </div> 
                        </div>  
                    </div>
                ) :  (
                    <ul className='emergencycontact_listing'>
                         <li className='list_item'>
                            <span className='label'>Full Name</span>
                            <span className='value'>Full Name</span>
                        </li> 
                        <li className='list_item'>
                            <span className='label'>Contact Number</span>
                            <span className='value'>Contact Number</span>
                        </li> 
                        <li className='list_item'>
                            <span className='label'>Email</span>
                            <span className='value'>Email</span>
                        </li> 
                        <li className='list_item'>
                            <span className='label'>Address</span>
                            <span className='value'>Address</span>
                        </li> 
                    </ul>
                )
            }
        </div>
    )
}

export default EmergencyContact