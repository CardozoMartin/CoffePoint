// src/controllers/sucursal.controller.ts
import { Request, Response } from "express";
import { SucursalServicio } from "../services/sucursal.servicio";

export class SucursalController {
  private servicio: SucursalServicio;

  constructor(servicio?: SucursalServicio) {
    this.servicio = servicio || new SucursalServicio();
  }

  obtenerSucursales = async (req: Request, res: Response): Promise<void> => {
    try {
      const sucursales = await this.servicio.obtenerSucursales();
      res.status(200).json({ sucursales });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener sucursales" });
    }
  };

  obtenerSucursalPorId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const sucursal = await this.servicio.obtenerSucursalPorId(id);
      if (!sucursal) {
        res.status(404).json({ message: "Sucursal no encontrada" });
        return;
      }
      res.status(200).json({ sucursal });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener la sucursal" });
    }
  };

  crearSucursal = async (req: Request, res: Response): Promise<void> => {
    try {
      const nuevaSucursal = await this.servicio.crearSucursal(req.body);
      res.status(201).json({ message: "Sucursal creada", nuevaSucursal });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear la sucursal" });
    }
  };

  actualizarSucursal = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const sucursalActualizada = await this.servicio.actualizarSucursal(
        id,
        req.body
      );
      if (!sucursalActualizada) {
        res.status(404).json({ message: "Sucursal no encontrada" });
        return;
      }
      res
        .status(200)
        .json({ message: "Sucursal actualizada", sucursalActualizada });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar la sucursal" });
    }
  };

  eliminarSucursal = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const eliminado = await this.servicio.eliminarSucursal(id);
      if (!eliminado) {
        res.status(404).json({ message: "Sucursal no encontrada" });
        return;
      }
      res.status(200).json({ message: "Sucursal eliminada" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar la sucursal" });
    }
  };
}
