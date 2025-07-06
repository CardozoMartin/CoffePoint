// src/repositories/sucursal.repository.ts
import Sucursal, { ISucursal } from "../models/sucursal.modelo";

export interface ISucursalRepository {
  obtenerTodasLasSucursales(): Promise<ISucursal[]>;
  obtenerSucursalPorId(id: string): Promise<ISucursal | null>;
  crearSucursal(data: Partial<ISucursal>): Promise<ISucursal>;
  actualizarSucursal(
    id: string,
    data: Partial<ISucursal>
  ): Promise<ISucursal | null>;
  eliminarSucursal(id: string): Promise<boolean>;
}

export class SucursalRepository implements ISucursalRepository {
  async obtenerTodasLasSucursales(): Promise<ISucursal[]> {
    try {
      return await Sucursal.find();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async obtenerSucursalPorId(id: string): Promise<ISucursal | null> {
    try {
      return await Sucursal.findById(id);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async crearSucursal(data: Partial<ISucursal>): Promise<ISucursal> {
    try {
      const nuevaSucursal = new Sucursal(data);
      return await nuevaSucursal.save();
    } catch (error) {
      throw error;
    }
  }

  async actualizarSucursal(
    id: string,
    data: Partial<ISucursal>
  ): Promise<ISucursal | null> {
    try {
      return await Sucursal.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async eliminarSucursal(id: string): Promise<boolean> {
    try {
      const resultado = await Sucursal.findByIdAndDelete(id);
      return resultado !== null;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
