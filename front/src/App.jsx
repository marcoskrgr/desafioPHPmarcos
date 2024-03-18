import { useState } from 'react';
import './index.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
