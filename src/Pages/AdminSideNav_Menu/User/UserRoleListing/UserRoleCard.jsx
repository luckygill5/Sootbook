import React, { useState, useEffect } from 'react';
import { ReactComponent as Pen } from "../../../../assets/images/pen.svg";
import { ReactComponent as Bin } from "../../../../assets/images/trash-2.svg";
import { ReactComponent as FileText } from "../../../../assets/images/file-text.svg";
import { ReactComponent as Phone } from "../../../../assets/images/phone.svg";
import { ReactComponent as Mail } from "../../../../assets/images/mail.svg";
import "../User.scss"


function CardLayout({ cardData, employeData }) {

    return (
        <div className='cardview_flexbox'>
            {
                employeData &&
                employeData.length > 0 &&
                employeData.map((item, index) => {

                    return (
                        <div className='card' key={index}>
                            <div className='flex_container'>
                                <div className='role_info'>
                                    <div className='profile_flex'>
                                        <div className='image_box'>
                                           {item.avatar ? <img src={item.avatar} alt="profile_icon" className='profile_icon'></img> : <span className='img_placeholder'></span>} 
                                        </div>
                                        <div className='information'>
                                            <h5 className='title'>{`${item.first_name} ${item.last_name}`}</h5>
                                            <span className='designation'>{item.role}</span>
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
                                        {item.empId && <li>
                                            <span className='icon'>
                                                {<FileText/>}
                                            </span>
                                            <span className='text'>{item.empId}</span>
                                        </li>}
                                        {item.phone && <li>
                                            <span className='icon'>
                                                <Phone/>
                                            </span>
                                            <span className='text'>{item.phone}</span>
                                        </li>}
                                        {item.email && <li>
                                            <span className='icon'>
                                                <Mail/>
                                            </span>
                                            <span className='text'>{item.email}</span>
                                        </li>}
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