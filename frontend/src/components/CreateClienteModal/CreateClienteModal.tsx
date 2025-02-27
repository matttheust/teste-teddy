import React, { useState, useEffect } from 'react';
import { Cliente, createCliente } from '../../services/clienteService';
import styles from './CreateClienteModal.module.css'; // Estilos do modal
import { FaTimes } from 'react-icons/fa'; // Ícone de "X" para fechar o modal

interface CreateClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClienteCreated: (cliente: Cliente) => void;
}

const CreateClienteModal: React.FC<CreateClienteModalProps> = ({ isOpen, onClose, onClienteCreated }) => {
  const [nome, setNome] = useState('');
  const [salario, setSalario] = useState<number | ''>('');
  const [valorEmpresa, setValorEmpresa] = useState<number | ''>('');

  // Reseta os campos quando o modal é aberto
  useEffect(() => {
    if (isOpen) {
      setNome('');
      setSalario('');
      setValorEmpresa('');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const novoCliente = await createCliente({
        nome,
        salario: salario === '' ? 0 : salario,
        valorEmpresa: valorEmpresa === '' ? 0 : valorEmpresa,
      });
      onClienteCreated(novoCliente); // Notifica que o cliente foi criado
      onClose(); // Fecha o modal
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
        <h2 className={styles.modalTitle}>Criar Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Digite o nome:"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="number"
              placeholder="Digite o salário:"
              value={salario}
              onChange={(e) => setSalario(e.target.value === '' ? '' : parseFloat(e.target.value))}
              required
              className={styles.noArrows} // Remove as setinhas do input number
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="number"
              placeholder="Digite o valor da empresa:"
              value={valorEmpresa}
              onChange={(e) => setValorEmpresa(e.target.value === '' ? '' : parseFloat(e.target.value))}
              required
              className={styles.noArrows} // Remove as setinhas do input number
            />
          </div>
          <div className={styles.modalActions}>
            <button type="submit" className={styles.createButton}>
              Criar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClienteModal;