import { NextFunction, Request, Response } from "express";
import { Schema } from "joi"; // Faltaba importar Schema

class validacionMiddleware {
    // Genérico para cualquier schema
    static validacionSchema(schema: Schema) {
        return (req: Request, res: Response, next: NextFunction): void => {
            const { error, value } = schema.validate(req.body, {
                abortEarly: false, // Para que retorne todos los errores
                allowUnknown: true, // Para permitir campos desconocidos
                stripUnknown: true // Para eliminar campos desconocidos del objeto validado
            });
            
            // Muestra todos los errores que puedan tener
            if (error) {
                const errores = error.details.map(detalle => ({
                    campo: detalle.path.join('.'),
                    mensaje: detalle.message // Era "mensaje" pero debe ser "message"
                }));
                
                res.status(400).json({
                    error: "Error de validacion",
                    detalles: errores
                });
                return;
                // Este return está de más, ya que hay un return arriba
            }
            
            req.body = value;
            next();
        };
    }
}

export default validacionMiddleware;