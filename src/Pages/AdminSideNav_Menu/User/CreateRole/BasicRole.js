import React, { useState, useEffect } from 'react';
import { Input, Select, TextArea } from '../../../../Components/common';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const BasicRoleEditFormSchema = Yup.object({
    role_name: Yup.string().required('Role name is required.'),
});

const BasicRoleInitialValues = {
    role_name: '',
    role_description: '',
};

function BasicRole({ next, formData, basicRoleFormData }) {
    const [roleName, setRoleName] = useState('');
    const [roleDescription, setRoleDescription] = useState('');

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
        useFormik({
            initialValues: BasicRoleInitialValues,
            validationSchema: BasicRoleEditFormSchema,
            validateOnChange: true,
            validateOnBlur: false,
            enableReinitialize: true,
            onSubmit: (values, action) => {
                handleFormSubmit(values);
                action.resetForm();
            },
        });

    const handleFormSubmit = async values => {
        setRoleName('');
        setRoleDescription('');
        formData(values);
        if (sessionStorage.getItem('prevPage')) {
            sessionStorage.removeItem('prevPage');
        }

        next();
    };

    const handleRoleName = event => {
        const { name, value } = event.target;
        setFieldValue(name, value);
        handleChange(event);
        setRoleName(value);
    };

    const handleRoleDescription = event => {
        const { name, value } = event.target;
        setFieldValue(name, value);
        handleChange(event);
        setRoleDescription(value);
    };

    const hanleBasicRoleNext = () => {
        if (sessionStorage.getItem('prevPage') && roleName && roleDescription) {
            if (sessionStorage.getItem('prevPage')) {
                sessionStorage.removeItem('prevPage');
            }
            handleSubmit();
        } else if (sessionStorage.getItem('prevPage')) {
            if (sessionStorage.getItem('prevPage')) {
                sessionStorage.removeItem('prevPage');
            }
            next();
        } else if (sessionStorage.getItem('basicEdit')) {
            if (sessionStorage.getItem('basicEdit')) {
                sessionStorage.removeItem('basicEdit');
            }
            next();
        } else {
            handleSubmit();
        }
    };

    return (
        <div className='basicRole_form'>
            <div className='form_container'>
                <form onSubmit={handleSubmit}>
                    <div className='input_flexbox'>
                        <Input
                            label={'Name of the role'}
                            type={'text'}
                            name={'role_name'}
                            id={'role_name'}
                            wrapperClass={'col6'}
                            value={values.role_name || basicRoleFormData.role_name}
                            placeholder={'Name'}
                            onChange={e => handleRoleName(e)}
                            onBlur={handleBlur}
                            isRequired
                            error={errors.role_name}
                            touched={touched.role_name}
                        />
                    </div>
                    <div className='input_flexbox'>
                        <TextArea
                            label={'Role Description'}
                            name={'role_description'}
                            value={values.role_description || basicRoleFormData.role_description}
                            wrapperClass={'col12'}
                            onChange={e => handleRoleDescription(e)}
                            placeholder='Write role description...'
                        />
                    </div>
                    <div className='bottom_actions'>
                        <button
                            className='nextBtn'
                            type='button'
                            onClick={() => hanleBasicRoleNext()}
                        >
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BasicRole;
