import React, { useState, useRef } from 'react';
import locales from "../../Constants/en.json";
import OtpInput from 'react-otp-input';
import { Otpverification } from '../../services/Otpverfication.service';
import CrossImg from "../../assets/images/x-circle.svg"

function EmailVerifyPage(props) {

    const maxLength = 6;
    const [otp, setOtp] = useState('');
    const [invalidOtp, setInvalidOtp] = useState(false)

    const handleInput = (e) => {
        if (Number(e) || e == "" || e == 0) {
            setOtp(e)
        }
    }

    const handleotpVerify = () => {

        const userid = JSON.parse(localStorage.getItem('profileData')).userId;
        Otpverification(userid, otp).then((response) => {
            if (response && response.statusText == "OK") {
                if (response?.data?.status == true && response.data?.message == locales.success_otp_message) {
                    props.continueRegistration()
                }
                else if (response?.data?.status == false && response?.data?.message == locales.invalid_otp) {
                    setInvalidOtp(true)
                }
            }


        })
    }


    return (
        <React.Fragment>
            <div className='emailverifyPage_wrapper'>
                <h2 className='title'>{locales.check_email_text}</h2>
                <div className='body_container'>
                    <p className='email_info_text'>{locales.email_info_text}</p>
                    <span className='otp_verify_title'>{locales.otp_verification_title}</span>
                    <div className='otp_verification_box'>
                        <label className='label'>{locales.verification_code_text}</label>
                        <div className='flex_box'>
                            <OtpInput
                                value={otp}
                                // onChange={setOtp}
                                onChange={handleInput}
                                numInputs={6}
                                renderSeparator={<span className='seperator'></span>}
                                renderInput={(props) => <input {...props} />}
                            />
                        </div>
                    </div>
                    <div className='action'>
                        <button className='next_btn' disabled={otp.length !== maxLength ? true : false} onClick={() => {
                            handleotpVerify()
                        }}>{locales.continue_to_registration}</button>
                    </div>
                </div>
            </div>

            {
                invalidOtp && (
                    <div className='invalidOtp_container'>
                        <div className='modal'>
                            <div className='icon_block'>
                                <img src={CrossImg} alt="icon" className='cross_img'></img>
                            </div>
                            <h5 className='title'>{locales.invalid_otp}</h5>
                            <button className='closeBtn' onClick={() => setInvalidOtp(false)}>Close</button>
                        </div>
                    </div>
                )
            }
        </React.Fragment>
    )
}

export default EmailVerifyPage