import React, { useState, useEffect, useRef } from 'react';
import Pen from '../../../../assets/images/pen.svg';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import locales from '../../../../Constants/en.json';
import Toggle from '../../../../assets/images/eye-off.svg';
import Alert from '../../../../assets/images/alert-triangle.svg';
import { DataList, Input } from '../../../common';
import './ChangePassword.scss';

function ChangePassword(props) {
    const passwordRef = useRef(null);
    const newPass = useRef(null);
    const RepeatNewPass = useRef(null);
    const [editMode, setEditMode] = useState(false);

    const handleSubmit = () => {
        setEditMode(false);
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
                    <form>
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
                                    <input type='password' className='input_password'></input>
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
                                    <input type='password' className='input_password'></input>
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
                                    <input type='password' className='input_password'></input>
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
                            <button className='saveBtn' onClick={() => handleSubmit()}>
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <DataList config={CPData} />
            )}
        </div>
    );
}

export default ChangePassword;
