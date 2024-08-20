import * as constants from "../Constants/constant";
import axios from "axios";


export const loginService = (data) => {
    const {apiUrl, port} = constants;
    const {emailData, passwordData} =  data
    const CountryListUrl = `${apiUrl}:${port}/api/admin/vendor/login`
    return axios (CountryListUrl, {
        method:"POST",
        headers: {
            "Content-Type" :"application/json",
            "x-via-device":true
        },
        data:{
            email:emailData,
            password:passwordData
        }
    })// Handle the response from backend here
    .then((res) => {
        return res.data
    })

    // Catch errors if any
    .catch((err) => {
        throw err
    });
}