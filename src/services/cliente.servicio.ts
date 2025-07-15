import { ICliente } from "../models/cliente.modelo";
import crypto from "crypto";
import {
  ClienteRepository,
  IClienteRepository,
} from "../repositories/cliente.respositories";
import bcript from "bcryptjs";
import { MembresiaServicio } from "./membresia.servicio";
import { MembresiaClienteServicio } from "./membresiaCliente.servicio";
import { EmailService } from "./email.servicio";

//patron DTO los datos que quremos devovler al front del cliente

export interface IClienteSeguro {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  estaVerificado?: boolean;
  rol: "cliente" | "admin" | "cajero";
}

export class ClienteServicio {
  //variable que maneja la depencia
  private clienteRepo: IClienteRepository;
  private membresiaServicio: MembresiaServicio;
  private membresiaClienteServi: MembresiaClienteServicio;
  private emailService;

  constructor(
    clienteRepo?: IClienteRepository,
    membresiaServicio?: MembresiaServicio,
    membresiaClienteServi?: MembresiaClienteServicio
  ) {
    this.clienteRepo = clienteRepo || new ClienteRepository();
    this.membresiaServicio = membresiaServicio || new MembresiaServicio();
    this.membresiaClienteServi = membresiaClienteServi || new MembresiaClienteServicio();
    this.emailService = new EmailService();
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
      estaVerificado: cliente.estaVerificado,
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

    try {


      const { contrasenia } = clienteData;
      if (!contrasenia) {
        throw new Error("La contraseña es requerida");
      }

      //encriptar la contraseña
      const salt = 10;
      const hash = await bcript.hash(contrasenia, salt);
      //guardar la contraseña encriptada
      clienteData.contrasenia = hash;

      // Generar token de verificación
      const verificationToken = crypto.randomBytes(32).toString("hex");
      clienteData.verificationToken = verificationToken;


      // Obtener la membresía básica por nombre (puedes cambiar "basica" por el nombre exacto que tienes)
      const membresiaBasica = await this.membresiaServicio.obtenerMembresiaPorNombre("basica");



      if (!membresiaBasica) {
        // Si no encuentra "basica", buscar la primera membresía disponible

        const todasLasMembresias = await this.membresiaServicio.obtenerMembresias();

        if (todasLasMembresias.length === 0) {
          throw new Error("No hay membresías disponibles en el sistema");
        }

        // Usar la primera membresía encontrada
        const primeraMembresia = todasLasMembresias[0];


        // Crear el cliente
        const nuevoCliente = await this.clienteRepo.crearCliente(clienteData);

        // Asociar la primera membresía disponible
        await this.membresiaClienteServi.asignarMembresiaACliente(
          nuevoCliente.id,
          primeraMembresia.id
        );
        //logica para enviar el email al usuario registrado

        return nuevoCliente;
      }


      // Crear el cliente
      const nuevoCliente = await this.clienteRepo.crearCliente(clienteData);


      // Asociar la membresía básica al cliente recién creado
      await this.membresiaClienteServi.asignarMembresiaACliente(
        nuevoCliente.id,
        membresiaBasica.id
      );

      await this.emailService.enviarEmailDeBienvenida(
        nuevoCliente.email,
        nuevoCliente.nombre,
        nuevoCliente.verificationToken || ""
      );

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

  //servicio para cambiar el verificado de false a true enviado por email
  async verificarCuenta(email: string): Promise<void> {

    console.log("Verificando cuenta para el email:", email);
    try {
      //buscamos el usaurio por el email
      const clienteAVerificar = await this.clienteRepo.mostrarTodosLosUsuarios();
     

      //si encontramos el usuarios lo guardamos en una variable

      const cliente = clienteAVerificar.find((cliente) => cliente.email === email)
      console.log("Cliente encontrado:", cliente);
      // si no se encontro el cliente notificamos
      if (!cliente) {
        throw new Error("Cliente no encontrado");
      }
      //si encontramos al cliente cambiamos el estado

      cliente.estaVerificado = true;
      //actualizamos el cliente en la base de datos
      await this.clienteRepo.actualizarCliente(cliente.id, cliente);
     

    } catch (error) {
      console.error("Error al verificar la cuenta:", error);
      throw new Error("No se pudo verificar la cuenta.");
    }
  }

  //servicio para cambiar el verificado de false a true usando el token
  async verificarCuentaPorToken(token: string): Promise<ICliente | null> {
    const clientes = await this.clienteRepo.mostrarTodosLosUsuarios();
    const cliente = clientes.find((c) => c.verificationToken === token);
    if (!cliente) return null;
    cliente.estaVerificado = true;
    cliente.verificationToken = undefined;
    await this.clienteRepo.actualizarCliente(cliente.id, cliente);
    return cliente;
  }
}
