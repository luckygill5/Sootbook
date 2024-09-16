import { apiUrl, port } from './constants.servics';
import axios from 'axios';

export const UserSave = (values, country, permission) => {
    const UserSaveUrl = `${apiUrl}:${port}/api/admin/vendor/user/save`;
    const accessToken = `Bearer ${sessionStorage.accessToken} `;
    return (
        axios(UserSaveUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-via-device': true,
                Authorization: accessToken,
            },
            data: {
                userId:values.userId,
                role:values.role,
                status:values.status
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
