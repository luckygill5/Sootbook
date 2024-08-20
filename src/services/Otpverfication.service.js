import * as constants from "../Constants/constant";
import axios from "axios";


export const Otpverification = (useridData, otpData) => {
    const { apiUrl, port } = constants;

    const CountryListUrl = `${apiUrl}:${port}/api/admin/vendor/otp/verify`
    return axios(CountryListUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-via-device": true
        },
        data: {
            "userId": useridData,
            "otp": otpData,
            
        }
    })// Handle the response from backend here
        .then((res) => {
            return res
        })

        // Catch errors if any
        .catch((err) => {
            throw err
        });
}