import React from 'react';
import { useNavigate } from 'react-router-dom';
import ClienteCard from '../components/ClientCard/ClientCard';
import { useClienteContext } from '../components/Context/ClienteContext';
import Header from '../components/Header/Header';
import Button from '../components/Button/Button';
import styles from './ClientesSelecionadosList.module.css';

const ClientesSelecionadosList: React.FC = () => {
  const { clientesSelecionados, setClientesSelecionados } = useClienteContext();
  const navigate = useNavigate();

  const handleLimparSelecionados = () => {
    setClientesSelecionados([]);
    navigate('/clientes');
  };

  return (
    <div className={styles.clientesSelecionadosContainer}>
      <Header />
      <div className={styles.clientesContent}>
        <h2>Clientes Selecionados</h2>
        <div className={styles.clientesGrid}>
          {clientesSelecionados.length > 0 ? (
            clientesSelecionados.map((cliente) => (
              <ClienteCard
                key={cliente.id}
                nome={cliente.nome}
                salario={cliente.salario}
                valorEmpresa={cliente.valorEmpresa}
                onAdd={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
                onSelect={() => {}}
                isSelected={true}
              />
            ))
          ) : (
            <p>Nenhum cliente selecionado.</p>
          )}
        </div>
        {/* Container do botão centralizado */}
        <div className={styles.buttonContainer}>
          <Button onClick={handleLimparSelecionados}>Limpar Selecionados</Button>
        </div>
      </div>
    </div>
  );
};

export default ClientesSelecionadosList;