import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { TextArea, DataList, Select } from '../../../../common/';
import locales from '../../../../../Constants/en.json';
import '../PersonalInformation.scss';

const bankAccountConfig = [
    { label: 'Bio', value: 'Enter staff bio here..' },
    { label: 'Experience', value: 'Startup' },
];

function PersonalInfoBio(props) {
    return (
        <React.Fragment>
            <div className='personalBioInfo_container'>
                {props.mode ? (
                    <div className='form_container'>
                        <form>
                            <div className='input_flexbox'>
                                <TextArea
                                    label={'Bio'}
                                    name={'bio'}
                                    value={'Bio'}
                                    wrapperClass={'col12'}
                                    onChange={() => {}}
                                    placeholder='Enter staff bio here..'
                                />
                            </div>
                            <Select
                                label={'Experience'}
                                name={'experience'}
                                value={'Hindu'}
                                options={[
                                    { id: 'Hindu', value: 'Hindu' },
                                    { id: 'Muslim', value: 'Muslim' },
                                ]}
                                wrapperClass={'col6'}
                                onChange={() => {}}
                            />
                            <div className='button-container'>
                                <button className='saveBtn'>Save</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <DataList config={bankAccountConfig} />
                )}
            </div>
        </React.Fragment>
    );
}

export default PersonalInfoBio;
