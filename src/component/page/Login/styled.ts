import styled from 'styled-components';

export const LoginStyled = styled.div`
    padding-top: 10px;
    .login-container {
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        width: 100%;
        text-align: center;
        background-image: radial-gradient(ellipse farthest-corner at 0 140%, #5d9dff 0%, #2178ff 70%, #3585ff 70%);
    }

    .login-image {
        background-position: center;
        width: 100%;
        border-radius: 10px 0px 0px 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
    }
    .login-box {
        background-color: white;
    }

    .buttons {
        padding: 20px;
        justify-content: center;
        align-items: center;
        display: grid;
    }

    label {
        display: flex;
        font-size: 14px;
        color: #333333;
    }

    input {
        padding: 8px;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-right: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    button {
        width: 100%;
        padding: 10px;
        margin: 5px 0;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
    }

    .login-text {
        padding-top: 50px;
        padding-bottom: 30px;
        color: #ffffff;
    }
    .login-button {
        background-color: #2676bf;
        color: #ffffff;
    }

    .signup-button {
        background-color: #28a745;
        color: #ffffff;
    }

    button:hover {
        opacity: 0.9;
    }
`;
