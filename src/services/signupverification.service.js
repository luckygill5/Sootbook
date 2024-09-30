import { apiUrl, port } from './constants.servics';
import axios from 'axios';

export const SignupVerification = (name, email, phone, password, countryData) => {
    const CountryListUrl = `${apiUrl}:${port}/api/admin/vendor/onboard`;
    return (
        axios(CountryListUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-via-device': true,
            },
            data: {
                name: name,
                email: email,
                phone: phone,
                password: password,
                countryId: countryData,
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
