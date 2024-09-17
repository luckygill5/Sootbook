import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import swal from 'sweetalert';
import { axiosClient } from '../../../../services/axiosClient';
import { TextArea, DataList, Select } from '../../../../Components/common';
import '../PersonalInformation.scss';

const bankAccountConfig = [
    { label: 'Bio', value: 'Enter staff bio here..', name: 'bio' },
    { label: 'Experience', value: 'Startup', name: 'experience' },
];

const personalBioInitialValues = {
    bio: '',
    experience: 'fresher',
};

function PersonalInfoBio({ mode, setEditMode, bioInfo, getBioInfo }) {
    const handleFormSubmit = async values => {
        try {
            // const userid = JSON.parse(localStorage.getItem('profileData')).userId
            // let response = await axiosClient.post(
            //     `admin/vendor/bioInfo/store`,
            //     JSON.stringify({ userId: userid, ...values }),
            // );
            // if (response.status === 200) {
            //     swal('Success', 'Bio Information updated successfully', 'success', {
            //         buttons: false,
            //         timer: 2000,
            //     }).then(() => {
            //         getBioInfo();
            //         setEditMode(false);
            //     });
            // }
        } catch (error) {
            swal('Failed', `Error Updating Bio Information`, 'error');
        }
    };

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: bioInfo || personalBioInitialValues,
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
            <div className='personalBioInfo_container'>
                {mode ? (
                        <form onSubmit={handleSubmit}>
                            <div className='input_flexbox'>
                                <TextArea
                                    label={'Bio'}
                                    name={'bio'}
                                    value={values.bio}
                                    wrapperClass={'col12'}
                                    onChange={handleChange}
                                    placeholder='Enter staff bio here..'
                                    isRequired

                                />
                            </div>
                            <div className='input_flexbox'>
                                <Select
                                    label={'Experience'}
                                    name={'experience'}
                                    value={values.experience}
                                    options={[
                                        { id: 'fresher', value: 'Fresher' },
                                        { id: 'intermediate', value: 'Intermediate' },
                                        { id: 'experienced', value: 'Experienced' },
                                    ]}
                                    wrapperClass={'col6'}
                                    onChange={handleChange}
                                    isRequired

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
                        </form>
                   
                ) : (
                    <DataList config={bankAccountConfig} dataSource={bioInfo} />
                )}
            </div>
        </React.Fragment>
    );
}

export default PersonalInfoBio;
