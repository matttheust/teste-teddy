import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClienteProvider } from './components/Context/ClienteContext';
import ClientesList from './pages/ClientesList';
import ClientesSelecionadosList from './pages/ClientesSelecionadosList';

const App: React.FC = () => {
  return (
    <ClienteProvider>
      <Router>
        <Routes>
          <Route path="/clientes" element={<ClientesList />} />
          <Route path="/clientes-selecionados" element={<ClientesSelecionadosList />} />
        </Routes>
      </Router>
    </ClienteProvider>
  );
};

export default App;