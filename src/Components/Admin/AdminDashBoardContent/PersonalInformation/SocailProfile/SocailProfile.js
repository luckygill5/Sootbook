import React, { useState, useEffect } from 'react'
import locales from '../../../../../Constants/en.json'
import FbIcon from '../../../../../assets/images/fb_icon.svg'
import InstaIcon from '../../../../../assets/images/insta_icon.svg'
import BehanceIcon from '../../../../../assets/images/behance_icon.svg'
import GoogleIcon from '../../../../../assets/images/google_icon.svg'
import { Input, DataList, Button } from '../../../../common'
import '../PersonalInformation.scss'

const socialProfileConfig = [
    { label: 'Facebook', value: 'Facebook Link' },
    { label: 'Instagram', value: 'Instagram Link' },
    { label: 'Behance', value: 'Behance Link' },
    { label: 'Gmail', value: 'Gmail Link' },
]

function SocialProfile(props) {
    return (
        <React.Fragment>
            <div className='socialProfile_container'>
                {props.mode ? (
                    <div className='editMode'>
                        <div className='form_container'>
                            <div className='inputField'>
                                <label>Facebook</label>
                                <div className='input_flexbox'>
                                    <div className='icon_holder'>
                                        <img src={FbIcon} alt='icon' className='icon_img'></img>
                                    </div>
                                    <input
                                        type='text'
                                        className='input_element'
                                        placeholder='Profile URL'
                                    ></input>
                                </div>
                            </div>
                            <div className='inputField'>
                                <label>Instagram</label>
                                <div className='input_flexbox'>
                                    <div className='icon_holder'>
                                        <img src={InstaIcon} alt='icon' className='icon_img'></img>
                                    </div>
                                    <input
                                        type='text'
                                        className='input_element'
                                        placeholder='Profile URL'
                                    ></input>
                                </div>
                            </div>
                            <div className='inputField'>
                                <label>Behance</label>
                                <div className='input_flexbox'>
                                    <div className='icon_holder'>
                                        <img
                                            src={BehanceIcon}
                                            alt='icon'
                                            className='icon_img'
                                        ></img>
                                    </div>
                                    <input
                                        type='text'
                                        className='input_element'
                                        placeholder='Profile URL'
                                    ></input>
                                </div>
                            </div>
                            <div className='inputField'>
                                <label>Gmail</label>
                                <div className='input_flexbox'>
                                    <div className='icon_holder'>
                                        <img src={GoogleIcon} alt='icon' className='icon_img'></img>
                                    </div>
                                    <input
                                        type='text'
                                        className='input_element'
                                        placeholder='Profile URL'
                                    ></input>
                                </div>
                            </div>
                            <div className='button-container'>
                                <button className='saveBtn'>Save</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <DataList config={socialProfileConfig} />
                )}
            </div>
        </React.Fragment>
    )
}

export default SocialProfile
