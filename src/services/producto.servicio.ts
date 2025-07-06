// src/services/producto.servicio.ts
import { IProducto } from "../models/producto.modelo";
import {
  ProductoRepository,
  IProductoRepository,
} from "../repositories/producto.repositories";

export class ProductoServicio {
  private productoRepo: IProductoRepository;

  constructor(productoRepo?: IProductoRepository) {
    this.productoRepo = productoRepo || new ProductoRepository();
  }

  async obtenerProductos(): Promise<IProducto[]> {
    return await this.productoRepo.obtenerProductos();
  }

  async obtenerProductoPorId(id: string): Promise<IProducto | null> {
    return await this.productoRepo.obtenerProductoPorId(id);
  }

  async crearProducto(data: Partial<IProducto>): Promise<IProducto> {
    return await this.productoRepo.crearProducto(data);
  }

  async actualizarProducto(
    id: string,
    data: Partial<IProducto>
  ): Promise<IProducto | null> {
    return await this.productoRepo.actualizarProducto(id, data);
  }

  async eliminarProducto(id: string): Promise<boolean> {
    return await this.productoRepo.eliminarProducto(id);
  }
}
