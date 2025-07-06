import Joi from "joi";

const actualizarProductoSchema = Joi.object({
  nombre: Joi.string().min(2).max(100).messages({
    "string.min": "El nombre debe tener al menos 2 caracteres",
    "string.max": "El nombre no puede exceder los 100 caracteres",
  }),
  descripcion: Joi.string().max(500).messages({
    "string.max": "La descripción no puede exceder los 500 caracteres",
  }),
  precio: Joi.number().positive().messages({
    "number.base": "El precio debe ser un número",
    "number.positive": "El precio debe ser un valor positivo",
  }),
  imagenUrl: Joi.string().uri().messages({
    "string.uri": "La URL de la imagen debe ser válida",
  }),
  categoria: Joi.string().valid("café", "sándwich", "combo", "otro").messages({
    "any.only": "La categoría debe ser una de: café, sándwich, combo u otro",
  }),
  disponible: Joi.boolean().messages({
    "boolean.base": "El campo disponible debe ser true o false",
  }),
});

export default actualizarProductoSchema;
