import React, { useState, useEffect } from 'react';
import locales from "../../../../../Constants/en.json";
import FbIcon from "../../../../../assets/images/fb_icon.svg";
import InstaIcon from  "../../../../../assets/images/insta_icon.svg";
import BehanceIcon from  "../../../../../assets/images/behance_icon.svg";
import GoogleIcon from  "../../../../../assets/images/google_icon.svg"
import '../PersonalInformation.scss';

function SocialProfile(props){

    return(
        <React.Fragment>
            <div className='socialProfile_container'>
                {
                    props.mode ? (
                        <div className='editMode'>
                            <div className='form_container'>
                                <div className='input_box'>
                                    <label>Facebook</label>
                                    <div className='input_flexbox'>
                                        <div className='icon_holder'>
                                            <img src={FbIcon} alt="icon" className='icon_img'></img>
                                        </div>
                                        <input type="text" className='input_element' placeholder='Profile URL'></input>
                                    </div>
                                </div>
                                <div className='input_box'>
                                    <label>Instagram</label>
                                    <div className='input_flexbox'>
                                        <div className='icon_holder'>
                                            <img src={InstaIcon} alt="icon" className='icon_img'></img>
                                        </div>
                                        <input type="text" className='input_element' placeholder='Profile URL'></input>
                                    </div>
                                </div>
                                <div className='input_box'>
                                    <label>Behance</label>
                                    <div className='input_flexbox'>
                                        <div className='icon_holder'>
                                            <img src={BehanceIcon} alt="icon" className='icon_img'></img>
                                        </div>
                                        <input type="text" className='input_element' placeholder='Profile URL'></input>
                                    </div>
                                </div>
                                <div className='input_box'>
                                    <label>Gmail</label>
                                    <div className='input_flexbox'>
                                        <div className='icon_holder'>
                                            <img src={GoogleIcon} alt="icon" className='icon_img'></img>
                                        </div>
                                        <input type="text" className='input_element' placeholder='Profile URL'></input>
                                    </div>
                                </div>
                                <div className='button-container'>
                                    <button className='saveBtn'>Save</button>
                                    </div>
                                </div>
                        </div>
                    ) : (
                        <ul className="socialProfile_listing">
                            <li className='list_item'>
                                <span className='label'>Facebook</span>
                                <span className='value'>Facebook Link</span>
                            </li>
                            <li className='list_item'>
                                <span className='label'>Instagram</span>
                                <span className='value'>Instagram Link</span>
                            </li>
                            <li className='list_item'>
                                <span className='label'>Behance</span>
                                <span className='value'>Behance Link</span>
                            </li>
                            <li className='list_item'>
                                <span className='label'>Gmail</span>
                                <span className='value'>Gmail Link</span>
                            </li>
                        </ul>
                    )
                }
            </div>
        </React.Fragment>
    )
}

export default SocialProfile;