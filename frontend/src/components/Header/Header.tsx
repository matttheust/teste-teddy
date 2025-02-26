import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <button className={styles.menuButton}>
        <span className={styles.menuIcon}></span>
      </button>
      <Logo />
      <nav className={styles.headerCenter}>
        <ul className={styles.navLinks}>
          <li className={styles.active}>
            <Link to="/clientes">Clientes</Link>
          </li>
          <li>
            <Link to="/clientes-selecionados">Clientes selecionados</Link>
          </li>
          <li>Sair</li>
        </ul>
      </nav>
      <div className={styles.headerRight}>
        <span className={styles.userGreeting}>Olá, <strong>Usuário</strong>!</span>
      </div>
    </header>
  );
};

export default Header;