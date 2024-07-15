import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { RouterProvider } from 'react-router-dom';
import { Routers } from './routers/Routers';
// import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <RecoilRoot>
        <RouterProvider router={Routers} />
    </RecoilRoot>
);
