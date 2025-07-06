import { Document, Schema, model } from "mongoose";

export interface ICanjePromocion extends Document {
  clienteId: string;
  promocionId: string;
  qrToken: string;
  estado: "activo" | "usado";
  fechaGeneracion: Date;
  fechaCanje?: Date | null;
}

const canjePromocionSchema = new Schema(
  {
    clienteId: {
      type: Schema.Types.ObjectId,
      ref: "Cliente",
      required: true,
    },
    promocionId: {
      type: Schema.Types.ObjectId,
      ref: "Promocion",
      required: true,
    },
    qrToken: {
      type: String,
      required: true,
      unique: true,
    },
    estado: {
      type: String,
      enum: ["activo", "usado"],
      default: "activo",
    },
    fechaGeneracion: {
      type: Date,
      default: Date.now,
    },
    fechaCanje: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default model<ICanjePromocion>("CanjePromocion", canjePromocionSchema);
