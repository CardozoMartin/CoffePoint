import { Request, Response } from "express";

import bycript from "bcryptjs";
import jwt from "jsonwebtoken";
import { ClienteRepository } from "../repositories/cliente.respositories";


export class LoginController {
    private clienteServ: ClienteRepository;
    constructor(clienteServ?: ClienteRepository) {
        this.clienteServ = clienteServ || new ClienteRepository();

    }

    //Metodo para iniciar session
    login = async (req: Request, res:Response): Promise<void> =>{

        try {
            // primeros botenemos la contraseña y email
            const { email, contrasenia } = req.body;

            console.log("Datos de inicio de sesión:", { email, contrasenia });

            //vamos a obtener todos los clientes
            const todosLosClientes = await this.clienteServ.mostrarTodosLosUsuarios();
            
            //vamos a buscar el cliente que tenga el email
            const clienteEncontrado = todosLosClientes.find(cliente => cliente.email === email);
            console.log("Cliente encontrado:", clienteEncontrado);
            //si no existe el cliente
            if (!clienteEncontrado) {
                res.status(404).json({
                    message: "Cliente no encontrado"
                });
                return;
            }

            //verificamos que la cuenta este verificada para iniciar session
            if (!clienteEncontrado.estaVerificado) {
                res.status(403).json({
                    message: "Cuenta no verificada"
                });
                return;
            }

            //verificar la contraseña del cliente encontrado con la que viene
            const contraseniaValida = await bycript.compare(contrasenia, clienteEncontrado.contrasenia);

            if(!contraseniaValida){
                res.status(401).json({
                    message: "Contraseña incorrecta"
                });
                return;
            }

            //si todo sale bien, retornamos el cliente
            const infoCliente = {
                id: clienteEncontrado.id,
                nombre: clienteEncontrado.nombre,
                email: clienteEncontrado.email,
                telefono: clienteEncontrado.telefono,
                direccion: clienteEncontrado.direccion,
                rol: clienteEncontrado.rol,
                estaVerificado: clienteEncontrado.estaVerificado
            }

            //enviamos al front el payload del cliente
            const token = jwt.sign(infoCliente,"1234567890",{
                expiresIn: "1h"
            })

            //enviamos estos datos al front
            res.status(201).json({
                token,
                message:'Inicio de sesión exitoso'
            })
        } catch (error) {
            console.error("Error en login:", error);
            res.status(500).json({
                message: "Error en el inicio de sesión"
            });
        }
    }
}