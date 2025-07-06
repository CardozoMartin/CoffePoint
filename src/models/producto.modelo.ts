// src/models/producto.modelo.ts
import { Schema, model, Document } from "mongoose";

export interface IProducto extends Document {
  nombre: string;
  descripcion?: string;
  precio: number;
  imagenUrl?: string;
  categoria: string; // ejemplo: "café", "sándwich", "combo"
  disponible: boolean;
}

const productoSchema = new Schema<IProducto>(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    },
    imagenUrl: {
      type: String,
      trim: true,
    },
    categoria: {
      type: String,
      required: true,
      trim: true,
      enum: ["café", "sándwich", "combo", "otro"], // podés ajustar según tu catálogo
    },
    disponible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IProducto>("Producto", productoSchema);
