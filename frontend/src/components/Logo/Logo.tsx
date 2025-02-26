import React from 'react';
import logo from '../../assets/logo.svg'; // Ajuste o caminho conforme necessário
import './Logo.css';

const Logo: React.FC = () => {
  return (
    <div className="logo">
      <img src={logo} alt="Logo teddy CRM Finance" />
    </div>
  );
};

export default Logo;