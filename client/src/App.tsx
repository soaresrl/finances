import React, { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Menu from './components/Menu';

const App: React.FC = (): ReactElement => {
  return (
    <div className='container'>
      <Header />
      <Menu />
      <Outlet />
      <div className='footer'> footer</div>

    </div>
  );
}

export default App;
