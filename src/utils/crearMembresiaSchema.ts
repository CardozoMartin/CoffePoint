// src/utils/crearMembresiaSchema.ts
import Joi from "joi";

const crearMembresiaSchema = Joi.object({
  nombre: Joi.string().min(3).max(50).required().messages({
    "string.empty": "El nombre es obligatorio",
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "string.max": "El nombre no puede tener más de 50 caracteres",
  }),
  precio: Joi.number().positive().required().messages({
    "number.base": "El precio debe ser un número",
    "number.positive": "El precio debe ser positivo",
    "any.required": "El precio es obligatorio",
  }),
  duracionDias: Joi.number().integer().positive().required().messages({
    "number.base": "La duración debe ser un número",
    "number.positive": "La duración debe ser mayor a cero",
    "any.required": "La duración es obligatoria",
  }),
  beneficios: Joi.array().items(Joi.string().min(3)).required().messages({
    "array.base": "Los beneficios deben ser una lista de texto",
    "string.min": "Cada beneficio debe tener al menos 3 caracteres",
  }),
  estado: Joi.string().valid("activa", "inactiva").required().messages({
    "any.only": "El estado debe ser 'activa' o 'inactiva'",
    "any.required": "El estado es obligatorio",
  }),
});

export default crearMembresiaSchema;
