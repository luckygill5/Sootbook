import React, {useState} from 'react';
import locales from "../../Constants/en.json";
import Dialog from '@mui/material/Dialog';
// import { useHistory } from "react-router-dom";
import "./Modals.scss";


function EmailVerificationModal(props){
const [open, setOpen] = useState(false);
// let history = useHistory();


return(
    <React.Fragment>
    <Dialog className="emailverificationModal_container"  open={props.emailVerifyState}>
        <div className='modal_container'>
            <div className='modal_head'>
                <h2 className='title'>{locales.check_email_text}</h2>
            </div>
            <div className='modal_Body'>
                <p className='email_info_text'>{locales.email_info_text}</p>
                <span className='otp_verify_title'>{locales.otp_verification_title}</span>
                <div className='otp_verification_box'>
                    <label className='label'>{locales.verification_code_text}</label>
                    <div className='flex_box'>
                    <input type='text' className='input_code'></input>
                    <input type='text' className='input_code'></input>
                    <input type='text' className='input_code'></input>
                    <input type='text' className='input_code'></input>
                    <input type='text' className='input_code'></input>
                    <input type='text' className='input_code'></input>

                    </div>
                </div>
                <div className='action'>
                    <button className='next_btn'>{locales.next_text}</button>
                </div>
            </div>
        </div>
    </Dialog>
    </React.Fragment>
)
}

export default EmailVerificationModal;