// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/Context/UserContext';
import { Outlet } from 'react-router-dom'; 
import { ClienteProvider } from './components/Context/ClienteContext';
import Login from './components/Login/Login';
import ClientesPage from './pages/ClientesList';
import ClientesSelecionadosPage from './pages/ClientesSelecionadosList'; // Crie este componente
import Header from './components/Header/Header';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <ClienteProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            
            {/* Rotas autenticadas (com Header) */}
            <Route element={
              <>
                <Header />
                <Outlet /> {/* Componente do React Router para renderizar sub-rotas */}
              </>
            }>
              <Route path="/clientes" element={<ClientesPage />} />
              <Route path="/clientes-selecionados" element={<ClientesSelecionadosPage />} />
            </Route>
          </Routes>
        </ClienteProvider>
      </UserProvider>
    </Router>
  );
};

export default App;