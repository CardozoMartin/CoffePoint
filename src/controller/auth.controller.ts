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
            const buscarClienteEnBD = await Cliente.findOne({ email: email })
            if (!buscarClienteEnBD || !bcrypt.compareSync(contrasenia, buscarClienteEnBD.contrasenia)) {
                res.status(404).json({ message: "Usuario o Contraseña incorrectos", data: null })
                return;
            }

            //si esta todo okey

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