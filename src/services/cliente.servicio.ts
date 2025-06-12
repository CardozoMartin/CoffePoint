import { ICliente } from "../models/cliente.modelo";
import { ClienteRepository, IClienteRepository } from "../repositories/cliente.respositories";
import bycript from "bcryptjs";

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
    async obtenerClientePorId(id:string): Promise<ICliente | null>{
        
        return await this.clienteRepo.mostrarClientePorID(id)
    }
    async crearNuevoCliente(clienteData: Partial<ICliente>): Promise<ICliente>{
            const{ contrasenia} = clienteData
            if(!contrasenia){
                throw new Error('La contraseña es requerida')
            }
            //encriptar la contraseña
            const salt = 10
            const hash = await bycript.hash(contrasenia,salt)
            //guardar la contraseña encriptada
            clienteData.contrasenia = hash

        return await this.clienteRepo.crearCliente(clienteData)
    }
    async actualizarCliente(id:string, clienteData: Partial<ICliente>): Promise<ICliente | null>{
        return await this.clienteRepo.actualizarCliente(id,clienteData)    
    }
    async eliminarCliente(id:string): Promise<boolean>{
        return await this.clienteRepo.eliminarCliente(id)
    }

}