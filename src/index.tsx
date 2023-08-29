import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    RouterProvider,
    createBrowserRouter,
    createHashRouter,
} from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ErrorPage } from './page/error/ErrorPage';
import { Home } from './page/Home';
import { LoginPage } from './page/LoginPage';
import { SignUpPage } from './page/SignUp';
import { ShareDiary } from './page/ShareDiary';
import { Follow } from './page/Follow';
import { Message } from './page/Message';
import { Statistics } from './page/Statistics';
import { Profile } from './page/Profile';
import { MyShareDiary } from './page/MyShareDiary';
import { userSelector } from './recoil/authAtom';
import { ProtectedRoute } from './routes/ProtectedRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage errorCode='' message='' />,
        children: [
            { index: true, element: <ProtectedRoute page={<Home />} /> },
            { path: '/login', element: <LoginPage /> },
            { path: '/signup', element: <SignUpPage /> },
            { path: '/shareDiary', element: <ShareDiary /> },
            { path: '/follow', element: <Follow /> },
            { path: '/message', element: <Message /> },
            { path: '/statistics', element: <Statistics /> },
            { path: '/profile/:profileuser', element: <Profile /> },
            { path: '/mysharediary', element: <MyShareDiary /> },
        ],
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(<RouterProvider router={router}></RouterProvider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
