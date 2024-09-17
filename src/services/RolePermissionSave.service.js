import { apiUrl, port } from './constants.servics';
import axios from 'axios';

export const RolePermissionSave = (basicFormData, permissionFormData) => {
    const RolePermissionSaveUrl = `${apiUrl}:${port}/api/admin/rolepermission/save`;
   const accessToken =  `Bearer ${sessionStorage.accessToken} `;
    return (
        axios(RolePermissionSaveUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-via-device': true,
                'Authorization' : accessToken
            },
            data: {
                name:basicFormData.role_name,
                description:basicFormData.role_description,
                permissions:permissionFormData
            },
        }) // Handle the response from backend here
            .then(res => {
                return res.data;
            })

            // Catch errors if any
            .catch(err => {
                throw err;
                
            })
    );
};
