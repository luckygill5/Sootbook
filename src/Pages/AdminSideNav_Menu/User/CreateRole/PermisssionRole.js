import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Select, TextArea } from '../../../../Components/common';
import Switch from '@mui/material/Switch';


function PermissionRole({back, next,formData, PermissionFormData}) {
    const data = useSelector((state) => state?.userSaveList?.data);
    const [permissionData, setPermissionData] = useState([])

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    // const permisionListData = ["Create, edit, and delete user accounts", "Create, edit, and delete user accounts", "Create, edit, and delete user accounts", ]
   
    const handleChange = (event) => {
        const {name, checked} = event.target;
        if(checked == true){
            setPermissionData([...permissionData,name])
        }
        else if(checked == false){
            setPermissionData([])
        }
    }


    const handlePermissionNext = () => {
        if(permissionData.length > 0){
            formData(permissionData)
            next()
        }
        else if(PermissionFormData.length > 0){
            formData(PermissionFormData)
            next() 
        }
        
    }

    return (
        <div className='permissionrole_container'>
            <h5 className='section_title'>List of Permissions</h5>
            <div className='form_container'>
                <form>
                    <ul className='permission_listing'>
                        {data.permission && 
                        data.permission.length > 0 && 
                        data.permission.map((item, index) => {
                            return <li key={index} className='list_item'><span className='text'>{item.name}</span><span className='action'><Switch name={item._id} checked={permissionData.includes(item._id) ? true :PermissionFormData.includes(item._id) ? true : false} onChange={handleChange} {...label} /></span></li>
                        })
                    }
                    </ul>
                    <div className='bottom_actions'>
                        <button className='backBtn' type="button" onClick={() => {
                            sessionStorage.setItem("prevPage", 'Permission_Role')
                            back()
                            }}>Back</button>
                        <button className='nextBtn' type='button' disabled={permissionData.length > 0 ? false : PermissionFormData.length > 0 ? false: true} onClick={() => handlePermissionNext()}>Next</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PermissionRole;