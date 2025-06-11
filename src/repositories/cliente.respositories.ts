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
    mostrarClientePorID(id: string): Promise<ICliente | null> {
        throw new Error('Method not implemented.')
    }
    crearCliente(clienteData: Partial<ICliente>): Promise<ICliente> {
        throw new Error('Method not implemented.')
    }
    actualizarCliente(id: string, clienteData: Partial<ICliente>): Promise<ICliente | null> {
        throw new Error('Method not implemented.')
    }
    eliminarCliente(id: string): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
    
}