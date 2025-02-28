import React, { useState, useEffect } from 'react';
import { Cliente } from '../../services/clienteService';
import Button from '../Button/Button';
import styles from './EditClienteModal.module.css';

interface EditClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: Cliente;
  onClienteEdit: (cliente: Cliente) => void;
}

const EditClienteModal: React.FC<EditClienteModalProps> = ({ isOpen, onClose, cliente, onClienteEdit }) => {
  const [nome, setNome] = useState(cliente.nome);
  const [salario, setSalario] = useState(cliente.salario);
  const [valorEmpresa, setValorEmpresa] = useState(cliente.valorEmpresa);

  useEffect(() => {
    if (cliente) {
      setNome(cliente.nome);
      setSalario(cliente.salario);
      setValorEmpresa(cliente.valorEmpresa);
    }
  }, [cliente]);

  const handleSave = () => {
    const clienteEditado = { ...cliente, nome, salario, valorEmpresa };
    onClienteEdit(clienteEditado); // Chama a função para salvar
    onClose(); // Fecha o modal após salvar
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h2 className={styles.modalTitle}>Editar Cliente</h2>
        <div className={styles.formGroup}>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="number"
            value={salario}
            onChange={(e) => setSalario(Number(e.target.value))}
            placeholder="Salário"
            className={styles.noArrows}
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="number"
            value={valorEmpresa}
            onChange={(e) => setValorEmpresa(Number(e.target.value))}
            placeholder="Valor da Empresa"
            className={styles.noArrows}
          />
        </div>
        <div className={styles.modalActions}>
          <Button onClick={handleSave}>Salvar</Button>
        </div>
      </div>
    </div>
  );
};

export default EditClienteModal;
