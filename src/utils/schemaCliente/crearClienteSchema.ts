import Joi from 'joi';

export const crearClienteSchema = Joi.object({
    nombre: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'El nombre es requerido',
            'string.min': 'El nombre debe tener al menos 2 caracteres',
            'string.max': 'El nombre no puede exceder 50 caracteres',
            'any.required': 'El nombre es obligatorio'
        }),

    apellido: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
            'string.empty': 'El apellido es requerido',
            'string.min': 'El apellido debe tener al menos 2 caracteres',
            'string.max': 'El apellido no puede exceder 50 caracteres',
            'any.required': 'El apellido es obligatorio'
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'El email es requerido',
            'string.email': 'Debe ser un email válido',
            'any.required': 'El email es obligatorio'
        }),

    contrasenia: Joi.string()
        .min(6)
        .max(100)
        .required()
        .messages({
            'string.empty': 'La contraseña es requerida',
            'string.min': 'La contraseña debe tener al menos 6 caracteres',
            'string.max': 'La contraseña no puede exceder 100 caracteres',
            'any.required': 'La contraseña es obligatoria'
        }),

    telefono: Joi.string()
        .pattern(/^[0-9+\-\s]+$/)
        .min(8)
        .max(20)
        .required()
        .messages({
            'string.empty': 'El teléfono es requerido',
            'string.pattern.base': 'El teléfono solo puede contener números, +, - y espacios',
            'string.min': 'El teléfono debe tener al menos 8 caracteres',
            'string.max': 'El teléfono no puede exceder 20 caracteres',
            'any.required': 'El teléfono es obligatorio'
        }),

    direccion: Joi.string()
        .min(5)
        .max(200)
        .required()
        .messages({
            'string.empty': 'La dirección es requerida',
            'string.min': 'La dirección debe tener al menos 5 caracteres',
            'string.max': 'La dirección no puede exceder 200 caracteres',
            'any.required': 'La dirección es obligatoria'
        })
});

// Schema para actualizar un cliente (todos los campos opcionales)
export const actualizarClienteSchema = Joi.object({
    nombre: Joi.string()
        .min(2)
        .max(50)
        .optional()
        .messages({
            'string.empty': 'El nombre no puede estar vacío',
            'string.min': 'El nombre debe tener al menos 2 caracteres',
            'string.max': 'El nombre no puede exceder 50 caracteres'
        }),

    apellido: Joi.string()
        .min(2)
        .max(50)
        .optional()
        .messages({
            'string.empty': 'El apellido no puede estar vacío',
            'string.min': 'El apellido debe tener al menos 2 caracteres',
            'string.max': 'El apellido no puede exceder 50 caracteres'
        }),

    email: Joi.string()
        .email()
        .optional()
        .messages({
            'string.empty': 'El email no puede estar vacío',
            'string.email': 'Debe ser un email válido'
        }),

    contrasenia: Joi.string()
        .min(6)
        .max(100)
        .optional()
        .messages({
            'string.empty': 'La contraseña no puede estar vacía',
            'string.min': 'La contraseña debe tener al menos 6 caracteres',
            'string.max': 'La contraseña no puede exceder 100 caracteres'
        }),

    telefono: Joi.string()
        .pattern(/^[0-9+\-\s]+$/)
        .min(8)
        .max(20)
        .optional()
        .messages({
            'string.empty': 'El teléfono no puede estar vacío',
            'string.pattern.base': 'El teléfono solo puede contener números, +, - y espacios',
            'string.min': 'El teléfono debe tener al menos 8 caracteres',
            'string.max': 'El teléfono no puede exceder 20 caracteres'
        }),

    direccion: Joi.string()
        .min(5)
        .max(200)
        .optional()
        .messages({
            'string.empty': 'La dirección no puede estar vacía',
            'string.min': 'La dirección debe tener al menos 5 caracteres',
            'string.max': 'La dirección no puede exceder 200 caracteres'
        })
}).min(1).messages({
    'object.min': 'Debe proporcionar al menos un campo para actualizar'
});