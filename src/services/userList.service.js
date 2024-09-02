import { apiUrl, port } from './constants.servics';
import axios from 'axios';

export const UserList = () => {
    const UserListUrl = `${apiUrl}:${port}/api/admin/vendor/userList`;
   const accessToken =  `Bearer ${sessionStorage.accessToken} `
    return (
        axios(UserListUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-via-device': true,
                'Authorization' : accessToken
            },
            data: {
                "search":"",
                "role":[],
                "status":[],
                "columnList":[],
                "page":"1",
                "limit":"10"
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
