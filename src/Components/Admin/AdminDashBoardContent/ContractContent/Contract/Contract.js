import React, { useState, useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { Input, DataList, Select, TextArea } from '../../../../common/'
import '../ContractContent.scss'
import '../../../../common/common.component.scss'

const contractConfig = [
    { label: 'Contract date', value: '24/02/2024' },
    { label: 'Department', value: 'Human resources' },
    { label: 'Basic salary', value: '$1500' },
    { label: 'Hourly Rate', value: '$10.00' },
    { label: 'Payslip Type', value: 'Per Month' },
    { label: 'Office Shift', value: 'Morning Shift' },
    { label: 'Contract End', value: 'Date Of Leaving' },
    { label: 'Categories', value: 'Badge', valueClass: 'badge green' },
    { label: 'Role Description', value: 'Description' },
]

//selectBox
function Contract(props) {
    return (
        <div className='contract_container'>
            {props.mode ? (
                <div className='form_container'>
                    <form>
                        <div className='input_flexbox'>
                            <Input
                                label={'Contract Date'}
                                type={'text'}
                                placeholder={'24-02-2024'}
                                name={'first_name'}
                                id={'first_name'}
                                value={'Alex'}
                                wrapperClass={'col6'}
                                onChange={() => {}}
                                isRequired
                            />
                        </div>
                        <div className='input_flexbox'>
                            <Select
                                label={'Department'}
                                name={'department'}
                                value={'Startup'}
                                options={[
                                    { id: 'Startup', value: 'Startup' },
                                    { id: 'Startup', value: 'Startup' },
                                    { id: 'Startup', value: 'Startup' },
                                ]}
                                wrapperClass={'col6'}
                                onChange={() => {}}
                                isRequired
                            />
                            <Select
                                label={'Designation'}
                                name={'designation'}
                                value={'Startup'}
                                options={[
                                    { id: 'Startup', value: 'Startup' },
                                    { id: 'Startup', value: 'Startup' },
                                    { id: 'Startup', value: 'Startup' },
                                ]}
                                wrapperClass={'col6'}
                                onChange={() => {}}
                                isRequired
                            />
                        </div>
                        <div className='input_flexbox'>
                            <Select
                                label={'Basic Salary'}
                                name={'basicSalary'}
                                value={'Startup'}
                                options={[
                                    { id: 'Startup', value: 'Startup' },
                                    { id: 'Startup', value: 'Startup' },
                                    { id: 'Startup', value: 'Startup' },
                                ]}
                                wrapperClass={'col4'}
                                onChange={() => {}}
                                isRequired
                            />
                            <Select
                                label={'Hourly Rate'}
                                name={'hourlyRate'}
                                value={'Startup'}
                                options={[
                                    { id: 'Startup', value: 'Startup' },
                                    { id: 'Startup', value: 'Startup' },
                                    { id: 'Startup', value: 'Startup' },
                                ]}
                                wrapperClass={'col4'}
                                onChange={() => {}}
                                isRequired
                            />
                            <Select
                                label={'Payslip Type'}
                                name={'payslipType'}
                                value={'Startup'}
                                options={[
                                    { id: 'Startup', value: 'Startup' },
                                    { id: 'Startup', value: 'Startup' },
                                    { id: 'Startup', value: 'Startup' },
                                ]}
                                wrapperClass={'col4'}
                                onChange={() => {}}
                                isRequired
                            />
                        </div>
                        <div className='input_flexbox'>
                        <div className='inputField col12'>
                            <label>Leave Categories</label>
                            <input
                                type='text'
                                placeholder='24-02-2024'
                                className='input_element'
                            ></input>
                            <span className='info'>
                                If All is selected, then all leave categories will show to employee
                                which are added in the system.
                            </span>
                        </div>
                        </div>
                        <div className='input_flexbox'>
                            <TextArea
                                label={'Role Description'}
                                name={'description'}
                                value={'description'}
                                wrapperClass={'col12'}
                                onChange={() => {}}
                                placeholder='Enter role description here..'
                            />
                        </div>
                        <div className='button-container'>
                            <button className='saveBtn'>Save</button>
                        </div>
                    </form>
                </div>
            ) : (
                <DataList config={contractConfig} />
            )}
        </div>
    )
}

export default Contract
