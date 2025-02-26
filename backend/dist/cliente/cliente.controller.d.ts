import { ClienteService } from './cliente.service';
import { Cliente } from './entities/cliente.entity';
export declare class ClienteController {
    private readonly clienteService;
    constructor(clienteService: ClienteService);
    create(cliente: Cliente): Promise<Cliente>;
    findAll(): Promise<Cliente[]>;
    findOne(id: string): Promise<Cliente>;
    update(id: string, cliente: Cliente): Promise<void>;
    remove(id: string): Promise<void>;
}
