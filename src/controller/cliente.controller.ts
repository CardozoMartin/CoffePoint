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

}

