import React, { useState, useRef } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseX from "../../assets/images/x-cross.svg";
import DeleteAlert from "../../assets/images/delete_alert.svg";
import './CommonDeleteModal.scss'

function DeleteModal({ handleDeleteClose, DeletePopUp, DeleteModalMsg, DeleteModalTitle, handleDeleteConfirm }) {

    return (
        <React.Fragment>
            <Dialog className='delete_Modal' onClose={handleDeleteClose} open={DeletePopUp}>
                <button className='close_btn' type='button' onClick={() => handleDeleteClose()}><img src={CloseX} alt="close_icon" className='close_img'></img></button>
                <div className='delete_iconBlock'>
                    <img src={DeleteAlert} alt="deletealert_icon" className='deletealert_img'></img>
                </div>
                <h5 className='delete_title'>{DeleteModalTitle}</h5>
                <p className='delete_msg'>{DeleteModalMsg}</p>
                <div className='action_flexbox'>
                    <button className='cancelBtn' type='button' onClick={() => handleDeleteClose()}>Cancel</button>
                    <button className='confirmBtn' type='button' onClick={() => handleDeleteConfirm()}>Confirm</button>
                </div>
            </Dialog>
        </React.Fragment>
    )
}

export default DeleteModal;