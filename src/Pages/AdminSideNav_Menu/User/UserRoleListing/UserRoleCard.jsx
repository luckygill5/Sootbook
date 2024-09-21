import React from 'react';
import swal from 'sweetalert';
import { UserDelete } from '../../../../services/userSave.service';
import { ReactComponent as Pen } from '../../../../assets/images/pen.svg';
import { ReactComponent as Bin } from '../../../../assets/images/trash-2.svg';
import { ReactComponent as FileText } from '../../../../assets/images/file-text.svg';
import { ReactComponent as Phone } from '../../../../assets/images/phone.svg';
import { ReactComponent as Mail } from '../../../../assets/images/mail.svg';
import '../User.scss';
import EmployeeInfo from '../../../../Components/Admin/AdminDashBoardContent/EmployeeInfo/EmployeeInfo';

function CardLayout({ employeData, setEditUserData, Userhandle, rolePermissionList }) {
    const handleUserDelete = async userId => {
        swal({
            title: 'Are you sure you want to delete this user?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(willDelete => {
            if (willDelete) {
                UserDelete(userId).then(response => {
                    if (response && response.status == true) {
                        swal('User is deleted!');
                    } else if (response && response.status == false) {
                        swal("Failed", `Error deleting user`, "error");
                    }
                });
            }
        });
    };

    const handleClick = () =>{
        console.log("Button clciked");
        // <EmployeeInfo/>
        
    }
    return (
        <div className='cardview_flexbox'>
            {employeData &&
                employeData.length > 0 &&
                employeData.map((item, index) => {
                    const getRole = role => {
                        const matchedRole = rolePermissionList?.find(item => item?._id === role );
                        if (matchedRole) {
                            console.log(item);
                        
                            return matchedRole?.name;
                        } else {
                            console.error("rolePermissionList is not defined or is not an array");

                        }
                       
                    };

                    return (
                        <div className='card' key={index}>
                            <div className='flex_container'>
                                <div className='role_info'>
                                    <div className='profile_flex'>
                                        <div className='image_box'>
                                            {item.avatar ? (
                                                <img src={item.avatar} alt='profile_icon' className='profile_icon'></img>
                                            ) : (
                                                <span className='img_placeholder'></span>
                                            )}
                                        </div>
                                        <div className='information' onClick={handleClick} style={{ cursor: 'pointer' }}>
                                            
                                            <h5 className='title'>{`${item.first_name} ${item.last_name}`}</h5>
                                            <span className='designation'>{getRole(item.role)}</span>
                                        </div>
                                    </div>
                                    <div className='actions'>
                                        <span className='statusLabel'>{item.status}</span>
                                        <button className='actionBtn' onClick={() => {handleUserDelete(item._id)}}>
                                            <Bin />
                                        </button>
                                        <button
                                            className='actionBtn'
                                            onClick={() => {
                                                Userhandle();
                                                setEditUserData(item);
                                            }}
                                        >
                                            <Pen />
                                        </button>
                                    </div>
                                </div>
                                <div className='personal_info'>
                                    <ul>
                                        {item.empId && (
                                            <li>
                                                <span className='icon'>{<FileText />}</span>
                                                <span className='text'>{item.empId}</span>
                                            </li>
                                        )}
                                        {item.phone && (
                                            <li>
                                                <span className='icon'>
                                                    <Phone />
                                                </span>
                                                <span className='text'>{item.phone}</span>
                                            </li>
                                        )}
                                        {item.email && (
                                            <li>
                                                <span className='icon'>
                                                    <Mail />
                                                </span>
                                                <span className='text'>{item.email}</span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

export default CardLayout;
