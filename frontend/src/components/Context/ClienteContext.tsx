import React, { createContext, useContext, useState } from 'react';
import { Cliente } from '../../services/clienteService';

interface ClienteContextType {
  clientesSelecionados: Cliente[];
  setClientesSelecionados: (clientes: Cliente[] | ((prev: Cliente[]) => Cliente[])) => void;
}

const ClienteContext = createContext<ClienteContextType | undefined>(undefined);

export const useClienteContext = () => {
  const context = useContext(ClienteContext);
  if (!context) {
    throw new Error('useClienteContext must be used within a ClienteProvider');
  }
  return context;
};

export const ClienteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clientesSelecionados, setClientesSelecionados] = useState<Cliente[]>([]);

  return (
    <ClienteContext.Provider value={{ clientesSelecionados, setClientesSelecionados }}>
      {children}
    </ClienteContext.Provider>
  );
};