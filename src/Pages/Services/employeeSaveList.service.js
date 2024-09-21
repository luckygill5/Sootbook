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
            data: {
                
                first_name:values?.first_name, 
                last_name:values?.last_name,
                email:values?.email,
                phone:values?.phone,
                password:values?.password,
                permission:permission ? permission : [],
                avatar: values?.avatar || "",
                gender: values?.gender || "",
                empId: values?.empId || "",
                dob: values?.dob || null,
                marital_status: values?.marital_status || "",
                country: values?.country || "",
                state: values?.state || "",
                city: values?.city || "",
                postal: values?.postal || "",
                religion: values?.religion || "",
                blood_group: values?.blood_group || "",
                nationality: values?.nationality || "",
                citizenship: values?.citizenship || "",
                address_1: values?.address_1 || "",
                address_2: values?.address_2 || "",
                bio: values?.bio || "",
                experience: values?.experience || "",
                social: {
                    facebook: values?.social?.facebook || "",
                    instagram: values?.social?.instagram || "",
                    behance: values?.social?.behance || "",
                    gmail: values?.social?.gmail || ""
                },
                bank: {
                    account_title: values?.bank?.account_title || "",
                    account_number: values?.bank?.account_number || "",
                    bank_name: values?.bank?.bank_name || "",
                    iban: values?.bank?.iban || "",
                    swift_code: values?.bank?.swift_code || "",
                    bank_branch: values?.bank?.bank_branch || ""
                },
                emergency: {
                    name: values?.emergency?.name || "",
                    phone: values?.emergency?.phone || "",
                    email: values?.emergency?.email || "",
                    address: values?.emergency?.address || ""
                },
                status: values?.status || "Inactive",
                document: values?.document || []
                

              
           
            
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
