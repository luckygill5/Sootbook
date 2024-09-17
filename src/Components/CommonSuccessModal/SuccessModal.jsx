import React, { useState, useRef } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseX from "../../assets/images/x-cross.svg";
import SuccessIcon from "../../assets/images/success_Icon.svg";
import './SuccessModal.scss'

function SuccessModal({ handleSuccessClose, SuccessPopUp, SuccessMsg, SuccessTitle }) {

    return (
        <React.Fragment>
            <Dialog className='commonSuccess_Modal' onClose={handleSuccessClose} open={SuccessPopUp}>
                <button className='close_btn' type='button' onClick={() => handleSuccessClose()}><img src={CloseX} alt="close_icon" className='close_img'></img></button>
                <div className='success_iconBlock'>
                    <img src={SuccessIcon} alt="success_icon" className='success_img'></img>
                </div>
                <h5 className='success_title'>{SuccessTitle}</h5>
                <p className='success_msg'>{SuccessMsg}</p>
            </Dialog>
        </React.Fragment>
    )
}

export default SuccessModal;