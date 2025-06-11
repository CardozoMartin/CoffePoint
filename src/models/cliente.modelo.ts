import { Document, model, Schema } from "mongoose";

export interface ICliente extends Document {
    nombre: string
    apellido: string
    email: string
    contrasenia: string
    telefono: string
    direccion: string
}



const clienteSchema = new Schema({
    nombre: {
        type: String,
        require: ["el campo es necesario"]
    },
    apellido: {
        type: String,
        require: ["el campo es necesario"]
    },
    email: {
        type: String,
        require: ["el campo es necesario"]
    },
    contrasenia: {
        type: String,
        require: ["el campo es necesario"]
    },
    telefono: {
        type: String,
        require: ["el campoe es necesario"]
    },
    direccion: {
        type: String,
        require: ["el campo es necesario"]
    }

})

export default model<ICliente>('Cliente', clienteSchema)




