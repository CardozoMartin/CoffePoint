import { Request, Response } from "express";
import { CanjePromocionServicio } from "../services/canjePromocion.servicio";

export class CanjePromocionController {
  private canjeServicio: CanjePromocionServicio;

  constructor(canjeServicio?: CanjePromocionServicio) {
    this.canjeServicio = canjeServicio || new CanjePromocionServicio();
  }

  // Generar QR para canje de promoción
  generarQrCanje = async (req: Request, res: Response): Promise<void> => {
    try {
      const { clienteId, promocionId } = req.body;
      if (!clienteId || !promocionId) {
        res.status(400).json({ message: "Faltan datos obligatorios" });
        return;
      }

      const nuevoCanje = await this.canjeServicio.generarQrCanje(
        clienteId,
        promocionId
      );

      res.status(201).json({
        message: "QR generado para canje",
        qrToken: nuevoCanje.qrToken,
        canjeId: nuevoCanje.id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error generando QR" });
    }
  };

  // Validar QR escaneado por el cajero
  validarQr = async (req: Request, res: Response): Promise<void> => {
    try {
      const { qrToken } = req.body;
      if (!qrToken) {
        res.status(400).json({ message: "El token QR es obligatorio" });
        return;
      }

      const resultado = await this.canjeServicio.validarQr(qrToken);

      res.status(200).json({
        message: resultado.mensaje,
        canje: resultado.canje,
      });
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ message: error.message || "Error validando QR" });
    }
  };
}
