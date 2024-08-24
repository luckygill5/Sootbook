import React, { useState } from 'react'
import locales from '../../Constants/en.json'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Banner from '../../assets/images/feedback_banner.svg'
import './FeedbackForm.scss'

function FeedbackForm() {
    return (
        <React.Fragment>
            <div className='feedbackform_container'>
                <div className='img_container'>{/* <img src={Banner} alt="img_icon"></img> */}</div>
                <div className='container'>
                    <div className='content_section'>
                        <h5 className='subtitle'>Enhance</h5>
                        <h4 className='title'>How Can We Help You?</h4>
                        <span className='info'>
                            Fill out the form below to request a personalized pricing quote or
                            further consultation.
                        </span>
                    </div>
                    <form className='form_container'>
                        <div className='input_flexbox'>
                            <div className='flex_item'>
                                <label>Your name</label>
                                <input
                                    type='text'
                                    className='inputField'
                                    placeholder='Input'
                                ></input>
                            </div>
                            <div className='flex_item'>
                                <label>Your Email</label>
                                <input
                                    type='text'
                                    className='inputField'
                                    placeholder='Input'
                                ></input>
                            </div>
                        </div>
                        <div className='message_box'>
                            <label>Message</label>
                            <textarea placeholder='Input-lg'></textarea>
                        </div>
                        <div className='agree_termcheckBox_container'>
                            <FormControlLabel
                                className='agree_term'
                                control={<Checkbox />}
                                label='I agree that my submitted data is being collected and stored.'
                            />
                        </div>
                        <div className='action'>
                            <button className='send_btn'>{locales.send_label}</button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default FeedbackForm
