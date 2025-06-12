import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const { JWT_SECRET_KEY } = process.env;

// Hacemos que sea de manera global
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    const { headers } = req;
    const authHeader = headers.authorization; // "Bearer XXXXXX" || undefined

    // verificamos si la clave existe
    if (!JWT_SECRET_KEY) {
        res.status(500).json({
            data: null,
            message: 'Error de configuración del servidor',
        });
        return;
    }

    // verificamos si el toquen esta presente
    if (!authHeader) {
        res.status(401).json({
            data: null,
            message: 'El header "Authorization" no está presente en la petición',
        });
        return;
    }

    // verificamos que el formato del toke sea correcto
    if (!authHeader.startsWith('Bearer ')) {
        res.status(401).json({
            data: null,
            message: 'Formato de Authorization header inválido. Use: Bearer <token>',
        });
        return;
    }

    const token = authHeader.split(' ')[1];

    // verificamos que el token exista
    if (!token) {
        res.status(401).json({
            data: null,
            message: 'Token no proporcionado',
        });
        return;
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET_KEY) as any;
        req.user = payload.user || payload; // estructura del payloadn que enviamos
        next();
    } catch (error) {
        let message = 'Token inválido o expirado';

        if (error instanceof jwt.TokenExpiredError) {
            message = 'Token expirado';
        } else if (error instanceof jwt.JsonWebTokenError) {
            message = 'Token inválido';
        }

        res.status(401).json({
            data: null,
            message,
        });
        return;
    }
};


export default isAuthenticated;