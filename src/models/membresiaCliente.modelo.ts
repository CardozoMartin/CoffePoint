// src/models/membresiaCliente.modelo.ts
import { Schema, model, Document, Types } from "mongoose";

export interface IMembresiaCliente extends Document {
  clienteId: Types.ObjectId;
  membresiaId: Types.ObjectId;
  fechaInicio: Date;
  fechaFin: Date;
  estado: "activa" | "vencida" | "cancelada";
}

const membresiaClienteSchema = new Schema<IMembresiaCliente>(
  {
    clienteId: {
      type: Schema.Types.ObjectId,
      ref: "Cliente",
      required: true,
    },
    membresiaId: {
      type: Schema.Types.ObjectId,
      ref: "Membresia",
      required: true,
    },
    fechaInicio: {
      type: Date,
      required: true,
    },
    fechaFin: {
      type: Date,
      required: true,
    },
    estado: {
      type: String,
      enum: ["activa", "vencida", "cancelada"],
      default: "activa",
    },
  },
  {
    timestamps: true,
  }
);

export default model<IMembresiaCliente>(
  "MembresiaCliente",
  membresiaClienteSchema
);
