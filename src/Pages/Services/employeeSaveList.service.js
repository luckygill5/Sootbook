import { apiUrl, port } from './constants.servics';
import axios from 'axios';

export const EmployeeSaveList = (values, country, permission) => {
    console.log("Hi Hit done");
    
    const EmployeeSaveUrl = `${apiUrl}:${port}/api/admin/vendor/emloyee/save`;
    const accessToken =  `Bearer ${sessionStorage.accessToken} `
    return (
        axios(EmployeeSaveUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-via-device': true,
                'Authorization' : accessToken
            },
            data: {data:values}
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
