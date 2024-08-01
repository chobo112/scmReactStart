import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const postComnCodMgrApi = async <T>(url: string, dataObject: object) => {
    const postAction: AxiosRequestConfig = {
        method: 'POST',
        url: url,
        data: dataObject,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const result: AxiosResponse<T> = await axios(postAction);
        return result.data;
    } catch (error) {
        alert(error);
    }
};
