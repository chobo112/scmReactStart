import axios, { AxiosResponse } from 'axios';
import { Login } from './api';

export const postLoginApi = async (param: URLSearchParams) => {
    try {
        const result = await axios.post(Login.login, param);
    } catch (error) {}
};
