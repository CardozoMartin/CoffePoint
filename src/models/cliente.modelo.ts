import { Document, model, Schema } from "mongoose";

export interface ICliente extends Document {
    nombre: string
    apellido: string
    email: string
    contrasenia: string
    telefono: string
    direccion: string
    rol : Roles
}

export enum Roles{
    ADMIN = 'admin',
    CLIENTE = 'cliente',
    CAJERO = 'cajero'
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
        require: ["el campo es necesario"],
        unique: true
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
    },
    rol:{
        type:String,
        enum: Object.values(Roles),
        default : Roles.CLIENTE,
        required: [true, 'el rol es necesario']
    }

})

export default model<ICliente>('Cliente', clienteSchema)




