import React, { useState, useEffect } from 'react';
import LeftArrow from "../../../../assets/images/arrow-left.svg";
import BasicRole from './BasicRole';
import PermissionRole from './PermisssionRole';
import ReviewCreate from './ReviewCreate';
import './CreateRole.scss';



function CreateRole({back}){
    const [activeStep, setActiveStep] = useState([1]);
    const [basic, setBasic] = useState(true);
    const [permissionRole, setPermissionRole] = useState(false);
    const [reviewCreate, setReviewCreate] = useState(false)

    const stepperData = ["Basic", "Permission", "Review & create"];

    const handleNext = () => {
       setActiveStep([1, 2]);
       setBasic(false)
       setReviewCreate(false)
       setPermissionRole(true)

    }

    const handleBack = () => {
        setActiveStep([1]);
        setBasic(true)
        setPermissionRole(false);
        setReviewCreate(false)
    }

    const handleReviewCreate = () => {
        setActiveStep([1,2, 3]);
        setBasic(false)
        setPermissionRole(false);
        setReviewCreate(true)
    }
    return (
        <div className='createRole_container'>
            <div className='backHrm-link'>
                <button className='backBtn' type='button' onClick={() => back()}><span className='icon'>
                    <img src={LeftArrow} alt="left-arrow" className='img_block'></img>
                </span>Back to Add user</button>
            </div>
            <div className='newRole_container'>
                <h5 className='section_title'>
                Add new role
                </h5>
                <div className='stepper_container'>
                    <ul className='stepper_list'>
                        {
                            stepperData &&
                            stepperData.length > 0 &&
                            stepperData.map((label, index) => {
                                return <li key={index} className={`list_item ${activeStep.includes(index+1) ? 'active' : ''}`}><span className='step'>{index+1}</span><span className='text'>{label}</span>{index+1!== stepperData.length &&<span className='bar'></span>}</li>
                            })
                        }
                        
                    </ul>
                </div>
                {
                    basic ? <BasicRole next={() => handleNext()}/>: permissionRole ? <PermissionRole back={() => handleBack()} next={() => handleReviewCreate()}/> : null
                }
                </div>
                {
                    reviewCreate && <ReviewCreate  next={() => handleNext()} back={() => handleBack()}/>
                }

        </div>
    )
}

export default CreateRole;
