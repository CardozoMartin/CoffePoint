// src/models/membresia.modelo.ts
import { Schema, model, Document } from "mongoose";

export interface IMembresia extends Document {
  nombre: string;
  precio: number;
  duracionDias: number; // Duración en días
  beneficios: string[];
  estado: "activa" | "inactiva";
}

const membresiaSchema = new Schema<IMembresia>(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    duracionDias: {
      type: Number,
      required: true,
    },
    beneficios: [
      {
        type: String,
        required: true,
      },
    ],
    estado: {
      type: String,
      enum: ["activa", "inactiva"],
      default: "activa",
    },
  },
  {
    timestamps: true,
  }
);

export default model<IMembresia>("Membresia", membresiaSchema);
