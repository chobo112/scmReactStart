import { Suspense } from 'react';
import { LeftMenuBar } from '../LeftMenuBar/LeftMenuBar';
import { DashBoardStyled } from './styled';
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginInfoState } from '../../../stores/userInfo';
import { ILoginInfo } from '../../../models/interface/store/userInfo';
export const DashBoard = () => {
    const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
    if (!userInfo) {
        alert('로그인부터 해줘');
    }
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
