import Cliente, {ICliente} from '../models/cliente.modelo'


export interface IClienteRepository{
    mostrarTodosLosUsuarios(): Promise<ICliente[]>
    mostrarClientePorID(id:string): Promise<ICliente | null>
    crearCliente(clienteData: Partial<ICliente>): Promise<ICliente>
    actualizarCliente(id:string, clienteData:Partial<ICliente>): Promise<ICliente | null>
    eliminarCliente(id: string) : Promise<boolean>
}

export class ClienteRepository implements IClienteRepository{
   async mostrarTodosLosUsuarios(): Promise<ICliente[]> {
        try {
            return await Cliente.find()
        } catch (error) {
            return []
        }
    }
    async mostrarClientePorID(id: string):   Promise<ICliente | null> {
        try {
            return await Cliente.findById(id)
        } catch (error) {
            console.log(error)
            return null
        }
    }
    async crearCliente(clienteData: Partial<ICliente>): Promise<ICliente> {
        try {
           
            const nuevoCliente = new Cliente(clienteData)
            const guardarCliente = await nuevoCliente.save()
            return guardarCliente
        } catch (error) {
            throw error
        }
    }
    async actualizarCliente(id: string, clienteData: Partial<ICliente>): Promise<ICliente | null> {
        try {
            return await Cliente.findByIdAndUpdate(id,clienteData,{new:true})
        } catch (error) {
            return null
        }
    }
    async eliminarCliente(id: string): Promise<boolean> {
        try {
            const resultado = Cliente.findByIdAndDelete(id)
            return resultado !== null;
        } catch (error) {
            return false
        }
    }
    
}