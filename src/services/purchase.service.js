import {apiUrl, port} from "./constants.servics";
import axios from "axios";


export const Purchase = (data) => {
    const {userId, amount} = data;
    const PurchaseUrl = `${apiUrl}:${port}/api/admin/vendor/purchase`
    return axios(PurchaseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-via-device": true
        },
        data: {
            "userId": userId,
            "subscriptionId": amount,
            "payment": {
                "orderId" : 'ord12345',
                "paymentId" : 'pay12345',
                "signature" : 'sig12345'
            },
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