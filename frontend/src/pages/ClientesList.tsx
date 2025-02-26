import React, { useEffect, useState } from 'react';
import { getClientes } from '../services/clienteService';
import { Cliente } from '../services/clienteService';
import Header from '../components/Header/Header';
import SectionHeader from '../components/SectionHeader/SectionHeader';
import Dropdown from '../components/Dropdown/Dropdown';
import ClienteCard from '../components/ClientCard/ClientCard';
import Pagination from '../components/Pagination/Pagination';
import Button from '../components/Button/Button';
import './ClientesList.css';

const ClientesList: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clientesPorPagina, setClientesPorPagina] = useState(16); // 4 cards por linha x 4 linhas
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

  // Calcula os clientes a serem exibidos na página atual
  const indexOfLastCliente = paginaAtual * clientesPorPagina;
  const indexOfFirstCliente = indexOfLastCliente - clientesPorPagina;
  const currentClientes = clientes.slice(indexOfFirstCliente, indexOfLastCliente);

  return (
    <div className="clientes-container">
      <Header />
      <div className="clientes-content">
        <SectionHeader title={`${clientes.length} clientes encontrados`} />
        <Dropdown
          options={[4, 8, 12, 16]} // Opções para "Clientes por página"
          selected={clientesPorPagina}
          onChange={(value) => {
            setClientesPorPagina(value);
            setPaginaAtual(1); // Volta para a primeira página ao mudar o número de clientes por página
          }}
        />
        <div className="clientes-grid">
          {currentClientes.map((cliente) => (
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
    </div>
  );
};

export default ClientesList;