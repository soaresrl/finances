import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';
import App from './App';
import Expenses from './pages/Expenses';

const container = document.getElementById('root')!;

const root: ReactDOM.Root = ReactDOM.createRoot(container);

root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />}>
                <Route path='/expenses' element={<Expenses />}/>
            </Route>
        </Routes>
    </BrowserRouter>
);