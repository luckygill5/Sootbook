import { apiUrl, port } from './constants.servics';
import axios from 'axios';

export const Registration = formData => {
    const {
        userid,
        file,
        companyname,
        industryselectedData,
        companyTypeData,
        countryselectedData,
        address,
        tin,
        vat,
        employeeNumber,
        heardValue,
        multibranch,
        subscribeNews,
    } = formData;
    const RegistrationUrl = `${apiUrl}:${port}/api/admin/vendor/registration`;
    return (
        axios(RegistrationUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-via-device': true,
            },
            data: {
                userId: userid,
                // "files": file.name,
                company_name: companyname,
                industryId: industryselectedData,
                company_type: companyTypeData,
                countryId: countryselectedData,
                address: address,
                tin: tin,
                vat: vat,
                employee_number: JSON.stringify(employeeNumber),
                heard_about_us: heardValue,
                multiBranch: multibranch,
                subscribe: subscribeNews ? 'Yes' : 'No',
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
