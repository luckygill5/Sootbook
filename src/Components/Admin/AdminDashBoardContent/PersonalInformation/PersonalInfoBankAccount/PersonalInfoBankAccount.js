import React, { useState, useEffect } from 'react';
import locales from "../../../../../Constants/en.json";
import '../PersonalInformation.scss'

function BankAccount(props) {

    return (
        <div className='personalinfoBankaccount_container'>
            {
                props.mode ? (
                    <div className='editMode'>
                        <div className='form_container'>
                            <div className='flexbox'>
                                <div className='input_flexItem'>
                                    <label>Account Title</label>
                                    <input type='text' className='input_element' placeholder='Account Title'></input>
                                </div>
                                <div className='input_flexItem'>
                                    <label>Account Number</label>
                                    <input type='text' className='input_element' placeholder='Account Number'></input>
                                </div>
                            </div>
                            <div className='flexbox'>
                                <div className='input_flexItem'>
                                    <label>Bank Name</label>
                                    <input type='text' className='input_element' placeholder='Bank Name'></input>
                                </div>
                                <div className='input_flexItem'>
                                    <label>IBAN</label>
                                    <input type='text' className='input_element' placeholder='IBAN'></input>
                                </div>
                            </div>
                            <div className='input_fullBox'>
                                    <label>Swift Code</label>
                                    <input type='text' className='input_element' placeholder='Swift Code'></input>
                                </div>
                                <div className='input_fullBox'>
                                    <label>Bank Branch*</label>
                                    <textarea type='text' className='textBank' placeholder='Bank Branch'></textarea>
                                </div>
                        </div>
                    </div>
                ) : (
                    <ul className="accountInfo_listing">
                        <li className='list_item'>
                            <span className='label'>Account Title</span>
                            <span className='value'>Account Title</span>
                        </li>
                        <li className='list_item'>
                            <span className='label'>Account Number</span>
                            <span className='value'>Account Number</span>
                        </li>
                        <li className='list_item'>
                            <span className='label'>Bank Name</span>
                            <span className='value'>Bank Name</span>
                        </li>
                        <li className='list_item'>
                            <span className='label'>IBAN</span>
                            <span className='value'>IBAN</span>
                        </li>
                        <li className='list_item'>
                            <span className='label'>Swift Code</span>
                            <span className='value'>Swift Code</span>
                        </li>
                        <li className='list_item'>
                            <span className='label'>Bank Branch</span>
                            <span className='value'>Bank Branch</span>
                        </li>
                    </ul>
                )
            }
        </div>
    )
}

export default BankAccount