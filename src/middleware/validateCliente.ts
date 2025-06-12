import {Request, Response, NextFunction} from 'express'
export const validarCliente = (req:Request, res:Response, next:NextFunction) => {
    const {nombre,apellido,telefono,correo,contrasenia} = req.body;
    if(!nombre || !apellido || !telefono || !correo || !contrasenia){
        return res.status(400).json({message:'Todos los campos son requeridos'})
    }
    next();
}