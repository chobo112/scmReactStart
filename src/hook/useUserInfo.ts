import { useRecoilState } from 'recoil';
import { loginInfoState } from '../stores/userInfo';
import { useEffect } from 'react';

export const useUserInfo = () => {
    const [userInfo, setUserInfo] = useRecoilState(loginInfoState);

    useEffect(() => {
        const sessionStore = sessionStorage.getItem('userInfo');
        if (sessionStore) setUserInfo(JSON.parse(sessionStore));
    }, [setUserInfo]);

    useEffect(() => {
        if (Object.keys(userInfo).length > 0) sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    }, [userInfo]);
};
