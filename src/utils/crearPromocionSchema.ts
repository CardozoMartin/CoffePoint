import Joi from "joi";

// Esquema para validar una promoción
const crearPromocionSchema = Joi.object({
  titulo: Joi.string().min(3).max(50).required().messages({
    "string.empty": "El título es obligatorio.",
    "string.min": "El título debe tener al menos 3 caracteres.",
    "string.max": "El título no debe exceder los 50 caracteres.",
    "any.required": "El título es obligatorio.",
  }),

  descripcion: Joi.string().min(10).max(200).required().messages({
    "string.empty": "La descripción es obligatoria.",
    "string.min": "La descripción debe tener al menos 10 caracteres.",
    "string.max": "La descripción no debe exceder los 200 caracteres.",
    "any.required": "La descripción es obligatoria.",
  }),

  precio: Joi.number().positive().required().messages({
    "number.base": "El precio debe ser un número.",
    "number.positive": "El precio debe ser mayor a 0.",
    "any.required": "El precio es obligatorio.",
  }),

  fechaInicio: Joi.date().required().messages({
    "date.base": "La fecha de inicio debe ser una fecha válida.",
    "any.required": "La fecha de inicio es obligatoria.",
  }),

  fechaFin: Joi.date().greater(Joi.ref("fechaInicio")).required().messages({
    "date.base": "La fecha de fin debe ser una fecha válida.",
    "date.greater": "La fecha de fin debe ser posterior a la fecha de inicio.",
    "any.required": "La fecha de fin es obligatoria.",
  }),

  imagenUrl: Joi.string().uri().optional().messages({
    "string.uri": "La imagen debe ser una URL válida.",
  }),
});

export default crearPromocionSchema;
