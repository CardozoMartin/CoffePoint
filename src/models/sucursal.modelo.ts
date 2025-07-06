// src/models/sucursal.modelo.ts
import { Schema, model, Document } from "mongoose";

export interface ISucursal extends Document {
  nombre: string;
  direccion: string;
  telefono: string;
  email?: string;
  activa: boolean;
}

const sucursalSchema = new Schema<ISucursal>(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    activa: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<ISucursal>("Sucursal", sucursalSchema);
