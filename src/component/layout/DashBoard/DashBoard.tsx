import { Suspense, useEffect } from 'react';
import { LeftMenuBar } from '../LeftMenuBar/LeftMenuBar';
import { DashBoardStyled } from './styled';
import { Outlet, useNavigate } from 'react-router-dom';
import { ILoginInfo } from '../../../models/interface/store/userInfo';
import { useUserInfo } from '../../../hook/useUserInfo';
export const DashBoard = () => {
    const userInfo = sessionStorage.getItem('userInfo');
    const navigate = useNavigate();
    useUserInfo();

    useEffect(() => {
        if (userInfo) {
            const userInfoObj: ILoginInfo = JSON.parse(userInfo);
            if (userInfoObj.result !== 'SUCCESS') {
                alert('로그인을 실패했습니다');
                navigate('/');
            }
        } else {
            alert('로그인부터 해주세요');
            navigate('/');
        }
    }, [userInfo]);
    return (
        <DashBoardStyled>
            <ul className="dashboard-ul">
                <li className="menu-bar">{<LeftMenuBar />}</li>
                <li className="content">
                    <Suspense fallback={<h2>Loading....</h2>}>{<Outlet />}</Suspense>
                </li>
            </ul>
        </DashBoardStyled>
    );
};
