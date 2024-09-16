import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import Pen from '../../../../assets/images/pen.svg';
import locales from '../../../../Constants/en.json';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ReactComponent as Arrow } from '../../../../assets/images/chevron-down.svg';
import { FileUploader } from 'react-drag-drop-files';
import { Input } from '../../../common';
import './Documents.scss';

const documentInitialValues = {
    document_name: '',
    document_type: '',
    document_id: '',
    document_file: '',
    document_expiry: '',
};

function Documents({initialEditMode=false}) {
    const fileTypes = ['JPG', 'PNG', 'GIF'];
    const [file, setFile] = useState(null);
    const [editMode, setEditMode] = useState(initialEditMode);
    const [formData, setFormData] = useState({ Search: '' });

    const handleFormSubmit = async values => {
    };

    const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: documentInitialValues,
        validateOnChange: true,
        validateOnBlur: false,
        enableReinitialize: true,
        onSubmit: (values, action) => {
            handleFormSubmit(values);
            action.resetForm();
        },
    });

    const handlefileChange = (file) => {
        setFieldValue("document_file", file.name)
        setFile(file);
    };

    useEffect(() => {}, []);
    return (
        <div className='documents_container'>
            :{' '}
            <div className='header_flex'>
                <h5 className='title'>Documents</h5>
                {editMode ? "" : (
                    <button className='edit_btn' onClick={() => setEditMode(true)}>
                        <span className='icon'>
                            <img src={Pen} alt='edit'></img>
                        </span>
                        {locales.edit_title}
                    </button>
                )}
            </div>
            {/* {editMode ? (
                <div className='search_fieldbox'>
                    <input
                        type='text'
                        className='search_input'
                        placeholder='Search Preline'
                        value={formData.Search}
                        name='Search'
                        onChange={event => handleSearchChange(event)}
                    ></input>
                </div>
            ) : null} */}
            {editMode ? (
                <div className='form_container'>
                    <h5 className='title'>Add New Document </h5>
                    <div className='input_flexbox col-2'>
                        <Input
                            label={'Document Name'}
                            type={'text'}
                            placeholder={'24-02-2024'}
                            name={'document_name'}
                            id={'document_name'}
                            value={values.document_name}
                            wrapperClass={'col6'}
                            onChange={handleChange}
                            isRequired
                        />
                        <Input
                            label={'Document Type'}
                            type={'text'}
                            placeholder={'24-02-2024'}
                            name={'document_type'}
                            id={'document_type'}
                            value={values.document_type}
                            wrapperClass={'col6'}
                            onChange={handleChange}
                            isRequired
                        />
                    </div>
                    <div className='uplaod_container'>
                        <label className='mandate'>Document File</label>
                        <div className='uploadBox'>
                            <button className='uploadBtn'>
                                Choose file
                                <FileUploader
                                    maxSize={50}
                                    classes='fileUploader'
                                    handleChange={handlefileChange}
                                    name='document_file'
                                    types={fileTypes}
                                />
                            </button>
                            <div className='filename'>
                                {file && file.name
                                    ? `${file.name}`
                                    : `No file chosen`}
                            </div>
                        </div>
                    </div>

                    <div className='input_flexbox col-2'>
                        <Input
                            label={'Document ID'}
                            type={'text'}
                            placeholder={'24-02-2024'}
                            name={'document_id'}
                            id={'document_id'}
                            value={values.document_id}
                            wrapperClass={'col6'}
                            onChange={handleChange}
                            isRequired
                        />
                        <Input
                            label={'Document Expires on'}
                            type={'text'}
                            placeholder={'24-02-2024'}
                            name={'document_expiry'}
                            id={'document_expiry'}
                            value={values.document_expiry}
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
                </div>
            ) : null}
        </div>
    );
}

export default Documents;
