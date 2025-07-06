import { ICanjePromocion } from "../models/canjePromocion.modelo";
import {
  CanjePromocionRepository,
  ICanjePromocionRepository,
} from "../repositories/canjePromocion.repositories";
import {
  ClienteRepository,
  IClienteRepository,
} from "../repositories/cliente.respositories";

export interface ICanjePromocionSeguro {
  id: string;
  clienteId: string;
  promocionId: string;
  qrToken: string;
  estado: "activo" | "usado";
  fechaGeneracion: Date;
  fechaCanje?: Date | null;
}

export class CanjePromocionServicio {
  private canjeRepo: ICanjePromocionRepository;
  private clienteRepo: IClienteRepository;

  constructor(
    canjeRepo?: ICanjePromocionRepository,
    clienteRepo?: IClienteRepository
  ) {
    this.canjeRepo = canjeRepo || new CanjePromocionRepository();
    this.clienteRepo = clienteRepo || new ClienteRepository();
  }

  private canjeSeguro(canje: ICanjePromocion): ICanjePromocionSeguro {
    return {
      id: canje.id,
      clienteId: canje.clienteId,
      promocionId: canje.promocionId,
      qrToken: canje.qrToken,
      estado: canje.estado,
      fechaGeneracion: canje.fechaGeneracion,
      fechaCanje: canje.fechaCanje ?? null,
    };
  }

  async generarQrCanje(
    clienteId: string,
    promocionId: string
  ): Promise<ICanjePromocionSeguro> {
    const { v4: uuidv4 } = await import("uuid");
    const qrToken = uuidv4();

    const nuevoCanje = await this.canjeRepo.crearCanje({
      clienteId,
      promocionId,
      qrToken,
      estado: "activo",
      fechaGeneracion: new Date(),
      fechaCanje: null,
    });

    return this.canjeSeguro(nuevoCanje);
  }

  async validarQr(
    qrToken: string
  ): Promise<{ mensaje: string; canje: ICanjePromocionSeguro }> {
    const canje = await this.canjeRepo.buscarPorQrToken(qrToken);

    if (!canje) {
      throw new Error("QR inválido o no existe");
    }

    if (canje.estado === "usado") {
      throw new Error("QR ya fue usado");
    }

    // Marcar como usado y asignar fechaCanje
    // Marcar como usado y asignar fechaCanje (no pasar la fecha, ya se asigna en repositorio)
    const canjeActualizado = await this.canjeRepo.marcarComoUsado(canje.id);

    if (!canjeActualizado) {
      throw new Error("No se pudo actualizar el estado del canje");
    }

    // Sumar puntos al cliente
    await this.sumarPuntoAlCliente(canje.clienteId);

    return {
      mensaje: "QR validado correctamente. Puntos sumados.",
      canje: this.canjeSeguro(canjeActualizado),
    };
  }

  private async sumarPuntoAlCliente(clienteId: string): Promise<void> {
    const cliente = await this.clienteRepo.mostrarClientePorID(clienteId);
    if (!cliente) return;

    const nuevosPuntos = (cliente.points || 0) + 1;
    await this.clienteRepo.actualizarCliente(clienteId, {
      points: nuevosPuntos,
    });
  }

  async historialDeCanjes(clienteId: string): Promise<ICanjePromocionSeguro[]> {
    const canjes = await this.canjeRepo.obtenerCanjesPorCliente(clienteId);
    return canjes.map(this.canjeSeguro);
  }
}
