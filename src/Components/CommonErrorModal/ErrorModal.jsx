import React, { useState, useRef } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseX from "../../assets/images/x-cross.svg";
import ErrorIcon from "../../assets/images/x-circle.svg";
import './ErrorModal.scss'

function ErrorModal({ handleErrorClose, ErrorPopUp, ErrorMsg }) {

    return (
        <React.Fragment>
            <Dialog className='commonError_Modal' onClose={handleErrorClose} open={ErrorPopUp}>
                <button className='close_btn' type='button' onClick={() => handleErrorClose()}><img src={CloseX} alt="close_icon" className='close_img'></img></button>
                <div className='error_iconBlock'>
                    <img src={ErrorIcon} alt="error_icon" className='error_img'></img>
                </div>
                <p className='error_msg'>{ErrorMsg}</p>
            </Dialog>
        </React.Fragment>
    )
}

export default ErrorModal;