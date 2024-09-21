import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import swal from 'sweetalert';
import { axiosClient } from '../../../../services/axiosClient';
import { TextArea, DataList, Select } from '../../../../Components/common';
import '../PersonalInformation.scss';
import * as Yup from "yup";
import locales from "../../../../Constants/en.json";

const bankAccountConfig = [
    { label: 'Bio', value: 'Enter staff bio here..', name: 'bio' },
    { label: 'Experience', value: 'Startup', name: 'experience' },
];

const personalInformationEditFormSchema = Yup.object({
    bio: Yup.string().required("Bio is required."),
    experience: Yup.string().required("Experience is required."),
    
  });
const personalBioInitialValues = {
    bio: '',
    experience: 'fresher',
};

function PersonalInfoBio({userId, mode, setEditMode, bioInfo, getBioInfo,onTabChange, handleBackHRM }) {
    const handleFormSubmit = async values => {
        try {
            
            // const userid = JSON.parse(localStorage.getItem('profileData')).userId
            let response = await axiosClient.post(
                `admin/vendor/bioInfo/store`,
                JSON.stringify({ userId, ...values }),
            );
            console.log("Bio hit done");

            if (response.status === 200) {
                swal('Success', 'Bio Information updated successfully', 'success', {
                    buttons: false,
                    timer: 2000,
                }).then(() => {
                    getBioInfo();
                    onTabChange(null,2);

                });
            }
        } catch (error) {
            swal('Failed', `Error Updating Bio Information`, 'error');
        }
    };

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: bioInfo || personalBioInitialValues,
        validationSchema:personalInformationEditFormSchema,
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
                            <div className="bottom_actions">
                                <button className="cancelBtn" onClick={() => handleBackHRM()}>
                                {locales.cancel_label}
                                </button>
                                <button onClick={handleSubmit} className='saveBtn'>
                                {locales.save_label}
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
