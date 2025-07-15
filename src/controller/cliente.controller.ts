import { Request, Response } from "express"
import { ClienteServicio } from "../services/cliente.servicio"

export class ClienteController {

  
    
    private clienteServ : ClienteServicio;

    //constructor que para iniciar
    constructor(clienteServ?: ClienteServicio){
        this.clienteServ = clienteServ || new ClienteServicio();
    }

    //todos los controladores

    obtenerTodosLosClientes = async (req:Request, res:Response): Promise<void> =>{
        try {
            const todosLosClientes = await this.clienteServ.obtenerClientes();
            res.status(200).json({
                message:"Todos lo clientes",
                todosLosClientes
            })
        } catch (error) {
            console.error(error)
        }
    }
    obtenerClientePorID = async (req:Request, res:Response): Promise<void> =>{
        const { id } = req.params
        try {
            const cliente = await this.clienteServ.obtenerClientePorId(id);

            if(!cliente){
                res.status(404).json({
                    message:"Cliente no encontrado"
                })
            }
            res.status(200).json({
                message:"Cliente encontrado",
                cliente
            })
        } catch (error) {
            
        }
        
    }
    cargarNuevoCliente = async (req:Request, res:Response): Promise<void> =>{
            console.log(req.body)
           
        try {
            const nuevoCliente = await this.clienteServ.crearNuevoCliente(req.body)

            res.status(201).json({
                message:"Cliente creado",
                nuevoCliente
            })
        } catch (error) {
            if(error.message.includes('duplicate')){
                res.status(400).json({
                    message: "El email ya está registrado",
                })
            }
            console.error("Error detallado al crear cliente:", error);
           
            res.status(500).json({
                message:"Error al crear el cliente",
                error: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }

    actualizarCliente = async (req:Request, res:Response): Promise<void> =>{
        const { id} = req.params
        const { nombre, apellido, email, telefono } = req.body

        try {
            const clienteActualizado = await this.clienteServ.actualizarCliente(id,req.body)

            if(!clienteActualizado){
                res.status(404).json({
                    message:"Cliente no encontrado"
                })
            }

            res.status(200).json({
                message:"Cliente actualizado",
                clienteActualizado
            })
        } catch (error) {
            res.status(500).json({  
                message:"Error al actualizar el cliente"
            })
        }
    }

    eliminarCliente = async (req:Request, res:Response): Promise<void> =>{
        const { id}  = req.params

        try {
            const clienteEliminar = await this.clienteServ.eliminarCliente(id)

            if(!clienteEliminar){
                res.status(404).json({
                    message:"Cliente no encontrado"
                })
            }

            res.status(200).json({
                message:"Cliente eliminado"
            })
        } catch (error) {
            res.status(500).json({
                message:"Error al eliminar el cliente"
            })
        }
    }

    //controlador para obtener todos los clientes con sus membresias
    obtenerClientesConMembresia = async (req:Request, res:Response): Promise<void> => {
        try {
            const clientesConMembresia = await this.clienteServ.obtenerClientesConMembresia();
            res.status(200).json({
                message: "Clientes con membresía",
                clientesConMembresia
            });
        } catch (error) {
            console.error("Error al obtener clientes con membresía:", error);
            res.status(500).json({
                message: "Error al obtener clientes con membresía",
                error: error instanceof Error ? error.message : "Error desconocido"
            });
        }
    }

    //cambiamos el estado de verificado a true
    cambiarEstado = async (req: Request, res: Response): Promise<void> => {
        // Obtenemos el email del cuerpo de la solicitud
        const { email } = req.params;
        

        try {
            const clienteVerificado = await this.clienteServ.verificarCuenta(email);

            res.status(200).json({
                message: "Cuenta verificada correctamente",
               
            });
        } catch (error) {
            console.error("Error al cambiar el estado de verificación:", error);
            res.status(500).json({
                message: "Error al cambiar el estado de verificación",
                error: error instanceof Error ? error.message : "Error desconocido"
            });
        }
    }

    // Endpoint para verificar cuenta por token con redirección amigable
    verificarCuenta = async (req: Request, res: Response): Promise<void> => {
        const { token } = req.params;
        try {
            const cliente = await this.clienteServ.verificarCuentaPorToken(token);
            if (!cliente) {
                // Redirige a una página de error si el token es inválido
                res.redirect('/login');
                return;
            }
            // Redirige a una página de éxito si la verificación fue correcta
            res.redirect('www.google.com');
        } catch (error) {
            res.redirect('https://tusitio.com/verificacion-error');
        }
    }
    
}

