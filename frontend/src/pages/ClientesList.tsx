import React, { useEffect, useState } from 'react';
import { getClientes } from '../services/clienteService';
import { Cliente } from '../services/clienteService';
import Header from '../components/Header/Header';
import SectionHeader from '../components/SectionHeader/SectionHeader';
import Dropdown from '../components/Dropdown/Dropdown';
import ClienteCard from '../components/ClientCard/ClientCard';
import Pagination from '../components/Pagination/Pagination';
import Button from '../components/Button/Button';

const ClientesList: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clientesPorPagina, setClientesPorPagina] = useState(16);
  const [paginaAtual, setPaginaAtual] = useState(1);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      }
    };
    fetchClientes();
  }, []);

  const handleAdd = (id: number) => {
    console.log('Adicionar cliente:', id);
  };

  const handleEdit = (id: number) => {
    console.log('Editar cliente:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Excluir cliente:', id);
  };

  const handlePageChange = (page: number) => {
    setPaginaAtual(page);
  };

  return (
    <div>
      <Header />
      <SectionHeader title={`${clientes.length} clientes encontrados`} />
      <Dropdown
        options={[10, 16, 20, 50]}
        selected={clientesPorPagina}
        onChange={setClientesPorPagina}
      />
      <div className="clientes-grid">
        {clientes.map((cliente) => (
          <ClienteCard
            key={cliente.id}
            nome={cliente.nome}
            salario={cliente.salario}
            valorEmpresa={cliente.valorEmpresa}
            onAdd={() => cliente.id !== undefined && handleAdd(cliente.id)}
            onEdit={() => cliente.id !== undefined && handleEdit(cliente.id)}
            onDelete={() => cliente.id !== undefined && handleDelete(cliente.id)}
          />
        ))}
      </div>
      <Pagination
        currentPage={paginaAtual}
        totalPages={Math.ceil(clientes.length / clientesPorPagina)}
        onPageChange={handlePageChange}
      />
      <Button onClick={() => console.log('Criar Cliente')}>Criar Cliente</Button>
    </div>
  );
};

export default ClientesList;