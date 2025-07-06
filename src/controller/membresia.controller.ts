import { Request, Response } from "express";
import { MembresiaServicio } from "../services/membresia.servicio";

export class MembresiaController {
  private membresiaServicio: MembresiaServicio;

  constructor(membresiaServicio?: MembresiaServicio) {
    this.membresiaServicio = membresiaServicio || new MembresiaServicio();
  }

  obtenerMembresias = async (req: Request, res: Response): Promise<void> => {
    try {
      const membresias = await this.membresiaServicio.obtenerMembresias();
      res.status(200).json({ membresias });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener membresías" });
    }
  };

  obtenerMembresiaPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const membresia = await this.membresiaServicio.obtenerMembresiaPorId(id);
      if (!membresia) {
        res.status(404).json({ message: "Membresía no encontrada" });
        return;
      }
      res.status(200).json({ membresia });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener membresía" });
    }
  };

  crearMembresia = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;
      const nuevaMembresia = await this.membresiaServicio.crearMembresia(data);
      res.status(201).json({ message: "Membresía creada", nuevaMembresia });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear membresía" });
    }
  };

  actualizarMembresia = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const data = req.body;
      const membresiaActualizada =
        await this.membresiaServicio.actualizarMembresia(id, data);
      if (!membresiaActualizada) {
        res.status(404).json({ message: "Membresía no encontrada" });
        return;
      }
      res
        .status(200)
        .json({ message: "Membresía actualizada", membresiaActualizada });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar membresía" });
    }
  };

  eliminarMembresia = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const eliminado = await this.membresiaServicio.eliminarMembresia(id);
      if (!eliminado) {
        res.status(404).json({ message: "Membresía no encontrada" });
        return;
      }
      res.status(200).json({ message: "Membresía eliminada" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar membresía" });
    }
  };
}
