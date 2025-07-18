// src/models/membresia.modelo.ts
import { Schema, model, Document } from "mongoose";

export interface IMembresia extends Document {
  nombre: string;
  precio: number;
  duracionDias: number; 
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
      default: 0
    },
    duracionDias: {
      type: Number,
      required: true,
      default: 0, // Duración por defecto de 30 días
    },
    beneficios: [
      {
        type: String,
        required: true,
        default: "Acceso a la tienda",
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
