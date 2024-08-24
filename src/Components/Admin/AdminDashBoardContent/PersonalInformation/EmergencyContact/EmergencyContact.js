import React, { useState, useEffect } from 'react';
import { Input, DataList, TextArea } from '../../../../common';
import locales from '../../../../../Constants/en.json';
import '../PersonalInformation.scss';

const emergencyContactConfig = [
    { label: 'Full Name', value: 'Full Name' },
    { label: 'Contact Number', value: '+1 (000) 000-0000' },
    { label: 'Email', value: 'Email' },
    { label: 'Address', value: 'Address' },
];

function EmergencyContact(props) {
    return (
        <div className='personalinfo_emergencycontact_container'>
            {props.mode ? (
                <div className='form_container'>
                    <form>
                        <div className='input_flexbox'>
                            <Input
                                label={'Full Name'}
                                type={'text'}
                                name={'name'}
                                id={'name'}
                                placeholder={'Full Name'}
                                wrapperClass={'col12'}
                                onChange={() => {}}
                            />
                        </div>
                        <div className='input_flexbox'>
                            <Input
                                label={'Contact Number'}
                                type={'text'}
                                name={'contactNumber'}
                                id={'contactNumber'}
                                placeholder={'Contact Number'}
                                wrapperClass={'col6'}
                                onChange={() => {}}
                            />
                            <Input
                                label={'Email'}
                                type={'text'}
                                name={'email'}
                                id={'email'}
                                placeholder={'Email'}
                                wrapperClass={'col6'}
                                onChange={() => {}}
                            />
                        </div>
                        <div className='input_flexbox'>
                            <TextArea
                                label={'Address'}
                                name={'Address'}
                                value={'Address'}
                                wrapperClass={'col12'}
                                onChange={() => {}}
                                placeholder='Address'
                            />
                        </div>
                    </form>
                </div>
            ) : (
                <DataList config={emergencyContactConfig} />
            )}
        </div>
    );
}

export default EmergencyContact;
