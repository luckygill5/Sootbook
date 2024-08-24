import React, { useState } from 'react'
import locales from '../../Constants/en.json'
import { Link } from 'react-router-dom'
import Banner from '../../assets/images/contactus_banner.png'
import Map from '../../assets/images/map-pin_new.svg'
import Phone from '../../assets/images/phone.svg'
import Mail from '../../assets/images/mail.svg'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FAQS from '../../Components/FAQS/FAQS'
import './Contactus.scss'

function ContactUs() {
    return (
        <React.Fragment>
            <div className='contactus_page_container'>
                <div className='page_banner'>
                    <img src={Banner} alt='banner' className='banner_img'></img>
                </div>
                <div className='contact_box'>
                    <div className='contact_flexbox'>
                        <div className='flexbox_item'>
                            <div className='icon'>
                                <img src={Map} alt='map'></img>
                            </div>
                            <div className='content'>
                                <label>Address</label>
                                <span className='text'>Komitas 51</span>
                            </div>
                        </div>
                        <div className='flexbox_item'>
                            <div className='icon'>
                                <img src={Phone} alt='map'></img>
                            </div>
                            <div className='content'>
                                <label>Phone</label>
                                <span className='text'>+374 98 00 00 00</span>
                            </div>
                        </div>
                        <div className='flexbox_item'>
                            <div className='icon'>
                                <img src={Mail} alt='map'></img>
                            </div>
                            <div className='content'>
                                <label>Email</label>
                                <span className='text'>fogosoftware@gmail.com</span>
                            </div>
                        </div>
                    </div>
                    <div className='contact_header'>
                        <h5 className='subtitle'>Enhance</h5>
                        <h4 className='title'>How Can We Help You?</h4>
                        <span className='description'>
                            We're dedicated to providing you with exceptional customer care.
                        </span>
                    </div>
                    <div className='form_container'>
                        <form>
                            <div className='inputField'>
                                <label>Full Name</label>
                                <input
                                    type='text'
                                    className='input_element'
                                    placeholder='Input'
                                ></input>
                            </div>
                            <div className='inputField'>
                                <label>Your Email</label>
                                <input
                                    type='text'
                                    className='input_element'
                                    placeholder='Input'
                                ></input>
                            </div>
                            <div className='inputField'>
                                <label>How can we help</label>
                                <textarea className='text_input' placeholder='Input-lg'></textarea>
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
                <div className='career_faqs_section'>
                    <FAQS />
                </div>
            </div>
        </React.Fragment>
    )
}

export default ContactUs
