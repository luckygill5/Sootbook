import React, {useState} from 'react';
import EyeOff from "../../assets/images/eye-off.svg";
import locales from "../../Constants/en.json";
import Dialog from '@mui/material/Dialog';
// import { useHistory } from "react-router-dom";
import "./Modals.scss";


function CreateNewPasswordModal(props){
const [open, setOpen] = useState(false);
// let history = useHistory();


return(
    <React.Fragment>
    <Dialog className="createNew_passwordModal_container"  open={props.creatPasswordState}>
        <div className='modal_container'>
            <div className='modal_head'>
                <h2 className='title'>{locales.create_new_password}</h2>
            </div>
            <div className='modal_Body'>
                <div className='newpass_input_box'>
                    <label for="newpass_input">{locales.new_password}</label>
                    <div className='flex_box'>
                    <input type='text' id="newpass_input" className='newpass_input' placeholder='you@example.com'></input>
                    <span className='eye_view'>
                    <img src={EyeOff} alt='eye_off_icon'></img>
                    </span>
                    </div>
                </div>
                <div className='confirmpass_input_box'>
                    <label for="confirmpass_input">{locales.confirm_password}</label>
                    <div className='flex_box'>
                    <input type='text' id="confirmpass_input" className='confirmpass_input' placeholder='you@example.com'></input>
                    <span className='eye_view'>
                    <img src={EyeOff} alt='eye_off_icon'></img>
                    </span>
                    </div>
                    </div>
                    
                <div className='action'>
                    <button className='next_btn' onClick={() => props.nextButtonClick()}>{locales.next_text}</button>
                </div>
            </div>
        </div>
    </Dialog>
    </React.Fragment>
)
}

export default CreateNewPasswordModal;