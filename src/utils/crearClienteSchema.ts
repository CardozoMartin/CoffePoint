import Joi from 'joi'


 const crearClienteSchema = Joi.object({
    nombre: Joi.string().min(3).max(20).required().messages({
        'string.empty': " El nombre es requerido o no puede estar vacio",
        'string.min': "El campo necesita mas de 3 letras",
        'string.max': 'El campo no puede tener mas de 20 letras',
        'any.required': 'El campo nombre es requerido'

    }),
    apellido: Joi.string().min(3).max(20).required().messages({
        'string.empty': " El apellido es requerido o no puede estar vacio",
        'string.min': "El campo necesita mas de 3 letras",
        'string.max': 'El campo no puede tener mas de 20 letras',
        'any.required': 'El campo nombre es requerido',
    }),
    email: Joi.string().min(3).max(20).required().messages({
        'string.empty': " El email es requerido o no puede estar vacio",
        'string.min': "El campo necesita mas de 3 letras",
        'string.max': 'El campo no puede tener mas de 20 letras',
        'any.required': 'El campo nombre es requerido',
    }),
    contrasenia: Joi.string().min(3).max(20).required().messages({
        'string.empty': " El contraseña es requerido o no puede estar vacio",
        'string.min': "El campo necesita mas de 3 letras",
        'string.max': 'El campo no puede tener mas de 20 letras',
        'any.required': 'El campo nombre es requerido',
    }),
    telefono: Joi.string().min(3).max(20).required().messages({
        'string.empty': " El telefono es requerido o no puede estar vacio",
        'string.min': "El campo necesita mas de 3 letras",
        'string.max': 'El campo no puede tener mas de 20 letras',
        'any.required': 'El campo nombre es requerido',
    }),
    direccion: Joi.string().min(3).max(20).required().messages({
        'string.empty': " El direccion es requerido o no puede estar vacio",
        'string.min': "El campo necesita mas de 3 letras",
        'string.max': 'El campo no puede tener mas de 20 letras',
        'any.required': 'El campo nombre es requerido'
    }),
})

export default crearClienteSchema;