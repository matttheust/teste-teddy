import React from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import styles from './ClientCard.module.css'; // Usando módulo CSS

interface ClienteCardProps {
  nome: string;
  salario: number;
  valorEmpresa: number;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSelect: () => void;
  isSelected: boolean;
}

const ClienteCard: React.FC<ClienteCardProps> = ({
  nome,
  salario,
  valorEmpresa,
  onAdd,
  onEdit,
  onDelete,
  onSelect,
  isSelected,
}) => {
  return (
    <div
      className={`${styles.clienteCard} ${isSelected ? styles.selected : ''}`}
      onClick={onSelect}
    >
      <h3>{nome}</h3>
      <p>Salário: R$ {salario.toFixed(2)}</p>
      <p>Empresa: R$ {valorEmpresa.toFixed(2)}</p>
      <div className={styles.cardActions}>
        <button onClick={onAdd} className={styles.iconButton}>
          <FaPlus className={styles.icon} />
        </button>
        <button onClick={onEdit} className={styles.iconButton}>
          <FaEdit className={styles.icon} />
        </button>
        <button onClick={onDelete} className={styles.iconButton}>
          <FaTrash className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default ClienteCard;