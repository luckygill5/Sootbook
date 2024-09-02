import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import swal from 'sweetalert';
import { axiosClient } from '../../../../../services/axiosClient';
import FbIcon from '../../../../../assets/images/fb_icon.svg';
import InstaIcon from '../../../../../assets/images/insta_icon.svg';
import BehanceIcon from '../../../../../assets/images/behance_icon.svg';
import GoogleIcon from '../../../../../assets/images/google_icon.svg';
import { Input, DataList, Button } from '../../../../common';
import '../PersonalInformation.scss';

const socialProfileConfig = [
    { label: 'Facebook', value: 'Facebook Link', name: 'facebook' },
    { label: 'Instagram', value: 'Instagram Link', name: 'instagram' },
    { label: 'Behance', value: 'Behance Link', name: 'behance' },
    { label: 'Gmail', value: 'Gmail Link', name: 'gmail' },
];

const socialProfileInitialValues = {
    facebook: '',
    instagram: '',
    behance: '',
    gmail: '',
};

function SocialProfile({ mode, setEditMode, socialinfo, getSocialinfo }) {
    const handleFormSubmit = async values => {
        try {
            const userid = JSON.parse(localStorage.getItem('profileData')).userId
            let response = await axiosClient.post(
                `admin/vendor/socialinfo/store`,
                JSON.stringify({ userId: userid, ...values }),
            );
            if (response.status === 200) {
                swal('Success', 'Social Information updated successfully', 'success', {
                    buttons: false,
                    timer: 2000,
                }).then(() => {
                    getSocialinfo();
                    setEditMode(false);
                });
            }
        } catch (error) {
            swal('Failed', `Error Updating Social Information`, 'error');
        }
    };

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: socialinfo || socialProfileInitialValues,
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
                {mode ? (
                    <div className='form_container'>
                        <div className='input_flexbox'>
                            <Input
                                label={'Facebook'}
                                type={'text'}
                                name={'facebook'}
                                id={'facebook'}
                                value={values.facebook}
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
                            <button className='cancelBtn' onClick={() => setEditMode(false)}>
                                Cancel
                            </button>
                            <button className='savebtn' type='submit' onClick={handleSubmit}>
                                Save
                            </button>
                        </div>
                    </div>
                ) : (
                    <DataList config={socialProfileConfig} dataSource={socialinfo} />
                )}
            </div>
        </React.Fragment>
    );
}

export default SocialProfile;
