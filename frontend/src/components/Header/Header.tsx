// components/Header.tsx (atualizado)
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo/Logo';
import styles from './Header.module.css';
import { useUser } from '../Context/UserContext';

const Header: React.FC = () => {
  const { username, setUsername } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsername(''); // Limpa o nome do usuário
    navigate('/'); // Redireciona para a tela de login
  };

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
          <li 
            onClick={handleLogout}
            style={{ cursor: 'pointer' }}
          >
            Sair
          </li>
        </ul>
      </nav>
      <div className={styles.headerRight}>
        <span className={styles.userGreeting}>Olá, <strong>{username}</strong>!</span>
      </div>
    </header>
  );
};

export default Header;