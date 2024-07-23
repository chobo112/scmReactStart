import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ComnCodMgr } from './api';

export const postComnCodMgrApi = async <T>(dataObj: object) => {
    const postAction: AxiosRequestConfig = {
        method: 'POST',
        // '/system/listComnGrpCodJson.do'
        url: ComnCodMgr.main,
        data: dataObj,
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
