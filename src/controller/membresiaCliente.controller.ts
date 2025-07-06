// src/controllers/membresiaCliente.controller.ts
import { Request, Response } from "express";
import { MembresiaClienteServicio } from "../services/membresiaCliente.servicio";

export class MembresiaClienteController {
  private servicio: MembresiaClienteServicio;

  constructor(servicio?: MembresiaClienteServicio) {
    this.servicio = servicio || new MembresiaClienteServicio();
  }

  // POST: Crear membresía para cliente
  crearMembresiaParaCliente = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { clienteId, membresiaId } = req.body;
      if (!clienteId || !membresiaId) {
        res
          .status(400)
          .json({ message: "clienteId y membresiaId son requeridos" });
        return;
      }

      const nuevaMembresia = await this.servicio.asignarMembresiaACliente(
        clienteId,
        membresiaId
      );
      res
        .status(201)
        .json({ message: "Membresía asignada", data: nuevaMembresia });
    } catch (error: any) {
      console.error(error);
      res
        .status(500)
        .json({ message: error.message || "Error al asignar membresía" });
    }
  };

  // GET: Obtener historial de membresías de un cliente
  obtenerMembresiasPorCliente = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { clienteId } = req.params;
      const membresias = await this.servicio.obtenerMembresiasDeCliente(
        clienteId
      );
      res.status(200).json({ data: membresias });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({
        message: error.message || "Error al obtener membresías del cliente",
      });
    }
  };

  // PUT: Cancelar membresía
  cancelarMembresia = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const cancelada = await this.servicio.cancelarMembresia(id);
      if (!cancelada) {
        res.status(404).json({ message: "Membresía no encontrada" });
        return;
      }
      res.status(200).json({ message: "Membresía cancelada", data: cancelada });
    } catch (error: any) {
      console.error(error);
      res
        .status(500)
        .json({ message: error.message || "Error al cancelar membresía" });
    }
  };
}
