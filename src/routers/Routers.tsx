import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { Login } from '../pages/Login';
import { DashBoard } from '../component/layout/DashBoard/DashBoard';
import { Notice } from '../pages/Notice';

const routers: RouteObject[] = [
    { path: '/', element: <Login /> },
    {
        path: '/react',
        element: <DashBoard />,
        children: [{ path: 'board', children: [{ path: 'notice.do', element: <Notice /> }] }],
    },
];

export const Routers = createBrowserRouter(routers);
