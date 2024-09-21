import React, { useState, useEffect } from 'react';
import './Employee.scss';
import EmployeeRolesList from './EmployeeRoleListing/EmployeeRoleListing';
import AddNewEmployee from '../../EmployeeMaster/AddNewEmployee/AddNewEmployee';
import EmployeeMaster from '../../EmployeeMaster/EmployeeMaster';

function Employee(props) {
    const [AddEmployee, setAddEmployee] = useState(false);
    const [editUserData, setEditUserData] = useState(null);

    const handleAddEmployee = () => {
        setAddEmployee(true);
    };
    // const handleBack = () => {
    //     setNewRole(false);
    //     setAddEmployee(true);
    // };
    const handleBackHRM = () => {
        setAddEmployee(false);
        setEditUserData(null);

    };

    return (
        <div className='user_container'>
            {AddEmployee ? (
                <EmployeeMaster handleBackHRM={() => handleBackHRM()} />
            ) : (
                <EmployeeRolesList Userhandle={() => handleAddEmployee()} setEditUserData={setEditUserData}  />
            )}
        </div>
    );
}

export default Employee;
