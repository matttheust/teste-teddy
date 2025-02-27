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
import CreateClienteModal from '../components/CreateClienteModal/CreateClienteModal'; // Importe o modal
import styles from './ClientesList.module.css';

const ClientesList: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clientesPorPagina, setClientesPorPagina] = useState(16);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal
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

  const handleClienteCreated = (novoCliente: Cliente) => {
    setClientes((prevClientes) => [...prevClientes, novoCliente]); // Atualiza a lista de clientes
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
          {clientes
            .slice((paginaAtual - 1) * clientesPorPagina, paginaAtual * clientesPorPagina)
            .map((cliente) => (
              <ClienteCard
                key={cliente.id}
                nome={cliente.nome}
                salario={cliente.salario}
                valorEmpresa={cliente.valorEmpresa}
                onAdd={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
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
        <Button onClick={() => setIsModalOpen(true)}>Criar Cliente</Button>
      </div>

      {/* Modal de criação de cliente */}
      <CreateClienteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onClienteCreated={handleClienteCreated}
      />
    </div>
  );
};

export default ClientesList;