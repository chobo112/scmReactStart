import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { Login } from '../pages/Login';
import { DashBoard } from '../component/layout/DashBoard/DashBoard';
import { NotFound } from '../component/common/NotFound/NotFound';
import { Notice } from '../pages/Notice';
import { ComnCodMgr } from '../pages/ComnCodMgr';

const routers: RouteObject[] = [
    { path: '*', element: <NotFound /> },
    { path: '/', element: <Login /> },
    {
        path: '/react',
        element: <DashBoard />,
        children: [
            { path: 'board', children: [{ path: 'notice.do', element: <Notice /> }] },
            { path: 'system', children: [{ path: 'comnCodMgr.do', element: <ComnCodMgr /> }] },
        ],
    },
];

export const Routers = createBrowserRouter(routers);
