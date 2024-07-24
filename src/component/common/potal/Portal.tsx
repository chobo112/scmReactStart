import { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface ProtalProps {
    children: ReactNode;
}

export const Protal: FC<ProtalProps> = ({ children }) => {
    return ReactDOM.createPortal(children, document.body);
};
