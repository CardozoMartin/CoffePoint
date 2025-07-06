// src/services/sucursal.servicio.ts
import { ISucursal } from "../models/sucursal.modelo";
import {
  ISucursalRepository,
  SucursalRepository,
} from "../repositories/sucursal.repositories";

export class SucursalServicio {
  private sucursalRepo: ISucursalRepository;

  constructor(sucursalRepo?: ISucursalRepository) {
    this.sucursalRepo = sucursalRepo || new SucursalRepository();
  }

  obtenerSucursales = async (): Promise<ISucursal[]> => {
    return await this.sucursalRepo.obtenerTodasLasSucursales();
  };

  obtenerSucursalPorId = async (id: string): Promise<ISucursal | null> => {
    return await this.sucursalRepo.obtenerSucursalPorId(id);
  };

  crearSucursal = async (data: Partial<ISucursal>): Promise<ISucursal> => {
    return await this.sucursalRepo.crearSucursal(data);
  };

  actualizarSucursal = async (
    id: string,
    data: Partial<ISucursal>
  ): Promise<ISucursal | null> => {
    return await this.sucursalRepo.actualizarSucursal(id, data);
  };

  eliminarSucursal = async (id: string): Promise<boolean> => {
    return await this.sucursalRepo.eliminarSucursal(id);
  };
}
