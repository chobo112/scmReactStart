import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LeftMenuBarStyled = styled.div`
    a {
        cursor: pointer;
    }
    .logo-box {
        background: #2676bf;

        img {
            top: 22px;
            left: 14px;
            width: 66px;
            height: 66px;
            padding: 10px;
        }

        .user-info {
            position: relative;
            right: 120px;
            top: 30px;
            float: right;
        }
    }
    ul {
        background: skyblue;
        list-style-type: none;
        padding: 0;
    }

    .parent-menu {
        padding-top: 30px;
        border-bottom: 1px solid #d6effc;
        color: #602e2e;
        &:hover {
            transition: 1s;
            .child-menu-box {
                opacity: 1;
                visibility: visible;
                height: 100%;
                margin-top: 30px;
            }
        }

        .child-menu-box {
            display: block;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.2s, visibility 0s;
            background: #2e9acc;
            height: 0;
            padding-left: 20px;
            padding-top: 10px;
            padding-bottom: 10px;
            margin: 0;
            div {
                margin: 10px 0 10px 0;
                &:hover {
                    text-decoration: underline;
                    color: white;
                }
            }
        }

        img {
            padding-left: 10px;
            padding-right: 10px;
        }
    }
`;

export const StyledLink = styled(Link)`
    color: #602e2e;
    text-decoration: none;
`;
