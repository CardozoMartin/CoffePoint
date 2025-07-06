// src/services/membresiaCliente.servicio.ts
import { Types } from "mongoose";
import { IMembresiaCliente } from "../models/membresiaCliente.modelo";
import {
  IMembresiaClienteRepository,
  MembresiaClienteRepository,
} from "../repositories/membresiaCliente.repositories";
import {
  IMembresiaRepository,
  MembresiaRepository,
} from "../repositories/membresia.repositories";

export interface IMembresiaClienteSeguro {
  id: string;
  clienteId: string;
  membresiaId: string;
  fechaInicio: Date;
  fechaFin: Date;
  estado: "activa" | "vencida" | "cancelada";
}

export class MembresiaClienteServicio {
  private membresiaClienteRepo: IMembresiaClienteRepository;
  private membresiaRepo: IMembresiaRepository;

  constructor(
    membresiaClienteRepo?: IMembresiaClienteRepository,
    membresiaRepo?: IMembresiaRepository
  ) {
    this.membresiaClienteRepo =
      membresiaClienteRepo || new MembresiaClienteRepository();
    this.membresiaRepo = membresiaRepo || new MembresiaRepository();
  }

  private formatearMembresiaCliente(
    m: IMembresiaCliente
  ): IMembresiaClienteSeguro {
    return {
      id: m.id,
      clienteId: m.clienteId.toString(),
      membresiaId: m.membresiaId.toString(),
      fechaInicio: m.fechaInicio,
      fechaFin: m.fechaFin,
      estado: m.estado,
    };
  }

  async asignarMembresiaACliente(
    clienteId: string,
    membresiaId: string
  ): Promise<IMembresiaClienteSeguro> {
    const membresia = await this.membresiaRepo.obtenerMembresiaPorId(
      membresiaId
    );
    if (!membresia) {
      throw new Error("Membresía no encontrada");
    }

    const fechaInicio = new Date();
    const fechaFin = new Date(fechaInicio);
    fechaFin.setDate(fechaInicio.getDate() + membresia.duracionDias);

    const nuevaMembresia =
      await this.membresiaClienteRepo.crearMembresiaCliente({
        clienteId: new Types.ObjectId(clienteId),
        membresiaId: new Types.ObjectId(membresiaId),
        fechaInicio,
        fechaFin,
        estado: "activa",
      });

    return this.formatearMembresiaCliente(nuevaMembresia);
  }

  async obtenerMembresiasDeCliente(
    clienteId: string
  ): Promise<IMembresiaClienteSeguro[]> {
    const membresias = await this.membresiaClienteRepo.obtenerPorCliente(
      clienteId
    );
    return membresias.map(this.formatearMembresiaCliente);
  }

  async cancelarMembresia(id: string): Promise<IMembresiaClienteSeguro | null> {
    const actualizada =
      await this.membresiaClienteRepo.actualizarMembresiaCliente(id, {
        estado: "cancelada",
      });
    return actualizada ? this.formatearMembresiaCliente(actualizada) : null;
  }
}
