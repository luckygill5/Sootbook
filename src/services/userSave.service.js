import { apiUrl, port } from './constants.servics';
import axios from 'axios';

export const UserSave = (values, country, permission) => {
    const UserSaveUrl = `${apiUrl}:${port}/api/admin/vendor/user/save`;
   const accessToken =  `Bearer ${sessionStorage.accessToken} `
    return (
        axios(UserSaveUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-via-device': true,
                'Authorization' : accessToken
            },
            data: {
                name:values.Name, 
                email:values.Email,
                phone:values.Contact_Number,
                password:values.password,
                role:values.Role,
                status:values.Status,
                permissions:permission ? permission : [],
                country:country == "IND" ? "India" : ''
            }
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
