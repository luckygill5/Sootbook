import React, { useEffect, useState,useRef } from 'react';
import locales from "../../Constants/en.json";
import FogoLogo from '../../assets/images/logo_fogo.svg';
import GoogleIcon from "../../assets/images/google_logo.svg";
import EyeOff from "../../assets/images/eye-off.svg";
import ResetPasswordModal from '../../Components/Modals/ResetPasswordModal';
import CreateNewPasswordModal from '../../Components/Modals/CreateNewPasswordModal';
import EmailVerificationModal from '../../Components/Modals/EmailVerificationModal';
import { Link, useNavigate } from "react-router-dom";
import { loginService } from '../../services/login.service';
import { setData, addData } from '../../Slices/LoginServiceSlices';
import { useSelector, useDispatch } from 'react-redux';
import CrossImg from "../../assets/images/x-circle.svg"
import "./SignIn.scss";


function SignIn(props) {
    const data = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [signInView, setSignInView] = useState(true);
    const [createPassState, setCreatePassState] = useState(false);
    const [emailVerify, setEmailVerify] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [accountnoexist, setAccountNoExist] = useState(false);
    const [errorModal, setErrorModal] = useState(false)
    const inputRef = useRef(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function handlecloseState() {
        setOpen(false);
        setSignInView(true)
    }

    function handleCreatePassState() {
        setCreatePassState(true);
        setOpen(false)
    }

    function handleNextButtonClick() {
        setSignInView(true);
        setCreatePassState(false)
    }

    function handleDrawer() {
        if (document.querySelector("#right_action.show")) {
            document.querySelector("#right_action.show").classList.remove("show")
        } else {
            document.querySelector("#right_action").classList.add("show")
        }

    }

    const handleEmail = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
    
        // Check if the email is valid
        setIsValid(emailRegex.test(inputEmail));
      };

      const handleTogglePass = () => {
        if(inputRef.current.type == 'password'){
            inputRef.current.type = 'text'
        }else{
            inputRef.current.type = 'password'
        }
      }

      const handlePassword = (e) => {
        setPassword(e.target.value)
      }


      const handleSignIn = () => {
        const data = {
            emailData:email,
            passwordData:password
        }
        loginService(data).then((response) => {
            if(response && response.status == true){
                sessionStorage.setItem("accessToken", response.data.token);
                sessionStorage.setItem('loginData', JSON.stringify(response.data))
                dispatch(addData(response.data));
                navigate("/dashboard")
            }else if(response && response.status == false && response.message == "Vendor doesnot exist"){
                setAccountNoExist(true)
            }
            else if (response && response.status == false && response.message == "Registration process has not been completed"){
                setErrorModal(response.message)
            }

        })
      }

    useEffect(() => {
        document.scrollingElement.scrollTop = 0
    } , [])
    return (
        <React.Fragment>
            <div className='signIn_wrapper'>
                <div className='header'>
                    <div className='left_logoBlock' onClick={() => {
                        navigate("/")
                    }}>
                        <img src={FogoLogo} alt="fogo_logo"></img>
                    </div>
                    <div className='right_action' id="right_action">
                        <span className='closeBtn' onClick={() => handleDrawer()}>x</span>
                        <span className='dont_account'>{locales.dont_have_account}</span>
                        <button className='signup_btn' onClick={() => {
                            navigate("/SignUp")
                        }}>{locales.signUp}</button>
                    </div>
                    <button className='burgerMenuBtn' onClick={() => handleDrawer()}>
                        <span className='seperator'></span>
                        <span className='seperator'></span>
                        <span className='seperator'></span>
                    </button>
                </div>
                <div className={`main_container ${signInView && 'signInModal_show'}`}>
                    {
                        signInView && (
                            <div className='signIn_formBlock'>
                                <h2 className='title'>{locales.signin_into_account}</h2>
                                <div className='sign_in_google'>
                                    <button className='googleButton' onClick={() => {
                                        setEmailVerify(true);
                                        setSignInView(false)
                                    }}>
                                        <span className='icon'>
                                            <img src={GoogleIcon} alt='google_icon'></img>
                                        </span>
                                        <span className='text'>{locales.signIn_google}</span>
                                    </button>
                                </div>
                                <span className='or_seperator'>
                                    <span className='text'>or</span>
                                </span>
                                <div className='form_container'>
                                    <div className='username_fielbox'>
                                        <label for="email_input">{locales.email_label}</label>

                                        <input type='text' className='email_input' id="email_input" placeholder='you@example.com' value={email} onChange={handleEmail}></input>
                                        {isValid == false ? <span className='error'>Invalid Email</span> : ""}
                                    </div>
                                    <div className='password_fielbox'>
                                        <label for="password_input">{locales.password_label}</label>
                                        <div className='flexBox'>
                                            <input type='password' ref={inputRef} className='password_input' id="password_input" value={password} onChange={handlePassword}></input>
                                            <span className='eye_icon' onClick={handleTogglePass}>
                                                <img src={EyeOff} alt='eye_off_icon'></img>
                                            </span>
                                        </div>
                                        <span className='pass_length_msg'>{locales.pass_length_msg}</span>
                                    </div>
                                    <div className='submit_action'>
                                        <button className='submitBtn' disabled={
                                            (email!=="" &&
                                                password!==""
                                            )? false: true
                                        } onClick={handleSignIn}>{locales.signIn}</button>
                                    </div>
                                    <div className='forgot_pass_action'>
                                        <span className='link' onClick={() => {
                                            setSignInView(false)
                                            setOpen(true)
                                        }}>{locales.forgot_password}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

{
    (accountnoexist || errorModal!==false) && (
        <div className='account_notExist_page'>
            <div className='account_notExist_Modal'>
                <div className='icon_block'>
                    <img src={CrossImg}  alt="icon" className='cross_img'></img>
                </div>
                <h5 className='title'>{accountnoexist ? locales.account_doesnotExist : errorModal!==false ? errorModal:''}</h5>
                <button className='signup_btn' onClick={() => navigate("/SignUp")}>{locales.signUp}</button>
            </div>
        </div>
    )
}

            {open && (
                <ResetPasswordModal
                    openState={open}
                    handlecloseState={handlecloseState}
                    CreatePasswordModal={handleCreatePassState}
                />
            )

            }

            {
                createPassState &&
                (
                    <CreateNewPasswordModal
                        creatPasswordState={createPassState}
                        nextButtonClick={handleNextButtonClick}

                    />
                )
            }

            {
                emailVerify && (
                    <EmailVerificationModal
                        emailVerifyState={emailVerify}
                    />
                )
            }
        </React.Fragment>
    )
}

export default SignIn;