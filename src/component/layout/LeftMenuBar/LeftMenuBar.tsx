import { useState } from 'react';
import logoImage from '../../../assets/logo.png';
import logo_img from '../../../assets/logo_img.png';
import menu from '../../../assets/menu.png';
import { ILoginInfo, IMenuState } from '../../../models/interface/store/userInfo';
import { loginInfoState } from '../../../stores/userInfo';
import { LeftMenuBarStyled, StyledLink } from './styled';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

export const LeftMenuBar = () => {
    const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
    const [isClick, setIsClick] = useState<boolean>(false);
    const navigate = useNavigate();

    const handlerClick = () => {
        setIsClick(!isClick);
    };

    const handlerLogout = () => {
        sessionStorage.setItem('userInfo', '');
        navigate('/');
    };

    return (
        <LeftMenuBarStyled isclicked={isClick.toString()}>
            <a href="/react">
                <img src={logo_img} alt="happyjob" />
            </a>
            <div className="logo-box">
                <img src={logoImage} alt="logoImage" />
                <div className="user-info">
                    <div>{userInfo.loginId}</div>
                    <button onClick={handlerLogout}>로그아웃</button>
                </div>
            </div>
            <ul>
                {userInfo?.usrMnuAtrt?.map((menuAttrt: IMenuState) => {
                    return (
                        <li key={menuAttrt.mnu_id} className="parent-menu">
                            <img src={menu} alt="menu" />
                            {menuAttrt.mnu_nm}
                            <div className="child-menu-box" onClick={handlerClick}>
                                {menuAttrt.nodeList.map((node) => {
                                    return (
                                        <StyledLink to={'/react' + node.mnu_url} key={node.mnu_id}>
                                            <div onClick={handlerClick}>{node.mnu_nm}</div>
                                        </StyledLink>
                                    );
                                })}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </LeftMenuBarStyled>
    );
};
