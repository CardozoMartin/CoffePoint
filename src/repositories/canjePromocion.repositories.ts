import CanjePromocion, {
  ICanjePromocion,
} from "../models/canjePromocion.modelo";

export interface ICanjePromocionRepository {
  crearCanje(data: Partial<ICanjePromocion>): Promise<ICanjePromocion>;
  buscarPorQrToken(qrToken: string): Promise<ICanjePromocion | null>;
  marcarComoUsado(id: string): Promise<ICanjePromocion | null>;
  obtenerCanjesPorCliente(clienteId: string): Promise<ICanjePromocion[]>;
}

export class CanjePromocionRepository implements ICanjePromocionRepository {
  async crearCanje(data: Partial<ICanjePromocion>): Promise<ICanjePromocion> {
    const nuevoCanje = new CanjePromocion(data);
    return await nuevoCanje.save();
  }

  async buscarPorQrToken(qrToken: string): Promise<ICanjePromocion | null> {
    try {
      return await CanjePromocion.findOne({ qrToken });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async marcarComoUsado(id: string): Promise<ICanjePromocion | null> {
    try {
      return await CanjePromocion.findByIdAndUpdate(
        id,
        { estado: "usado", fechaCanje: new Date() },
        { new: true }
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async obtenerCanjesPorCliente(clienteId: string): Promise<ICanjePromocion[]> {
    try {
      return await CanjePromocion.find({ clienteId });
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
