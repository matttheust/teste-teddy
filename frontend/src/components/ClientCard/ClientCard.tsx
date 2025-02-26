import React from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'; // Ícones modernos
import './ClientCard.css';

interface ClienteCardProps {
  nome: string;
  salario: number;
  valorEmpresa: number;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ClienteCard: React.FC<ClienteCardProps> = ({ nome, salario, valorEmpresa, onAdd, onEdit, onDelete }) => {
  return (
    <div className="cliente-card">
      <h3>{nome}</h3>
      <p>Salário: R$ {salario.toFixed(2)}</p>
      <p>Empresa: R$ {valorEmpresa.toFixed(2)}</p>
      <div className="card-actions">
        <button onClick={onAdd} className="icon-button left">
          <FaPlus className="icon" />
        </button>
        <button onClick={onEdit} className="icon-button center">
          <FaEdit className="icon" />
        </button>
        <button onClick={onDelete} className="icon-button right">
          <FaTrash className="icon" />
        </button>
      </div>
    </div>
  );
};

export default ClienteCard;