import React, { useState, useEffect } from 'react';
import "./App.css";
import Main from "./pages/main/Main";
import Header from './components/Header';
import Greeting from './components/Greeting';
import FooterNav from './components/FooterNav';
import './App.css';
import chatIcon from './assets/2.png';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePage, setActivePage] = useState('home'); // Track active page

  return (
    <div className="main-container">
      <div className="min-vh-100">
        <Main />
      </div>
    </div>
  );
};

export default App;
