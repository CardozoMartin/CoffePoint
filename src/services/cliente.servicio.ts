import { ICliente } from "../models/cliente.modelo";
import {
  ClienteRepository,
  IClienteRepository,
} from "../repositories/cliente.respositories";
import bcript from "bcryptjs";

//patron DTO los datos que quremos devovler al front del cliente

export interface IClienteSeguro {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  rol: "cliente" | "admin" | "cajero";
}

export class ClienteServicio {
  //variable que maneja la depencia
  private clienteRepo: IClienteRepository;

  constructor(clienteRepo?: IClienteRepository) {
    this.clienteRepo = clienteRepo || new ClienteRepository();
  }
  //metodo para deolver a los lciente segudors de info
  private clienteSeguro(cliente: ICliente): IClienteSeguro {
    return {
      id: cliente.id,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      email: cliente.email,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      rol: cliente.rol,
    };
  }

  //Manejamos toda la logica que usara nuestro servicios

  async obtenerClientes(): Promise<IClienteSeguro[]> {
    //guardar los datos que enviamos en una variable

    const datosClientes = await this.clienteRepo.mostrarTodosLosUsuarios();

    //ahora mapeamos los nuevos datos que vamos a enviar al front

    const clientesDatosNuevos = datosClientes.map((cliente) =>
      this.clienteSeguro(cliente)
    );

    return clientesDatosNuevos;
  }

  async obtenerClientePorId(id: string): Promise<ICliente | null> {
    return await this.clienteRepo.mostrarClientePorID(id);
  }
  async crearNuevoCliente(clienteData: Partial<ICliente>): Promise<ICliente> {
    const { contrasenia } = clienteData;
    if (!contrasenia) {
      throw new Error("La contraseña es requerida");
    }

    //encriptar la contraseña
    const salt = 10;
    const hash = await bcript.hash(contrasenia, salt);
    //guardar la contraseña encriptada
    clienteData.contrasenia = hash;

    return await this.clienteRepo.crearCliente(clienteData);
  }
  async actualizarCliente(
    id: string,
    clienteData: Partial<ICliente>
  ): Promise<ICliente | null> {
    return await this.clienteRepo.actualizarCliente(id, clienteData);
  }
  async eliminarCliente(id: string): Promise<boolean> {
    return await this.clienteRepo.eliminarCliente(id);
  }
}
