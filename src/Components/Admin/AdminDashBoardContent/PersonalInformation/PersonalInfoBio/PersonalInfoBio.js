import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { TextArea, DataList, Select } from '../../../../common/';
import '../PersonalInformation.scss';

const bankAccountConfig = [
    { label: 'Bio', value: 'Enter staff bio here..' },
    { label: 'Experience', value: 'Startup' },
];

const personalBioInitialValues = {
    bio: '',
    experience: 'fresher',
};

function PersonalInfoBio(props) {
    const handleFormSubmit = async values => {
        console.log(values);
    };

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: personalBioInitialValues,
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
                {props.mode ? (
                    <div className='form_container'>
                        <form onSubmit={handleSubmit}>
                            <div className='input_flexbox'>
                                <TextArea
                                    label={'Bio'}
                                    name={'bio'}
                                    value={values.bio}
                                    wrapperClass={'col12'}
                                    onChange={handleChange}
                                    placeholder='Enter staff bio here..'
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
                                />
                            </div>
                            <div className='button-container'>
                                <button
                                    className='cancelBtn'
                                    onClick={() => props.setEditMode(false)}
                                >
                                    Cancel
                                </button>
                                <button className='savebtn' type='submit' onClick={handleSubmit}>
                                    Save
                                </button>
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
