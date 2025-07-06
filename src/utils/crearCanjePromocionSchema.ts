// utils/crearPromocionSchema.ts
import Joi from "joi";

const crearPromocionSchema = Joi.object({
  titulo: Joi.string().min(3).max(50).required().messages({
    "string.empty": "El título es obligatorio",
    "string.min": "El título debe tener al menos 3 caracteres",
    "string.max": "El título no puede tener más de 50 caracteres",
  }),
  descripcion: Joi.string().min(10).max(200).required().messages({
    "string.empty": "La descripción es obligatoria",
    "string.min": "La descripción debe tener al menos 10 caracteres",
    "string.max": "La descripción no puede tener más de 200 caracteres",
  }),
  precio: Joi.number().positive().required().messages({
    "number.base": "El precio debe ser un número",
    "number.positive": "El precio debe ser positivo",
    "any.required": "El precio es obligatorio",
  }),
  fechaInicio: Joi.date().required().messages({
    "date.base": "La fecha de inicio debe ser una fecha válida",
    "any.required": "La fecha de inicio es obligatoria",
  }),
  fechaFin: Joi.date().greater(Joi.ref("fechaInicio")).required().messages({
    "date.base": "La fecha fin debe ser una fecha válida",
    "date.greater": "La fecha fin debe ser posterior a la fecha inicio",
    "any.required": "La fecha fin es obligatoria",
  }),
  imagenUrl: Joi.string().uri().optional().messages({
    "string.uri": "La imagen debe ser una URL válida",
  }),
});

export default crearPromocionSchema;
