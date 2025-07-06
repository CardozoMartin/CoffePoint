import Joi from "joi";

const crearSucursalSchema = Joi.object({
  nombre: Joi.string().min(3).max(100).required().messages({
    "string.empty": "El nombre es obligatorio.",
    "string.min": "El nombre debe tener al menos 3 caracteres.",
    "string.max": "El nombre no debe exceder los 100 caracteres.",
    "any.required": "El nombre es obligatorio.",
  }),
  direccion: Joi.string().min(5).max(255).required().messages({
    "string.empty": "La dirección es obligatoria.",
    "string.min": "La dirección debe tener al menos 5 caracteres.",
    "string.max": "La dirección no debe exceder los 255 caracteres.",
    "any.required": "La dirección es obligatoria.",
  }),
  telefono: Joi.string()
    .pattern(/^\+?[0-9\s\-]{7,20}$/)
    .optional()
    .messages({
      "string.pattern.base": "El teléfono no es válido.",
    }),
  email: Joi.string().email().optional().messages({
    "string.email": "El email no es válido.",
  }),
});

export default crearSucursalSchema;
