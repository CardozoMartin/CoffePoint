import { Document, model, Schema } from "mongoose";

export interface ICliente extends Document {
  nombre: string;
  apellido: string;
  email: string;
  contrasenia: string;
  telefono: string;
  direccion: string;
  rol: "cliente" | "admin" | "cajero";
  membershipLevel: "bronce" | "gold" | "diamond";
  points: number;
}

export enum Roles {
  ADMIN = "admin",
  CLIENTE = "cliente",
  CAJERO = "cajero",
}

const clienteSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El campo nombre es necesario"],
    },
    apellido: {
      type: String,
      required: [true, "El campo apellido es necesario"],
    },
    email: {
      type: String,
      required: [true, "El campo email es necesario"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Por favor ingrese un email válido",
      ],
    },
    contrasenia: {
      type: String,
      required: [true, "El campo contraseña es necesario"],
    },
    telefono: {
      type: String,
      required: [true, "El campo teléfono es necesario"],
      trim: true,
      match: [
        /^\+?\d{7,15}$/,
        "Por favor ingrese un número de teléfono válido (solo dígitos, con opcional +)",
      ],
    },
    direccion: {
      type: String,
      required: [true, "El campo dirección es necesario"],
    },
    rol: {
      type: String,
      enum: ["cliente", "admin", "cajero"],
      default: "cliente",
    },
    membershipLevel: {
      type: String,
      enum: ["bronce", "gold", "diamond"],
      default: "bronce",
    },
    points: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model<ICliente>("Cliente", clienteSchema);
