import { apiUrl, port } from './constants.servics';
import axios from 'axios';

export const UserSaveList = () => {
    const UserSaveListUrl = `${apiUrl}:${port}/api/admin/vendor/userSaveList`;
   const accessToken =  `Bearer ${sessionStorage.accessToken} `
    return (
        axios(UserSaveListUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-via-device': true,
                'Authorization' : accessToken
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
