import React, { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { useAuth } from './contexts/auth';
import Expenses from './pages/Expenses';
import Incomes from './pages/Incomes';
import InSessionPage from './pages/InSessionPage';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';

const App: React.FC = (): ReactElement => {
  
  const { signed } = useAuth();

  return (
    <BrowserRouter>
      {
        signed ?
        (
          <Routes>
            <Route path='/' element={<InSessionPage />}>
              <Route path='/expenses' element={<Expenses />}/>
              <Route path='/incomes' element={<Incomes />}/>
            </Route>
          </Routes>
        ) :
        (
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/auth/login' element={<Login />} />
          </Routes>
        )
      }
    </BrowserRouter>
  );
}

export default App;
