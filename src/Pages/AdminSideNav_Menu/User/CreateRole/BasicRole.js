import React, { useState, useEffect } from 'react';
import { Input, Select, TextArea } from '../../../../Components/common';

function BasicRole({next}) {

    return (
        <div className='basicRole_form'>
            <div className='form_container'>
                <form>
                    <div className='input_flexbox'>
                        <Input
                            label={"Name of the role"}
                            type={"text"}
                            name={"role_name"}
                            id={"role_name"}
                            wrapperClass={"col6"}
                            value={''}
                            placeholder={'Name'}
                            //   onChange={handleChange}
                            //   onBlur={handleBlur}
                            isRequired
                        //   error={errors.first_name}
                        //   touched={touched.first_name}
                        />
                    </div>
                    <div className='input_flexbox'>
                        <TextArea
                            label={'Role Description'}
                            name={'role_description'}
                            // value={values.bio}
                            wrapperClass={'col12'}
                            // onChange={handleChange}
                            placeholder='Write role description...'
                        />
                    </div>
                    <div className='bottom_actions'>
                        <button className='nextBtn' type='button' onClick={() => next()}>Next</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BasicRole