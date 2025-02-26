import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientesList from './pages/ClientesList';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/clientes" element={<ClientesList />} />
      </Routes>
    </Router>
  );
};

export default App;