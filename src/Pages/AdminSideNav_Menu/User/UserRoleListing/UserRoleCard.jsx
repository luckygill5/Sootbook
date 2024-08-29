import React, { useState, useEffect } from 'react';
import { ReactComponent as Pen } from "../../../../assets/images/pen.svg";
import { ReactComponent as Bin } from "../../../../assets/images/trash-2.svg";
import "../User.scss"


function CardLayout({ cardData }) {

    return (
        <div className='cardview_flexbox'>
            {
                cardData &&
                cardData.length > 0 &&
                cardData.map((item, index) => {

                    return (
                        <div className='card' key={index}>
                            <div className='flex_container'>
                                <div className='role_info'>
                                    <div className='profile_flex'>
                                        <div className='image_box'>
                                            <img src={item.profileImg} alt="profile_icon" className='profile_icon'></img>
                                        </div>
                                        <div className='information'>
                                            <h5 className='title'>{item.name}</h5>
                                            <span className='designation'>{item.designation}</span>
                                        </div>
                                    </div>
                                    <div className='actions'>
                                        <span className='statusLabel'>{item.status}</span>
                                        <button className='actionBtn'><Bin /></button>
                                        <button className='actionBtn'><Pen /></button>
                                    </div>
                                </div>
                                <div className='personal_info'>
                                    <ul>
                                        {
                                            item.SubData &&
                                            item.SubData.length > 0 &&
                                            item.SubData.map((data, index) => {
                                                return (
                                                    <li key={index}>
                                                        <span className='icon'>
                                                            {data.icon}
                                                        </span>
                                                        <span className='text'>{data.item}</span>
                                                    </li>
                                                )
                                            })
                                        }

                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CardLayout;