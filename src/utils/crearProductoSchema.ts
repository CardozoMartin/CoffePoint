import Joi from "joi";

const crearProductoSchema = Joi.object({
  nombre: Joi.string().min(2).max(100).required().messages({
    "string.empty": "El nombre del producto es obligatorio",
    "string.min": "El nombre debe tener al menos 2 caracteres",
    "string.max": "El nombre no puede exceder los 100 caracteres",
  }),
  descripcion: Joi.string().max(500).optional().messages({
    "string.max": "La descripción no puede exceder los 500 caracteres",
  }),
  precio: Joi.number().positive().required().messages({
    "number.base": "El precio debe ser un número",
    "number.positive": "El precio debe ser un valor positivo",
    "any.required": "El precio es obligatorio",
  }),
  imagenUrl: Joi.string().uri().optional().messages({
    "string.uri": "La URL de la imagen debe ser válida",
  }),
  categoria: Joi.string()
    .valid("café", "sándwich", "combo", "otro")
    .required()
    .messages({
      "any.only": "La categoría debe ser una de: café, sándwich, combo u otro",
      "any.required": "La categoría es obligatoria",
    }),
  disponible: Joi.boolean().optional().messages({
    "boolean.base": "El campo disponible debe ser true o false",
  }),
});

export default crearProductoSchema;
