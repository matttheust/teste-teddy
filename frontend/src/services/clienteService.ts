import api from './api';

export interface Cliente {
  id?: number;
  nome: string;
  salario: number;
  valorEmpresa: number;
}

export const getClientes = async (): Promise<Cliente[]> => {
  const response = await api.get('/clientes');
  return response.data.map((cliente: any) => ({
    ...cliente,
    salario: parseFloat(cliente.salario),
    valorEmpresa: parseFloat(cliente.valorEmpresa),
  }));
};

export const createCliente = async (cliente: Cliente) => {
  const response = await api.post('/clientes', cliente);
  return response.data;
};

export const updateCliente = async (id: number, cliente: Cliente) => {
  const response = await api.put(`/clientes/${id}`, cliente);
  return response.data;
};

export const deleteCliente = async (id: number) => {
  const response = await api.delete(`/clientes/${id}`);
  return response.data;
};