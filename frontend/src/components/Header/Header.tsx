import React from 'react';
import Logo from '../Logo/Logo';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      {/* Menu Hamburguer */}
      <button className="menu-button">
        <span className="menu-icon"></span>
      </button>

      {/* Logo */}
      <Logo />

      {/* Seção Central – Navegação */}
      <nav className="header-center">
        <ul className="nav-links">
          <li className="active">Clientes</li>
          <li>Clientes selecionados</li>
          <li>Sair</li>
        </ul>
      </nav>

      {/* Seção Direita – Saudação do Usuário */}
      <div className="header-right">
        <span className="user-greeting">Olá, <strong>Usuário</strong>!</span>
      </div>
    </header>
  );
};

export default Header;