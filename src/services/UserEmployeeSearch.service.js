import { apiUrl, port } from './constants.servics';
import axios from 'axios';

export const UserListSearch = (searchValue) => {
    const UserListSearchUrl = `${apiUrl}:${port}/api/admin/vendor/userList/search`;
   const accessToken =  `Bearer ${sessionStorage.accessToken} `
    return (
        axios(UserListSearchUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-via-device': true,
                'Authorization' : accessToken
            },
            data: {
                search:searchValue
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
