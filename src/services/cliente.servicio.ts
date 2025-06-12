import { ICliente } from "../models/cliente.modelo";
import { ClienteRepository, IClienteRepository } from "../repositories/cliente.respositories";
import bycript from "bcryptjs";

//creamos una interfaz para asegurar los datos del cliente
export interface IClienteSeguro {
    id: string;
    nombre: string;
    apellido: string;
    telefono: string;
    direccion: string;
    email: string;
}
export class ClienteServicio {

    //variable que maneja la depencia
    private clienteRepo: IClienteRepository;

    constructor(clienteRepo?: IClienteRepository) {
        this.clienteRepo = clienteRepo || new ClienteRepository();
    }
    // Método auxiliar para limpiar datos sensibles
    private limpiarDatosSensibles(cliente: ICliente): IClienteSeguro {
        return {
            id: cliente._id,
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            telefono: cliente.telefono,
            direccion: cliente.direccion,
            email: cliente.email
        };
    }

    //Manejamos toda la logica que usara nuestro servicios

    async obtenerClientes(): Promise<ICliente[]> {
        //guardamos los datos del cliente en la variable
        const datosClientes = await this.clienteRepo.mostrarTodosLosUsuarios()
        //ahora agregamos una capa de seguridad para decir que datos vamos a devolver al fornt
        //para ocultar datos sensibles
        //ahora filtramos y devolvemos los datos sin la contraseña
        const nuevosDatos = datosClientes.map((cliente) => this.limpiarDatosSensibles(cliente));
        //devolvemos los datos del nuevo filtro sin la contraseña
        return nuevosDatos
    }
    async obtenerClientePorId(id: string): Promise<ICliente | null> {
        const datosClientesID = await this.clienteRepo.mostrarClientePorID(id);

        //ahora filtramos los datos para devolver sin la contraseña
        const nuevosDatos = this.limpiarDatosSensibles(datosClientesID)

        return nuevosDatos;
    }



    async crearNuevoCliente(clienteData: Partial<ICliente>): Promise<ICliente> {
        const { contrasenia } = clienteData
        if (!contrasenia) {
            throw new Error('La contraseña es requerida')
        }
        //encriptar la contraseña
        const salt = 10
        const hash = await bycript.hash(contrasenia, salt)
        //guardar la contraseña encriptada
        clienteData.contrasenia = hash

        return await this.clienteRepo.crearCliente(clienteData)
    }



    async actualizarCliente(id: string, clienteData: Partial<ICliente>): Promise<ICliente | null> {
        return await this.clienteRepo.actualizarCliente(id, clienteData)
    }


    
    async eliminarCliente(id: string): Promise<boolean> {
        return await this.clienteRepo.eliminarCliente(id)
    }

}