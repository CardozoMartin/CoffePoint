import Membresia, { IMembresia } from "../models/membresia.modelo";

export interface IMembresiaRepository {
  crearMembresia(data: Partial<IMembresia>): Promise<IMembresia>;
  obtenerMembresiaPorId(id: string): Promise<IMembresia | null>;
  obtenerTodasLasMembresia(): Promise<IMembresia[]>;
  actualizarMembresia(
    id: string,
    data: Partial<IMembresia>
  ): Promise<IMembresia | null>;
  eliminarMembresia(id: string): Promise<boolean>;
}

export class MembresiaRepository implements IMembresiaRepository {
  async crearMembresia(data: Partial<IMembresia>): Promise<IMembresia> {
    const nuevaMembresia = new Membresia(data);
    return await nuevaMembresia.save();
  }

  async obtenerMembresiaPorId(id: string): Promise<IMembresia | null> {
    try {
      return await Membresia.findById(id);
    } catch (error) {
      console.error("Error al obtener la membresía por ID:", error);
      return null;
    }
  }

  async obtenerTodasLasMembresia(): Promise<IMembresia[]> {
    try {
      return await Membresia.find();
    } catch (error) {
      console.error("Error al obtener todas las membresías:", error);
      return [];
    }
  }

  async actualizarMembresia(
    id: string,
    data: Partial<IMembresia>
  ): Promise<IMembresia | null> {
    try {
      return await Membresia.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      console.error("Error al actualizar la membresía:", error);
      return null;
    }
  }

  async eliminarMembresia(id: string): Promise<boolean> {
    try {
      const resultado = await Membresia.findByIdAndDelete(id);
      return resultado !== null;
    } catch (error) {
      console.error("Error al eliminar la membresía:", error);
      return false;
    }
  }
}
