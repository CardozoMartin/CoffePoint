import { IPromocion } from "../models/promocion.modelo";
import {
  PromocionRepository,
  IPromocionRepository,
} from "../repositories/promocion.repositories";

// DTO para devolver solo datos seguros a la vista o frontend
export interface IPromocionSeguro {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  vigenteDesde: Date; // cambio aquí
  vigenteHasta: Date; // cambio aquí
  imagenUrl?: string;
}
export class PromocionServicio {
  private promocionRepo: IPromocionRepository;

  constructor(promocionRepo?: IPromocionRepository) {
    this.promocionRepo = promocionRepo || new PromocionRepository();
  }

  // Método para devolver datos seguros (sin campos sensibles si hubiera)
  private promocionSegura(promocion: IPromocion): IPromocionSeguro {
    return {
      id: promocion.id,
      titulo: promocion.titulo,
      descripcion: promocion.descripcion,
      precio: promocion.precio,
      vigenteDesde: promocion.vigenteDesde, // cambio aquí
      vigenteHasta: promocion.vigenteHasta, // cambio aquí
      imagenUrl: promocion.imagenUrl,
    };
  }

  async obtenerPromociones(): Promise<IPromocionSeguro[]> {
    const promociones = await this.promocionRepo.obtenerTodasLasPromociones(); // Cambiado aquí
    return promociones.map((promo) => this.promocionSegura(promo));
  }
  async obtenerPromocionPorId(id: string): Promise<IPromocion | null> {
    return await this.promocionRepo.obtenerPromocionPorId(id); // Cambiado aquí
  }
  async crearPromocion(
    promocionData: Partial<IPromocion>
  ): Promise<IPromocion> {
    return await this.promocionRepo.crearPromocion(promocionData);
  }

  async actualizarPromocion(
    id: string,
    promocionData: Partial<IPromocion>
  ): Promise<IPromocion | null> {
    return await this.promocionRepo.actualizarPromocion(id, promocionData);
  }

  async eliminarPromocion(id: string): Promise<boolean> {
    return await this.promocionRepo.eliminarPromocion(id);
  }

  // Método extra para listar solo las promociones vigentes
  async obtenerPromocionesVigentes(): Promise<IPromocionSeguro[]> {
    const promociones = await this.promocionRepo.obtenerPromocionesVigentes(); // Cambiado aquí
    return promociones.map((promo) => this.promocionSegura(promo));
  }
}
