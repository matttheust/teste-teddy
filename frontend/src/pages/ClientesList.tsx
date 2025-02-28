import React, { useEffect, useState } from 'react';
import { getClientes, updateCliente, deleteCliente } from '../services/clienteService'; // Adicione deleteCliente
import { Cliente } from '../services/clienteService';
import Header from '../components/Header/Header';
import SectionHeader from '../components/SectionHeader/SectionHeader';
import Dropdown from '../components/Dropdown/Dropdown';
import ClienteCard from '../components/ClientCard/ClientCard';
import Pagination from '../components/Pagination/Pagination';
import Button from '../components/Button/Button';
import { useClienteContext } from '../components/Context/ClienteContext';
import CreateClienteModal from '../components/CreateClienteModal/CreateClienteModal';
import EditClienteModal from '../components/EditClienteModal/EditClienteModal';
import DeleteClienteModal from '../components/DeleteClienteModal/DeleteClienteModal'; // Importe o modal de exclusão
import styles from './ClientesList.module.css';

const ClientesList: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clientesPorPagina, setClientesPorPagina] = useState(16);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Novo estado para controlar o modal de exclusão
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  const [clienteDeletando, setClienteDeletando] = useState<Cliente | null>(null); // Cliente que está sendo deletado
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
    setClientes((prevClientes) => [...prevClientes, novoCliente]);
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

  const handleEditCliente = (cliente: Cliente) => {
    setClienteEditando(cliente);
    setIsEditModalOpen(true);
  };

  const handleClienteEdit = async (clienteEditado: Cliente) => {
    try {
      if (clienteEditado.id !== undefined) {
        const updatedCliente = await updateCliente(clienteEditado.id, clienteEditado);

        setClientes((prevClientes) => {
          const index = prevClientes.findIndex(cliente => cliente.id === updatedCliente.id);
          if (index !== -1) {
            const newClientes = [...prevClientes];
            newClientes[index] = updatedCliente;
            return newClientes;
          }
          return prevClientes;
        });

        setIsEditModalOpen(false);
      } else {
        console.error('Erro: ID do cliente é indefinido');
      }
    } catch (error) {
      console.error('Erro ao editar cliente:', error);
    }
  };

  const handleDeleteCliente = async (cliente: Cliente) => {
    try {
      if (cliente.id !== undefined) {
        await deleteCliente(cliente.id); // Função para deletar o cliente no backend

        setClientes((prevClientes) => {
          return prevClientes.filter((c) => c.id !== cliente.id); // Remove o cliente da lista local
        });

        setIsDeleteModalOpen(false); // Fecha o modal de confirmação
      } else {
        console.error('Erro: ID do cliente é indefinido');
      }
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
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
                onEdit={() => handleEditCliente(cliente)}
                onDelete={() => {
                  setClienteDeletando(cliente);
                  setIsDeleteModalOpen(true);
                }}
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

      {/* Modal de edição de cliente */}
      {clienteEditando && (
        <EditClienteModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          cliente={clienteEditando}
          onClienteEdit={handleClienteEdit}
        />
      )}

      {/* Modal de exclusão de cliente */}
      {clienteDeletando && (
        <DeleteClienteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={() => handleDeleteCliente(clienteDeletando)}
          clienteNome={clienteDeletando.nome}
        />
      )}
    </div>
  );
};

export default ClientesList;
