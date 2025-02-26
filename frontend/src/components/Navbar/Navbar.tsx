import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <button className="menu-button">☰</button>
      <ul className="nav-links">
        <li>Clientes</li>
        <li>Clientes selecionados</li>
        <li>Sair</li>
      </ul>
    </nav>
  );
};

export default Navbar;