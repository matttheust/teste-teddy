import React, { useEffect, useState } from 'react';
import { getClientes } from '../services/clienteService';
import { Cliente } from '../services/clienteService';
import Header from '../components/Header/Header';
import SectionHeader from '../components/SectionHeader/SectionHeader';
import Dropdown from '../components/Dropdown/Dropdown';
import ClienteCard from '../components/ClientCard/ClientCard';
import Pagination from '../components/Pagination/Pagination';
import Button from '../components/Button/Button';
import { useClienteContext } from '../components/Context/ClienteContext';
import styles from './ClientesList.module.css'; // Usando módulo CSS

const ClientesList: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clientesPorPagina, setClientesPorPagina] = useState(16);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const { clientesSelecionados, setClientesSelecionados } = useClienteContext();

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

  const handleDelete = (id: number) => {
    console.log(`Delete cliente with id: ${id}`);
  };

  const handleSelectCliente = (cliente: Cliente) => {
    setClientesSelecionados((prevSelecionados: Cliente[]) => {
      const isAlreadySelected = prevSelecionados.some((c) => c.id === cliente.id);
      if (isAlreadySelected) {
        return prevSelecionados.filter((c) => c.id !== cliente.id);
      } else {
        return [...prevSelecionados, cliente];
      }
    });
  };

  const handleAdd = (id: number) => {
    console.log(`Add cliente with id: ${id}`);
  };

  const handleEdit = (id: number) => {
    console.log(`Edit cliente with id: ${id}`);
  };

  const indexOfLastCliente = paginaAtual * clientesPorPagina;
  const indexOfFirstCliente = indexOfLastCliente - clientesPorPagina;
  const currentClientes = clientes.slice(indexOfFirstCliente, indexOfLastCliente);

  return (
    <div className={styles.clientesContainer}>
      <Header />
      <div className={styles.clientesContent}>
        <SectionHeader title={`${clientes.length} clientes encontrados`} />
        <Dropdown
          options={[4, 8, 12, 16]}
          selected={clientesPorPagina}
          onChange={(value) => {
            setClientesPorPagina(value);
            setPaginaAtual(1);
          }}
        />
        <div className={styles.clientesGrid}>
          {currentClientes.map((cliente) => (
            <ClienteCard
              key={cliente.id}
              nome={cliente.nome}
              salario={cliente.salario}
              valorEmpresa={cliente.valorEmpresa}
              onAdd={() => cliente.id !== undefined && handleAdd(cliente.id)}
              onEdit={() => cliente.id !== undefined && handleEdit(cliente.id)}
              onDelete={() => cliente.id !== undefined && handleDelete(cliente.id)}
              onSelect={() => handleSelectCliente(cliente)}
              isSelected={clientesSelecionados.some((c) => c.id === cliente.id)}
            />
          ))}
        </div>
        <Pagination
          currentPage={paginaAtual}
          totalPages={Math.ceil(clientes.length / clientesPorPagina)}
          onPageChange={(page) => setPaginaAtual(page)}
        />
        <Button onClick={() => console.log('Criar Cliente')}>Criar Cliente</Button>
      </div>
    </div>
  );
};

export default ClientesList;