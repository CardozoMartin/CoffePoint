import { Document, model, Schema } from "mongoose";

export interface ICliente extends Document {
    nombre: string;
    apellido: string;
    email: string;
    contrasenia: string;
    telefono: string;
    direccion: string;
}

const clienteSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es necesario"] 
    },
    apellido: {
        type: String,
        required: [true, "El apellido es necesario"] 
    },
    email: {
        type: String,
        required: [true, "El email es necesario"], 
        unique: true,
        lowercase: true, 
        trim: true 
    },
    contrasenia: {
        type: String,
        required: [true, "La contraseña es necesaria"] 
    },
    telefono: {
        type: String,
        required: [true, "El teléfono es necesario"] 
    },
    direccion: {
        type: String,
        required: [true, "La dirección es necesaria"] 
    }
}, {
    timestamps: true, 
    versionKey: false 
});

export default model<ICliente>('Cliente', clienteSchema);