import React, { useState, useRef } from 'react';
import locales from '../../Constants/en.json';
import GoogleIcon from '../../assets/images/google_logo.svg';
import EyeOff from '../../assets/images/eye-off.svg';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SignupVerification } from '../../services/signupverification.service';
import { Link, useNavigate } from 'react-router-dom';

function CreatAccount(props) {
    const navigate = useNavigate();
    const [countryData, setCountryData] = useState(props.countryDataList);
    const [countryselectedData, setCountrySelectedData] = useState('');
    const [maxlengthPhone, setMaxlengthPhone] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [phoneisValid, setPhoneIsValid] = useState(false);
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const inputRef = useRef(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleChange = event => {
        setCountrySelectedData(event.target.value);
    };

    const handleFullName = event => {
        setFullName(event.target.value);
    };

    const handleEmailChange = e => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);

        // Check if the email is valid
        setIsValid(emailRegex.test(inputEmail));
    };

    const handlePassword = e => {
        const passvalue = e.target.value;
        setPassword(passvalue);
    };

    const handleTogglePass = () => {
        if (inputRef.current.type == 'password') {
            inputRef.current.type = 'text';
        } else {
            inputRef.current.type = 'password';
        }
    };

    const handlePhone = e => {
        if (countryselectedData) {
            const filterData = countryData.filter(item => {
                if (item._id == countryselectedData) {
                    return item;
                }
            });
            if (filterData[0].name == 'India') {
                setMaxlengthPhone(10);
                if (e.target.value.length == 10) {
                    setPhoneIsValid(true);
                } else {
                    setPhoneIsValid(false);
                }
            }
        }
        if (Number(e.target.value)) {
            setPhone(e.target.value);
        }
    };

    const handleSubmit = () => {
        handleSignupVerification();
    };

    const handleSignupVerification = () => {
        SignupVerification(fullName, email, phone, password, countryselectedData).then(response => {
            if (response && response.data) {
                window.localStorage.setItem('profileData', JSON.stringify(response.data));
                props.emailVerifyPage();
            }
        });
    };

    return (
        <React.Fragment>
            <div className='creatAccountForm_wrapper'>
                <div className='form_container'>
                    <h2 className='page_title'>{locales.create_account}</h2>
                    <div className='signup_google'>
                        <button
                            className='googleButton'
                            onClick={() => {
                                // setEmailVerify(true);
                                // setSignInView(false)
                            }}
                        >
                            <span className='icon'>
                                <img src={GoogleIcon} alt='google_icon'></img>
                            </span>
                            <span className='text'>{locales.signIn_google}</span>
                        </button>
                    </div>
                    <div className='or_seperate'>or</div>
                    <div className='input_flexBox'>
                        <label>{locales.full_name_label}</label>
                        <input
                            type='text'
                            className='text_input'
                            onChange={handleFullName}
                            value={fullName}
                        ></input>
                    </div>
                    <div className='input_flexBox'>
                        <label>{locales.email_label}</label>
                        <input
                            type='text'
                            className='text_input'
                            onChange={handleEmailChange}
                            value={email}
                        ></input>
                        {isValid == false ? <span className='error'>Invalid Email</span> : ''}
                    </div>
                    <div className='input_flexBox password_box'>
                        <label>{locales.password_label}</label>
                        <div className='grid_box'>
                            <input
                                ref={inputRef}
                                className='text_input'
                                type='password'
                                value={password}
                                onChange={handlePassword}
                            ></input>
                            <span className='eye_icon' onClick={handleTogglePass}>
                                <img src={EyeOff} alt='eye_off_icon'></img>
                            </span>
                            <span className='pass_length_info'>{locales.pass_length_msg}</span>
                        </div>
                    </div>
                    <div className='input_flexBox phonenumber_box'>
                        <label>{locales.phone_number_label}</label>
                        <div className='grid_box'>
                            <Select
                                className='country_code'
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={countryselectedData}
                                label='Age'
                                onChange={handleChange}
                            >
                                {countryData &&
                                    countryData.length > 0 &&
                                    countryData.map((item, index) => {
                                        return (
                                            <MenuItem key={index} name={item.name} value={item._id}>
                                                {item.phone}
                                            </MenuItem>
                                        );
                                    })}
                            </Select>
                            <input
                                type='text'
                                maxLength={maxlengthPhone}
                                className='phone_input'
                                value={phone}
                                onChange={handlePhone}
                            ></input>
                        </div>
                    </div>
                    <div className='submit_action'>
                        <button
                            className={`continue_btn ${
                                isValid == true &&
                                phoneisValid == true &&
                                fullName !== '' &&
                                email !== '' &&
                                phone !== '' &&
                                password !== '' &&
                                countryselectedData !== ''
                                    ? ''
                                    : 'disabled'
                            } `}
                            onClick={handleSubmit}
                        >
                            {locales.continue_to_verification}
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CreatAccount;
