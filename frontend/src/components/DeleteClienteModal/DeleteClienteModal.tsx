// DeleteClienteModal.tsx
import React from 'react';
import Button from '../Button/Button'; // Componente Button que você já tem
import styles from './DeleteClienteModal.module.css';

interface DeleteClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  clienteNome: string;
}

const DeleteClienteModal: React.FC<DeleteClienteModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  clienteNome
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* Fechar modal com "X" */}
        <button className={styles.closeButton} onClick={onClose}>X</button>
        <h2 className={styles.modalTitle}>Excluir Cliente</h2>
        <p className={styles.modalText}>Você está prestes a excluir o cliente: <strong>{clienteNome}</strong></p>
        
        {/* Botão de exclusão */}
        <Button onClick={onDelete}>
          Excluir Cliente
        </Button>
      </div>
    </div>
  );
};

export default DeleteClienteModal;
