import styled from 'styled-components';

export const PageNavigateStyled = styled.div`
    text-align: center;
    margin: 0 auto;
    position: relative;
    background-color: #dce1e6;

    ul {
        list-style: none;
        padding: 0;
        position: absolute;
        top: 50%;
        left: 30%;
    }

    li {
        padding: 8px;
        margin: 1px;
        float: left;

        a {
            color: black;
            text-decoration: none;
        }

        &:hover {
            background-color: skyblue;
            a {
                color: white;
            }
        }
    }

    .active {
        background-color: skyblue;
        border: 1px solid black;
        color: white;
        border-radius: 5px;
    }

    .disabled {
        visibility: hidden;
    }
`;
