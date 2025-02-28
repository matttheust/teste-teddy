// pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { useUser } from '../Context/UserContext';

const Login = () => {
  const [inputName, setInputName] = useState('');
  const { setUsername } = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (inputName.trim()) {
      setUsername(inputName.trim());
      navigate('/clientes');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <h1>Olá, seja bem-vindo!</h1>
      <input
        type="text"
        placeholder="Digite o seu nome:"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        style={{
          margin: '20px 0',
          padding: '10px',
          width: '300px',
          fontSize: '16px'
        }}
      />
      <Button onClick={handleLogin}>
        Entrar
      </Button>
    </div>
  );
};

export default Login;