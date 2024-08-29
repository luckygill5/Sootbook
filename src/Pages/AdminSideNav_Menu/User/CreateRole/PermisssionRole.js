import React, { useState, useEffect } from 'react';
import { Input, Select, TextArea } from '../../../../Components/common';
import Switch from '@mui/material/Switch';


function PermissionRole({back, next}) {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const permisionListData = ["Create, edit, and delete user accounts", "Create, edit, and delete user accounts", "Create, edit, and delete user accounts", ]
   
    return (
        <div className='permissionrole_container'>
            <h5 className='section_title'>List of Permissions</h5>
            <div className='form_container'>
                <form>
                    <ul className='permission_listing'>
                        {permisionListData && 
                        permisionListData.length > 0 && 
                        permisionListData.map((item, index) => {
                            return <li key={index} className='list_item'><span className='text'>{item}</span><span className='action'><Switch {...label} /></span></li>
                        })
                    }
                    </ul>
                    <div className='bottom_actions'>
                        <button className='backBtn' type="button" onClick={() => back()}>Back</button>
                        <button className='nextBtn' type='button' onClick={() => next()}>Next</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PermissionRole;