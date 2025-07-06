import { Document, model, Schema } from "mongoose";

export interface IPromocion extends Document {
  titulo: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
  vigenteDesde: Date;
  vigenteHasta: Date;
  barId: string;
}

const promocionSchema = new Schema(
  {
    titulo: {
      type: String,
      required: [true, "El título es obligatorio"],
    },
    descripcion: {
      type: String,
      required: [true, "La descripción es obligatoria"],
    },
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [0, "El precio no puede ser negativo"],
    },
    imagenUrl: {
      type: String,
      required: [true, "La imagen es obligatoria"],
    },
    vigenteDesde: {
      type: Date,
      required: [true, "La fecha de inicio es obligatoria"],
    },
    vigenteHasta: {
      type: Date,
      required: [true, "La fecha de fin es obligatoria"],
    },
    barId: {
      type: String,
      required: [true, "El id del bar es obligatorio"],
    },
  },
  { timestamps: true }
);

export default model<IPromocion>("Promocion", promocionSchema);
