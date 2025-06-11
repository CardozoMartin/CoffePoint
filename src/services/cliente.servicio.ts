import { ICliente } from "../models/cliente.modelo";
import { ClienteRepository, IClienteRepository } from "../repositories/cliente.respositories";


export class ClienteServicio {

    //variable que maneja la depencia
    private clienteRepo : IClienteRepository;

    constructor(clienteRepo?: IClienteRepository){
        this.clienteRepo = clienteRepo || new ClienteRepository();
    }


    //Manejamos toda la logica que usara nuestro servicios

    async obtenerClientes(): Promise<ICliente[]>{
        return await this.clienteRepo.mostrarTodosLosUsuarios()
    }
}