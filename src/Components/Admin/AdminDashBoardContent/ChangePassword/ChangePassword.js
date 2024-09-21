import React, { useState, useEffect, useRef } from 'react';
import Pen from '../../../../assets/images/pen.svg';
import swal from 'sweetalert';
import { axiosClient } from '../../../../services/axiosClient';
import locales from '../../../../Constants/en.json';
import Toggle from '../../../../assets/images/eye-off.svg';
import Alert from '../../../../assets/images/alert-triangle.svg';
import { DataList, Input } from '../../../common';
import './ChangePassword.scss';
import { current } from '@reduxjs/toolkit';

function ChangePassword(props) {
    const passwordRef = useRef(null);
    const newPass = useRef(null);
    const RepeatNewPass = useRef(null);
    const [editMode, setEditMode] = useState(false);
    const [formdata, setFormdata] = useState({
        currentpassword: '',
        newpassword: '',
        repeatpassword: '',
    });
    const [finalPassword, setFinalPassword] = useState('');

    const handleSubmit = async event => {
        if (formdata.newpassword == formdata.repeatpassword) {
            const userid = JSON.parse(localStorage.getItem('profileData'))?.userId;
            try {
                let response = await axiosClient.post(
                    `admin/vendor/updatePasswordInfo/store`,
                    JSON.stringify({
                        userId: userid,
                        current_password: formdata.currentpassword,
                        new_password: formdata.newpassword,
                    }),
                );
                if (response.status === 200) {
                    swal('Success', 'Password updated successfully', 'success', {
                        buttons: false,
                        timer: 2000,
                    }).then(() => {
                        setEditMode(false);
                    });
                }
            } catch (error) {
                swal('Failed', `Error Updating Password`, 'error');
            }
            setFormdata({
                currentpassword: '',
                newpassword: '',
                repeatpassword: '',
            });
            setEditMode(false);
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handlecurrenPassToggle = () => {
        if (passwordRef?.current?.previousElementSibling.type == 'password') {
            passwordRef.current.previousElementSibling.type = 'text';
        } else if (passwordRef?.current?.previousElementSibling.type == 'text') {
            passwordRef.current.previousElementSibling.type = 'password';
        }
    };

    const handleNewPassToggle = () => {
        if (newPass?.current?.previousElementSibling.type == 'password') {
            newPass.current.previousElementSibling.type = 'text';
        } else if (newPass?.current?.previousElementSibling.type == 'text') {
            newPass.current.previousElementSibling.type = 'password';
        }
    };

    const handleRepeatnewpassToggle = e => {
        if (RepeatNewPass?.current?.previousElementSibling.type == 'password') {
            RepeatNewPass.current.previousElementSibling.type = 'text';
        } else if (RepeatNewPass?.current?.previousElementSibling.type == 'text') {
            RepeatNewPass.current.previousElementSibling.type = 'password';
        }
    };

    const CPData = [{ label: 'Password', value: '• • • • • • • • • •' }];

    const handleChange = e => {
        const { name, value } = e.target;
        setFormdata(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className='changepassword_container'>
            {editMode ? null : (
                <div className='header_flex'>
                    <h5 className='title'>Change Password</h5>
                    <button className='edit_btn' onClick={() => handleEdit()}>
                        <span className='icon'>
                            <img src={Pen} alt='edit'></img>
                        </span>
                        {locales.edit_title}
                    </button>
                </div>
            )}
            {editMode ? (
                <div className='form_container'>
                        <div className='alert_msg'>
                            <div className='flexbox'>
                                <div className='icon'>
                                    <img src={Alert} alt='alert_icon' className='img_icon'></img>
                                </div>
                                <div className='para'>
                                    <h5 className='title'>Alert</h5>
                                    <p className='description'>
                                        Dont share this password to anyone. The password should be
                                        changed at least once in 3 months.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='input_flexBox col-2'>
                            <div className='inputBox'>
                                <label>Current Password</label>
                                <div className='flexbox'>
                                    <input
                                        type='password'
                                        className='input_password'
                                        name='currentpassword'
                                        value={formdata.currentpassword}
                                        onChange={handleChange}
                                    ></input>
                                    <span
                                        className='toggleBtn'
                                        ref={passwordRef}
                                        onClick={handlecurrenPassToggle}
                                    >
                                        <img src={Toggle} alt='toggle' className='eye_icon'></img>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='input_flexBox col-2'>
                            <div className='inputBox'>
                                <label>New Password</label>
                                <div className='flexbox'>
                                    <input
                                        type='password'
                                        className='input_password'
                                        name='newpassword'
                                        value={formdata.newpassword}
                                        onChange={handleChange}
                                    ></input>
                                    <span
                                        className='toggleBtn'
                                        ref={newPass}
                                        onClick={handleNewPassToggle}
                                    >
                                        <img src={Toggle} alt='toggle' className='eye_icon'></img>
                                    </span>
                                </div>
                            </div>
                            <div className='inputBox'>
                                <label>Repeat New Password</label>
                                <div className='flexbox'>
                                    <input
                                        type='password'
                                        className='input_password'
                                        name='repeatpassword'
                                        value={formdata.repeatpassword}
                                        onChange={handleChange}
                                    ></input>
                                    <span
                                        className='toggleBtn'
                                        ref={RepeatNewPass}
                                        onClick={handleRepeatnewpassToggle}
                                    >
                                        <img src={Toggle} alt='toggle' className='eye_icon'></img>
                                    </span>
                                </div>
                            </div>
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
                <DataList config={CPData} />
            )}
        </div>
    );
}

export default ChangePassword;
