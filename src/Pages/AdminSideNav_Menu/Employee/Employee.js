import React, { useState, useEffect } from 'react';
import './Employee.scss';
import EmployeeRolesList from './EmployeeRoleListing/EmployeeRoleListing';
import AddNewEmployee from '../../EmployeeMaster/AddNewEmployee/AddNewEmployee';
import EmployeeMaster from '../../EmployeeMaster/EmployeeMaster';

function Employee(props) {
    const [AddEmployee, setAddEmployee] = useState(false);

    const handleAddEmployee = () => {
        setAddEmployee(true);
    };
    // const handleBack = () => {
    //     setNewRole(false);
    //     setAddEmployee(true);
    // };
    const handleBackHRM = () => {
        setAddEmployee(false);
    };

    return (
        <div className='user_container'>
            {AddEmployee ? (
                <EmployeeMaster handleBackHRM={() => handleBackHRM()} />
            ) : (
                <EmployeeRolesList Employeehandle={() => handleAddEmployee()} />
            )}
        </div>
    );
}

export default Employee;
