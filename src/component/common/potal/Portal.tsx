import { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';

type ProtalProps = {
    children: ReactNode;
};

export const Protal: FC<ProtalProps> = ({ children }) => {
    return ReactDOM.createPortal(children, document.body);
};
