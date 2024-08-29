import React, { useState, useEffect } from 'react';
import {ReactComponent as Pen} from "../../../../assets/images/pen.svg";
import {ReactComponent as Check} from "../../../../assets/images/check.svg";


function ReviewCreate({back, next}){
    const permisionListData = ["Create, edit, and delete user accounts", "Create, edit, and delete user accounts", "Create, edit, and delete user accounts", ]

    return(
        <div className='reviewCreate_container'>
            <div className='basicData_container'>
                <div className='headerFlexbox'>
                    <h5 className='section_title'>
                        <span className='icon'>
                            <Check/>
                        </span>
                        Basic
                    </h5>
                    <button className='editBtn' type='button' onClick={() => back()}><span className='icon'><Pen/></span>Edit</button>
                </div>
                <ul className='basic_listing'>
                    <li className='list_item'><span className='label'>Name</span><span className='text'>Human resources</span></li>
                    <li className='list_item'><span className='label'>Description</span><span className='text'>Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like </span></li>
                </ul>
            </div>
            <div className='permissionData_container'>
            <div className='headerFlexbox'>
                    <h5 className='section_title'>
                        <span className='icon'>
                            <Check/>
                        </span>
                        Permission
                    </h5>
                    <button className='editBtn' type='button' onClick={() => next()}><span className='icon'><Pen/></span>Edit</button>
                </div>
                <ul className='permission_listing'>
                    {
                        permisionListData &&
                        permisionListData.length > 0 &&
                        permisionListData.map((label, index) => {
                            return <li key={index} className='list_item'><span className='text'>{label}</span></li>
                        })
                    }
                </ul>
            </div>
            <div className='bottom_actions'>
                        <button className='backBtn' type="button" >Back</button>
                        <button className='nextBtn' type='button'>Next</button>
                    </div>
        </div>
    )
}

export default ReviewCreate