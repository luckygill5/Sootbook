import React, {useState} from 'react';
import locales from "../../Constants/en.json";
import Dialog from '@mui/material/Dialog';
// import { useHistory } from "react-router-dom";
import "./Modals.scss";


function ResetPasswordModal(props){
const [open, setOpen] = useState(false);
// let history = useHistory();


return(
    <React.Fragment>
    <Dialog className="resetPassModal_container" onClose={() => props.handlecloseState()} open={props.openState}>
        <div className='modal_container'>
            <div className='modal_head'>
                <h2 className='title'>{locales.reset_password}</h2>
            </div>
            <div className='modal_Body'>
                <p className='email_reset_info'>{locales.email_reset_info}</p>
                <div className='email_input_box'>
                    <label for="email_input">{locales.email_label}</label>
                    <input type='text' id="email_input" className='email_input' placeholder='you@example.com'></input>
                </div>
                <div className='action'>
                    <button className='continue_btn' onClick={() => props.CreatePasswordModal()}>{locales.continue_text}</button>
                </div>
            </div>
        </div>
    </Dialog>
    </React.Fragment>
)
}

export default ResetPasswordModal;