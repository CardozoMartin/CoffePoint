// src/repositories/membresiaCliente.repositories.ts
import MembresiaCliente, {
  IMembresiaCliente,
} from "../models/membresiacliente.modelo";

export interface IMembresiaClienteRepository {
  crearMembresiaCliente(
    data: Partial<IMembresiaCliente>
  ): Promise<IMembresiaCliente>;
  obtenerPorId(id: string): Promise<IMembresiaCliente | null>;
  obtenerPorCliente(clienteId: string): Promise<IMembresiaCliente[]>;
  actualizarMembresiaCliente(
    id: string,
    data: Partial<IMembresiaCliente>
  ): Promise<IMembresiaCliente | null>;
  eliminarMembresiaCliente(id: string): Promise<boolean>;
}

export class MembresiaClienteRepository implements IMembresiaClienteRepository {
  async crearMembresiaCliente(
    data: Partial<IMembresiaCliente>
  ): Promise<IMembresiaCliente> {
    const nuevaMembresiaCliente = new MembresiaCliente(data);
    return await nuevaMembresiaCliente.save();
  }

  async obtenerPorId(id: string): Promise<IMembresiaCliente | null> {
    return await MembresiaCliente.findById(id)
      .populate("clienteId")
      .populate("membresiaId");
  }

  async obtenerPorCliente(clienteId: string): Promise<IMembresiaCliente[]> {
    return await MembresiaCliente.find({ clienteId }).populate("membresiaId");
  }

  async actualizarMembresiaCliente(
    id: string,
    data: Partial<IMembresiaCliente>
  ): Promise<IMembresiaCliente | null> {
    return await MembresiaCliente.findByIdAndUpdate(id, data, { new: true });
  }

  async eliminarMembresiaCliente(id: string): Promise<boolean> {
    const resultado = await MembresiaCliente.findByIdAndDelete(id);
    return resultado !== null;
  }
}
