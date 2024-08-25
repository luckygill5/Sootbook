import axios from 'axios';
import { apiUrl, port } from './constants.servics';

const axiosClient = axios.create({
    baseURL: `${apiUrl}:${port}/api/`,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

const axiosFileClient = axios.create({
    baseURL: `${apiUrl}:${port}/api/`,
    headers: {
        Accept: 'application/json',
    },
});

export { axiosClient, axiosFileClient };
