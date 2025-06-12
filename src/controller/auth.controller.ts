import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import Cliente from '../models/cliente.modelo';
import dotenv from 'dotenv'

dotenv.config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export class auth {

    crearSession = async (req: Request, res: Response): Promise<void> => {
        const { email, contrasenia } = req.body;

        try {
            //primero buscamos un cliente por el id
            const buscarClienteEnBD = await Cliente.findOne({ email: email })

            //luego verficamos que el cliente tenga el mismo email y la misma contraseña
            if (!buscarClienteEnBD || !bcrypt.compareSync(contrasenia, buscarClienteEnBD.contrasenia)) {
                res.status(404).json({ message: "Usuario o Contraseña incorrectos", data: null })
                return;
            }

            //si esta todo okey
            //este es el modelo de datos que nosotros mandamos al front
            //con esto podemos obtener la infomacion del usaurio para verficiar su nombre y saber
            //a que cosas puede o no puede acceder en el front
            const datosDelUsuario = {
                cliente: {
                    id: buscarClienteEnBD?._id,
                    nombre: buscarClienteEnBD?.nombre,
                    apellido: buscarClienteEnBD?.apellido,
                    email: buscarClienteEnBD?.email,
                    direccion: buscarClienteEnBD?.direccion,
                    telefono: buscarClienteEnBD?.telefono
                }
            }

            //esta es el toke de accesso aqui enviamos la info y la clave secreta la usamos para crear el toke
            //ponemos que cada 1hora el token se eliminara y debera volvera iniciar session
            const token = jwt.sign(datosDelUsuario, JWT_SECRET_KEY, {
                expiresIn: '1h',
            });
            res.json({
                data: token,
                message: 'Usuario logueado exitosamente',
            });
        } catch (error) {
            res.status(500).json({ message: 'ocurrio un error al iniciar session' })
        }
    }
}