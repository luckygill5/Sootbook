import React, {useState, useEffect} from 'react';
import UserRoles from './UserRoleListing/UserRoleListing';
import './User.scss'


function User(props){

    return(
        <div className='user_container'>
            <UserRoles/>
        </div>
    )
}

export default User;