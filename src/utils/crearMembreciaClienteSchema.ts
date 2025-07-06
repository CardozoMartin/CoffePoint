import Joi from "joi";

const crearMembresiaClienteSchema = Joi.object({
  clienteId: Joi.string().required().messages({
    "string.empty": "El ID del cliente es obligatorio",
    "any.required": "El ID del cliente es obligatorio",
  }),
  membresiaId: Joi.string().required().messages({
    "string.empty": "El ID de la membresía es obligatorio",
    "any.required": "El ID de la membresía es obligatorio",
  }),
  fechaInicio: Joi.date().required().messages({
    "date.base": "La fecha de inicio debe ser una fecha válida",
    "any.required": "La fecha de inicio es obligatoria",
  }),
});

export default crearMembresiaClienteSchema;
