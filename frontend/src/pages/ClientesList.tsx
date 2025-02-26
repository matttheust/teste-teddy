import React, { useEffect, useState } from 'react';
import { getClientes } from '../services/clienteService';
import { Cliente } from '../services/clienteService';

const ClientesList: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        console.log('Carregando clientes...');
        const data = await getClientes();
        console.log('Clientes carregados:', data);
        setClientes(data);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      }
    };
    fetchClientes();
  }, []);

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Salário</th>
            <th>Valor da Empresa</th>
          </tr>
        </thead>
        <tbody>
        {clientes.map((cliente) => {
  const salario = typeof cliente.salario === 'number' ? cliente.salario : parseFloat(cliente.salario);
  const valorEmpresa = typeof cliente.valorEmpresa === 'number' ? cliente.valorEmpresa : parseFloat(cliente.valorEmpresa);

  return (
    <tr key={cliente.id}>
      <td>{cliente.id}</td>
      <td>{cliente.nome}</td>
      <td>R$ {salario.toFixed(2)}</td>
      <td>R$ {valorEmpresa.toFixed(2)}</td>
    </tr>
  );
})}
        </tbody>
      </table>
    </div>
  );
};

export default ClientesList;