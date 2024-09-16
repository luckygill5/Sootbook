import React, { useState, useEffect } from 'react';
import UserRoleList from './UserRoleListing/UserRoleListing';
import UserAdd from './AddUser/AddUser';
import AddNewUser from './AddUser/AddNewUser';
import CreateRole from './CreateRole/CreateRole';
import './User.scss';

function User(props) {
    const [AddUser, setAddUser] = useState(false);
    const [NewRole, setNewRole] = useState(false);
    const [editUserData, setEditUserData] = useState(null);

    const handleAddUser = () => {
        setAddUser(true);
    };

    const handleUserNewRole = () => {
        setNewRole(true);
        setAddUser(false);
    };

    const handleBack = () => {
        setNewRole(false);
        setAddUser(true);
    };
    const handleBackHRM = () => {
        setNewRole(false);
        setAddUser(false);
    };

    return (
        <div className='user_container'>
            {NewRole ? (
                <CreateRole back={() => handleBack()} />
            ) : AddUser ? (
                <AddNewUser backHRM={() => handleBackHRM()} editUserData={editUserData} NewRole={() => handleUserNewRole()} />
            ) : (
                <UserRoleList Userhandle={() => handleAddUser()} setEditUserData={setEditUserData} />
            )}
        </div>
    );
}

export default User;
