import Promocion, { IPromocion } from "../models/promocion.modelo";

export interface IPromocionRepository {
  obtenerTodasLasPromociones(): Promise<IPromocion[]>;
  obtenerPromocionPorId(id: string): Promise<IPromocion | null>;
  crearPromocion(data: Partial<IPromocion>): Promise<IPromocion>;
  actualizarPromocion(
    id: string,
    data: Partial<IPromocion>
  ): Promise<IPromocion | null>;
  eliminarPromocion(id: string): Promise<boolean>;
  obtenerPromocionesVigentes(): Promise<IPromocion[]>;
}

export class PromocionRepository implements IPromocionRepository {
  async obtenerTodasLasPromociones(): Promise<IPromocion[]> {
    try {
      return await Promocion.find();
    } catch (error) {
      return [];
    }
  }

  async obtenerPromocionPorId(id: string): Promise<IPromocion | null> {
    try {
      return await Promocion.findById(id);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async crearPromocion(data: Partial<IPromocion>): Promise<IPromocion> {
    try {
      const promocion = new Promocion(data);
      return await promocion.save();
    } catch (error) {
      throw error;
    }
  }

  async actualizarPromocion(
    id: string,
    data: Partial<IPromocion>
  ): Promise<IPromocion | null> {
    try {
      return await Promocion.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      return null;
    }
  }

  async eliminarPromocion(id: string): Promise<boolean> {
    try {
      const result = await Promocion.findByIdAndDelete(id);
      return result !== null;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async obtenerPromocionesVigentes(): Promise<IPromocion[]> {
    const hoy = new Date();
    try {
      return await Promocion.find({
        vigenteDesde: { $lte: hoy },
        vigenteHasta: { $gte: hoy },
      });
    } catch (error) {
      return [];
    }
  }
}
