import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
export declare class ClienteService {
    private clienteRepository;
    constructor(clienteRepository: Repository<Cliente>);
    create(cliente: Cliente): Promise<Cliente>;
    findAll(): Promise<Cliente[]>;
    findOne(id: number): Promise<Cliente>;
    update(id: number, cliente: Cliente): Promise<void>;
    remove(id: number): Promise<void>;
}
