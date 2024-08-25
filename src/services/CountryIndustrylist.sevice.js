import { apiUrl, port } from './constants.servics';
import axios from 'axios';

export const CountryIndustryList = () => {
    const CountryListUrl = `${apiUrl}:${port}/api/admin/vendor/listRegistration`;
    return (
        axios(CountryListUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-via-device': true,
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
