import { Request, Response } from "express";
import { PromocionServicio } from "../services/promocion.servicio";

export class PromocionController {
  private promocionServicio: PromocionServicio;

  constructor(promocionServicio?: PromocionServicio) {
    this.promocionServicio = promocionServicio || new PromocionServicio();
  }

  obtenerPromociones = async (req: Request, res: Response): Promise<void> => {
    try {
      const promociones = await this.promocionServicio.obtenerPromociones();
      res.status(200).json({ promociones });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al listar promociones" });
    }
  };

  obtenerPromocionesVigentes = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const promociones =
        await this.promocionServicio.obtenerPromocionesVigentes();
      res.status(200).json({ promociones });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al listar promociones vigentes" });
    }
  };

  obtenerPromocionPorId = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    try {
      const promocion = await this.promocionServicio.obtenerPromocionPorId(id);
      if (!promocion) {
        res.status(404).json({ message: "Promoción no encontrada" });
        return;
      }
      res.status(200).json({ promocion });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener promoción" });
    }
  };

  crearPromocion = async (req: Request, res: Response): Promise<void> => {
    try {
      const promocionCreada = await this.promocionServicio.crearPromocion(
        req.body
      );
      res.status(201).json({ message: "Promoción creada", promocionCreada });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear promoción" });
    }
  };

  actualizarPromocion = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const promocionActualizada =
        await this.promocionServicio.actualizarPromocion(id, req.body);
      if (!promocionActualizada) {
        res.status(404).json({ message: "Promoción no encontrada" });
        return;
      }
      res
        .status(200)
        .json({ message: "Promoción actualizada", promocionActualizada });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar promoción" });
    }
  };

  eliminarPromocion = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const eliminado = await this.promocionServicio.eliminarPromocion(id);
      if (!eliminado) {
        res.status(404).json({ message: "Promoción no encontrada" });
        return;
      }
      res.status(200).json({ message: "Promoción eliminada" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar promoción" });
    }
  };
}
