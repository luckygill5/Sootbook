import { apiUrl, port } from './constants.servics';
import axios from 'axios';

export const fetchCategoryList = (categoryId = '') => {
    const UserListUrl = `${apiUrl}:${port}/api/admin/category/all`;
    const accessToken = `Bearer ${sessionStorage.accessToken} `;
    return (
        axios(UserListUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-via-device': true,
                Authorization: accessToken,
            },
            data: {
                categoryId: categoryId,
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

export const createCategory = ({ name, categoryId, masterCategory }) => {
    const UserSaveUrl = `${apiUrl}:${port}/api/admin/category/create`;
    const accessToken = `Bearer ${sessionStorage.accessToken} `;
    return axios(UserSaveUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-via-device': true,
            Authorization: accessToken,
        },
        data: {
            categoryId: categoryId?.length > 0 ? categoryId : masterCategory?.length > 0 ? masterCategory : '',
            name: name,
        },
    })
        .then(res => {
            return res.data;
        })
        .catch(err => {
            throw err;
        });
};
export const updateCategoryDetails = ({ id, name, categoryId, masterCategory }) => {
    const UserSaveUrl = `${apiUrl}:${port}/api/admin/category/update`;
    const accessToken = `Bearer ${sessionStorage.accessToken} `;
    return axios(UserSaveUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-via-device': true,
            Authorization: accessToken,
        },
        data: {
            id: id,
            categoryId: categoryId?.length > 0 ? categoryId : masterCategory?.length > 0 ? masterCategory : '',
            name: name,
        },
    })
        .then(res => {
            return res.data;
        })
        .catch(err => {
            throw err;
        });
};
