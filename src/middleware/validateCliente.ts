import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { crearClienteSchema, actualizarClienteSchema } from '../utils/schemaCliente/crearClienteSchema';

// Middleware genérico para validar con cualquier schema de Joi
const validarSchema = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error, value } = schema.validate(req.body, { 
            abortEarly: false, // Devuelve todos los errores, no solo el primero
            stripUnknown: true // Elimina campos no definidos en el schema
        });

        if (error) {
            const errores = error.details.map(detail => ({
                campo: detail.path.join('.'),
                mensaje: detail.message
            }));

            res.status(400).json({
                success: false,
                message: 'Errores de validación',
                errores
            });
            return;
        }

        // Asigna los valores validados y limpiados al req.body
        req.body = value;
        next();
    };
};

// Middleware específico para validar la creación de cliente
export const validarCrearCliente = validarSchema(crearClienteSchema);

// Middleware específico para validar la actualización de cliente
export const validarActualizarCliente = validarSchema(actualizarClienteSchema);

// Middleware para validar parámetros ID
export const validarIdCliente = (req: Request, res: Response, next: NextFunction): void => {
    const { id } = req.params;
    
    // Validar que el ID tenga formato de ObjectId de MongoDB (24 caracteres hexadecimales)
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    
    if (!objectIdRegex.test(id)) {
        res.status(400).json({
            success: false,
            message: 'ID de cliente inválido',
            error: 'El ID debe ser un ObjectId válido de MongoDB'
        });
        return;
    }
    
    next();
};

// Middleware adicional para validar que el body no esté vacío
export const validarBodyNoVacio = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json({
            success: false,
            message: 'El cuerpo de la petición no puede estar vacío'
        });
        return;
    }
    
    next();
};