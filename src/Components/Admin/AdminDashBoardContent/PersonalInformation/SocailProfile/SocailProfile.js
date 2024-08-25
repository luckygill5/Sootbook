import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import locales from '../../../../../Constants/en.json';
import FbIcon from '../../../../../assets/images/fb_icon.svg';
import InstaIcon from '../../../../../assets/images/insta_icon.svg';
import BehanceIcon from '../../../../../assets/images/behance_icon.svg';
import GoogleIcon from '../../../../../assets/images/google_icon.svg';
import { Input, DataList, Button } from '../../../../common';
import '../PersonalInformation.scss';

const socialProfileConfig = [
    { label: 'Facebook', value: 'Facebook Link' },
    { label: 'Instagram', value: 'Instagram Link' },
    { label: 'Behance', value: 'Behance Link' },
    { label: 'Gmail', value: 'Gmail Link' },
];

const emergencyContactInitialValues = {
    facebook: '',
    instagram: '',
    behance: '',
    gmail: '',
};

function SocialProfile(props) {
    const handleFormSubmit = async values => {
        console.log(values);
    };

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: emergencyContactInitialValues,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,
        onSubmit: (values, action) => {
            handleFormSubmit(values);
            action.resetForm();
        },
    });

    useEffect(() => {}, []);

    return (
        <React.Fragment>
            <div className='socialProfile_container'>
                {props.mode ? (
                    <div className='form_container'>
                        <div className='input_flexbox'>
                            <Input
                                label={'Facebook'}
                                type={'text'}
                                name={'facebook'}
                                id={'facebook'}
                                value={values.Facebook}
                                placeholder={'Profile URL'}
                                icon={FbIcon}
                                wrapperClass={'col12'}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input_flexbox'>
                            <Input
                                label={'Instagram'}
                                type={'text'}
                                name={'instagram'}
                                id={'instagram'}
                                value={values.instagram}
                                placeholder={'Profile URL'}
                                icon={InstaIcon}
                                wrapperClass={'col12'}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input_flexbox'>
                            <Input
                                label={'Behance'}
                                type={'text'}
                                name={'behance'}
                                id={'behance'}
                                value={values.behance}
                                placeholder={'Profile URL'}
                                icon={BehanceIcon}
                                wrapperClass={'col12'}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='input_flexbox'>
                            <Input
                                label={'Gmail'}
                                type={'text'}
                                name={'gmail'}
                                id={'gmail'}
                                value={values.gmail}
                                placeholder={'Profile URL'}
                                icon={GoogleIcon}
                                wrapperClass={'col12'}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='button-container'>
                            <button className='cancelBtn' onClick={() => props.setEditMode(false)}>
                                Cancel
                            </button>
                            <button className='savebtn' type='submit' onClick={handleSubmit}>
                                Save
                            </button>
                        </div>
                    </div>
                ) : (
                    <DataList config={socialProfileConfig} />
                )}
            </div>
        </React.Fragment>
    );
}

export default SocialProfile;
