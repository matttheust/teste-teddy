import React from 'react';
import Logo from '../Logo/Logo';
import Navbar from '../Navbar/Navbar';
import UserGreeting from '../UserGreeting/UserGreeting';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-left">
        <Logo />
      </div>
      <div className="header-center">
        <Navbar />
      </div>
      <div className="header-right">
        <UserGreeting />
      </div>
    </header>
  );
};

export default Header;