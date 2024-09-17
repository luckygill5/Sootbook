import React, { useState } from 'react';
import AddNewEmployee from './AddNewEmployee/AddNewEmployee';
import { ReactComponent as UserPlus } from "../../assets/images/user-plus.svg";
import { ReactComponent as Download } from "../../assets/images/download.svg";
import { ReactComponent as Setting } from "../../assets/images/settings.svg";
import { ReactComponent as List } from "../../assets/images/list.svg";
import { ReactComponent as UserSquare } from "../../assets/images/user-square-2.svg";


function EmployeeMaster({handleBackHRM}) {

    const [addEmployee, setAddEmployee] = useState(true)

    const handleAddNewEmployee = () => {
        setAddEmployee(true)
    }


    return (
        <div className='form_container'>
            {addEmployee ? <AddNewEmployee handleBackHRM={handleBackHRM} /> :
                
                    ""}
        </div>
    )
}

export default EmployeeMaster;