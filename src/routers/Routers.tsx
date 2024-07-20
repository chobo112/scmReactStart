import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { Login } from '../pages/Login';
import { DashBoard } from '../component/layout/DashBoard/DashBoard';
import { Notice } from '../pages/Notice';
import { ComnCodMgr } from '../pages/ComnCodMgr';
import { ComnCodMgrDetailMain } from '../component/page/ComnCodMgr/ComnCodMgrDetail/ComnCodMgrDetailMain';

const routers: RouteObject[] = [
    { path: '/', element: <Login /> },
    {
        path: '/react',
        element: <DashBoard />,
        children: [
            { path: 'board', children: [{ path: 'notice.do', element: <Notice /> }] },
            {
                path: 'system',
                children: [
                    { path: 'comnCodMgr.do', element: <ComnCodMgr /> },
                    { path: 'comnCodMgr.do/:grpCod', element: <ComnCodMgrDetailMain /> },
                ],
            },
        ],
    },
];

export const Routers = createBrowserRouter(routers);
