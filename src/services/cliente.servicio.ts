import { ICliente } from "../models/cliente.modelo";
import {
  ClienteRepository,
  IClienteRepository,
} from "../repositories/cliente.respositories";
import bcript from "bcryptjs";
import { MembresiaServicio } from "./membresia.servicio";
import { MembresiaClienteServicio } from "./membresiaCliente.servicio";

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
  private membresiaServicio: MembresiaServicio;
  private membresiaClienteServi: MembresiaClienteServicio;

  constructor(
    clienteRepo?: IClienteRepository, 
    membresiaServicio?: MembresiaServicio,
    membresiaClienteServi?: MembresiaClienteServicio
  ) {
    this.clienteRepo = clienteRepo || new ClienteRepository();
    this.membresiaServicio = membresiaServicio || new MembresiaServicio();
    this.membresiaClienteServi = membresiaClienteServi || new MembresiaClienteServicio();
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
    console.log("Iniciando creación de cliente:", clienteData);
    try {
      console.log("1. Iniciando creación de cliente:", clienteData);
      
      const { contrasenia } = clienteData;
      if (!contrasenia) {
        throw new Error("La contraseña es requerida");
      }

      //encriptar la contraseña
      const salt = 10;
      const hash = await bcript.hash(contrasenia, salt);
      //guardar la contraseña encriptada
      clienteData.contrasenia = hash;
      
      console.log("2. Buscando membresía básica...");
      // Obtener la membresía básica por nombre (puedes cambiar "basica" por el nombre exacto que tienes)
      const membresiaBasica = await this.membresiaServicio.obtenerMembresiaPorNombre("basica");
      
      console.log("3. Membresía encontrada:", membresiaBasica);
      
      if (!membresiaBasica) {
        // Si no encuentra "basica", buscar la primera membresía disponible
        console.log("4. No se encontró 'basica', buscando primera membresía disponible...");
        const todasLasMembresias = await this.membresiaServicio.obtenerMembresias();
        
        if (todasLasMembresias.length === 0) {
          throw new Error("No hay membresías disponibles en el sistema");
        }
        
        // Usar la primera membresía encontrada
        const primeraMembresia = todasLasMembresias[0];
        console.log("5. Usando membresía:", primeraMembresia.nombre);
        
        // Crear el cliente
        const nuevoCliente = await this.clienteRepo.crearCliente(clienteData);
        
        // Asociar la primera membresía disponible
        await this.membresiaClienteServi.asignarMembresiaACliente(
          nuevoCliente.id,
          primeraMembresia.id
        );
        
        return nuevoCliente;
      }

      console.log("6. Creando cliente...");
      // Crear el cliente
      const nuevoCliente = await this.clienteRepo.crearCliente(clienteData);
      
      console.log("7. Asociando membresía al cliente...");
      // Asociar la membresía básica al cliente recién creado
      await this.membresiaClienteServi.asignarMembresiaACliente(
        nuevoCliente.id,
        membresiaBasica.id
      );
      
      console.log("8. Cliente creado y membresía asociada exitosamente");
      return nuevoCliente;
    } catch (error) {
      console.error("Error en crearNuevoCliente:", error);
      throw error;
    }
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

  //servicios para obtener todos los clientes con sus datos y de su membresia
  async obtenerClientesConMembresia(): Promise<IClienteSeguro[]> {
    //obtenemos todos los clientes
    const clientes = await this.clienteRepo.mostrarTodosLosUsuarios();
    //obtenemos las membresias de cada cliente
    const clientesConMembresia = await Promise.all(
      clientes.map(async (cliente) => {
        const membresia = await this.membresiaClienteServi.obtenerMembresiasDeCliente(
          cliente.id
        );
        return { ...cliente, membresia };
      })
    );

    return clientesConMembresia;
  }
}
