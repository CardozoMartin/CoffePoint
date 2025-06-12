import { Request, Response } from "express"
import { ClienteServicio } from "../services/cliente.servicio"



export class ClienteController {


    //variable la de servicio
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
            
           
        try {
            const nuevoCliente = await this.clienteServ.crearNuevoCliente(req.body)

            res.status(201).json({
                message:"Cliente creado",
                nuevoCliente
            })
        } catch (error) {
            
           
            res.status(500).json({
                message:"Error al crear el cliente"
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
}

