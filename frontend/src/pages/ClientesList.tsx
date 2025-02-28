import React, { useEffect, useState } from 'react';
import { getClientes, updateCliente } from '../services/clienteService'; // Adiciona o updateCliente
import { Cliente } from '../services/clienteService';
import Header from '../components/Header/Header';
import SectionHeader from '../components/SectionHeader/SectionHeader';
import Dropdown from '../components/Dropdown/Dropdown';
import ClienteCard from '../components/ClientCard/ClientCard';
import Pagination from '../components/Pagination/Pagination';
import Button from '../components/Button/Button';
import { useClienteContext } from '../components/Context/ClienteContext';
import CreateClienteModal from '../components/CreateClienteModal/CreateClienteModal';
import EditClienteModal from '../components/EditClienteModal/EditClienteModal'; // Modal para editar
import styles from './ClientesList.module.css';

const ClientesList: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clientesPorPagina, setClientesPorPagina] = useState(16);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado para controlar o modal de edição
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null); // Cliente sendo editado
  const { clientesSelecionados, setClientesSelecionados } = useClienteContext();

  // Função para buscar os clientes
  const fetchClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
    }
  };

  useEffect(() => {
    fetchClientes(); // Carrega os clientes ao montar o componente
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
    setIsEditModalOpen(true); // Abre o modal de edição
  };

  const handleClienteEdit = async (clienteEditado: Cliente) => {
    try {
      if (clienteEditado.id !== undefined) {
        // Atualiza o cliente no backend
        await updateCliente(clienteEditado.id, clienteEditado);
        
        // Após editar, faça um reload na lista de clientes
        fetchClientes();

        // Fechar o modal após a edição
        setIsEditModalOpen(false);
      } else {
        console.error('Erro: ID do cliente é indefinido');
      }
    } catch (error) {
      console.error('Erro ao editar cliente:', error);
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
                onEdit={() => handleEditCliente(cliente)} // Passa o cliente para editar
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

      {/* Modal de edição de cliente */}
      {clienteEditando && (
        <EditClienteModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)} // Mantém a funcionalidade de fechar, mas sem um botão de cancelar
          cliente={clienteEditando}
          onClienteEdit={handleClienteEdit} // Passa a função para editar
        />
      )}
    </div>
  );
};

export default ClientesList;
