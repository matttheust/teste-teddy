import React from 'react';
import '../ClientCard/ClientCard.css';

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
        <button onClick={onAdd}>+</button>
        <button onClick={onEdit}>✏️</button>
        <button onClick={onDelete}>🗑️</button>
      </div>
    </div>
  );
};

export default ClienteCard;