import React, { useState, useEffect } from 'react'
import locales from '../../../../../Constants/en.json'
import { Input, DataList, Button } from '../../../../common'
import '../PersonalInformation.scss'

//accountInfo_listing
const bankAccountConfig = [
    { label: 'Account Title', value: 'Account Title' },
    { label: 'Account Number', value: 'Account Number' },
    { label: 'Bank Name', value: 'Bank Name' },
    { label: 'IBAN', value: 'IBAN' },
    { label: 'Swift Code', value: 'Swift Code' },
    { label: 'Bank Branch', value: 'Bank Branch' },
]

function BankAccount(props) {
    return (
        <div className='personalinfoBankaccount_container'>
            {props.mode ? (
                <div className='editMode'>
                    <div className='form_container'>
                        <div className='flexbox'>
                            <div className='input_flexItem'>
                                <label>Account Title</label>
                                <input
                                    type='text'
                                    className='input_element'
                                    placeholder='Account Title'
                                ></input>
                            </div>
                            <div className='input_flexItem'>
                                <label>Account Number</label>
                                <input
                                    type='text'
                                    className='input_element'
                                    placeholder='Account Number'
                                ></input>
                            </div>
                        </div>
                        <div className='flexbox'>
                            <div className='input_flexItem'>
                                <label>Bank Name</label>
                                <input
                                    type='text'
                                    className='input_element'
                                    placeholder='Bank Name'
                                ></input>
                            </div>
                            <div className='input_flexItem'>
                                <label>IBAN</label>
                                <input
                                    type='text'
                                    className='input_element'
                                    placeholder='IBAN'
                                ></input>
                            </div>
                        </div>
                        <div className='input_fullBox'>
                            <label>Swift Code</label>
                            <input
                                type='text'
                                className='input_element'
                                placeholder='Swift Code'
                            ></input>
                        </div>
                        <div className='input_fullBox'>
                            <label>Bank Branch*</label>
                            <textarea
                                type='text'
                                className='textBank'
                                placeholder='Bank Branch'
                            ></textarea>
                        </div>
                    </div>
                </div>
            ) : (
                <DataList config={bankAccountConfig} />
            )}
        </div>
    )
}

export default BankAccount
