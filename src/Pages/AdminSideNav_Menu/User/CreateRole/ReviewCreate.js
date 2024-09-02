import React, { useState, useEffect } from 'react';
import { ReactComponent as Pen } from "../../../../assets/images/pen.svg";
import { ReactComponent as Check } from "../../../../assets/images/check.svg";
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { RolePermissionSave } from '../../../../services/RolePermissionSave.service';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseX from "../../../../assets/images/x-cross.svg";
import SuccessIcon from "../../../../assets/images/Static Icon.svg";
import ErrorModal from '../../../../Components/CommonErrorModal/ErrorModal';
import './CreateRole.scss'


function ReviewCreate({ back, next, basicFormData, permissionFormData, ReviewBasicEdit, ReviewPermissionEdit }) {
    const [permissionFilter, setPermissionFilter] = useState("");
    const [errorModal, SetErrorModal] = useState(false);
    const [errorModalMsg, SetErrorModalMsg] = useState(false);
    const [roleAdded, setRoleAdded] = useState(false)
    const data = useSelector((state) => state?.userSaveList?.data?.permission);
    // const permisionListData = ["Create, edit, and delete user accounts", "Create, edit, and delete user accounts", "Create, edit, and delete user accounts", ]

    useEffect(() => {
        let permissionFilterData = [];
        data.map((item) => {
            Object.keys(item).filter((data, index) => {

                if (permissionFormData.includes(item[data])) {
                    permissionFilterData.push(item)
                }
            })
        })

        setPermissionFilter(permissionFilterData)
    }, [])

    const handleReviewSave = () => {
        RolePermissionSave(basicFormData, permissionFormData).then((response) => {
            if (response && response.status == false) {
                SetErrorModal(true)
                SetErrorModalMsg(response?.message && response.message)

            }
            if (response && response.status == true) {
                setRoleAdded(true)
            }

        })
    }

    const handleModalErrorPopUP = () => {
        SetErrorModal(false)
    }

    const handleDialogClose = () => {
        setRoleAdded(false)
    }

    return (
        <React.Fragment>
            <div className='reviewCreate_container'>
                <div className='basicData_container'>
                    <div className='headerFlexbox'>
                        <h5 className='section_title'>
                            <span className='icon'>
                                <Check />
                            </span>
                            Basic
                        </h5>
                        <button className='editBtn' type='button' onClick={() => {
                            sessionStorage.setItem("basicEdit", true)
                            ReviewBasicEdit()
                        }}><span className='icon'><Pen /></span>Edit</button>
                    </div>
                    <ul className='basic_listing'>
                        <li className='list_item'><span className='label'>Name</span><span className='text'>{basicFormData.role_name}</span></li>
                        <li className='list_item'><span className='label'>Description</span><span className='text'>{basicFormData.role_description}</span></li>
                    </ul>
                </div>
                <div className='permissionData_container'>
                    <div className='headerFlexbox'>
                        <h5 className='section_title'>
                            <span className='icon'>
                                <Check />
                            </span>
                            Permission
                        </h5>
                        <button className='editBtn' type='button' onClick={() => {

                            ReviewPermissionEdit()
                        }}><span className='icon'><Pen /></span>Edit</button>
                    </div>
                    <ul className='permission_listing'>
                        {
                            permissionFilter &&
                            permissionFilter.length > 0 &&
                            permissionFilter.map((label, index) => {
                                return <li key={index} className='list_item'><span className='text'>{label.name}</span></li>
                            })
                        }
                    </ul>
                </div>
                <div className='bottom_actions'>
                    <button className='backBtn' type="button" onClick={() => back()}>Back</button>
                    <button className='nextBtn' type='button' onClick={() => handleReviewSave()}>Save</button>
                </div>
            </div>

            {
                roleAdded && <Dialog className='addRole_successModal' onClose={handleDialogClose} open={roleAdded}>
                    <button className='close_btn' type='submit' onClick={() => handleDialogClose()}><img src={CloseX} alt="close_icon" className='close_img'></img></button>
                    <div className='successiconBlock'>
                        <img src={SuccessIcon} alt="static_icon" className='success_icon'></img>
                    </div>
                    <DialogTitle className='modal_title'>The custom new role has been created successfully</DialogTitle>
                    <p className='message'>The new role has been successfully updated in the system.</p>
                </Dialog>
            }

            {
                errorModal && <ErrorModal
                    handleErrorClose={handleModalErrorPopUP}
                    ErrorPopUp={errorModal}
                    ErrorMsg={errorModalMsg}
                />
            }
        </React.Fragment>
    )
}

export default ReviewCreate