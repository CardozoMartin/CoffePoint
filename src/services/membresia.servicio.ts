import { IMembresia } from "../models/membresia.modelo";
import {
  IMembresiaRepository,
  MembresiaRepository,
} from "../repositories/membresia.repositories";

export interface IMembresiaSeguro {
  id: string;
  nombre: string;
  precio: number;
  duracionDias: number;
  beneficios: string[];
  estado: "activa" | "inactiva";
}

export class MembresiaServicio {
  private membresiaRepo: IMembresiaRepository;

  constructor(membresiaRepo?: IMembresiaRepository) {
    this.membresiaRepo = membresiaRepo || new MembresiaRepository();
  }

  private membresiaSeguro(membresia: IMembresia): IMembresiaSeguro {
    return {
      id: membresia.id,
      nombre: membresia.nombre,
      precio: membresia.precio,
      duracionDias: membresia.duracionDias,
      beneficios: membresia.beneficios,
      estado: membresia.estado,
    };
  }

  async obtenerMembresias(): Promise<IMembresiaSeguro[]> {
    const membresias = await this.membresiaRepo.obtenerTodasLasMembresia();
    return membresias.map((m) => this.membresiaSeguro(m));
  }

  async obtenerMembresiaPorId(id: string): Promise<IMembresiaSeguro | null> {
    const membresia = await this.membresiaRepo.obtenerMembresiaPorId(id);
    if (!membresia) return null;
    return this.membresiaSeguro(membresia);
  }

  async crearMembresia(data: Partial<IMembresia>): Promise<IMembresiaSeguro> {
    const nuevaMembresia = await this.membresiaRepo.crearMembresia(data);
    return this.membresiaSeguro(nuevaMembresia);
  }

  async actualizarMembresia(
    id: string,
    data: Partial<IMembresia>
  ): Promise<IMembresiaSeguro | null> {
    const membresiaActualizada = await this.membresiaRepo.actualizarMembresia(
      id,
      data
    );
    if (!membresiaActualizada) return null;
    return this.membresiaSeguro(membresiaActualizada);
  }

  async eliminarMembresia(id: string): Promise<boolean> {
    return await this.membresiaRepo.eliminarMembresia(id);
  }
}
