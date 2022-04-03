import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import 'antd/dist/antd.css'
import App from './App';
import { AuthProvider } from './contexts/auth';
import Loading from './components/Loading';
import { LoadingProvider } from './contexts/useLoading';

const container = document.getElementById('root')!;

const root: ReactDOM.Root = ReactDOM.createRoot(container);

const user = localStorage.getItem('userInfo');

root.render(
    <AuthProvider user={user}>
        <LoadingProvider>
            <>
                <App />
                <Loading />
            </>
        </LoadingProvider>
    </AuthProvider>
);