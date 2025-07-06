// src/repositories/producto.repositories.ts
import Producto, { IProducto } from "../models/producto.modelo";

export interface IProductoRepository {
  obtenerProductos(): Promise<IProducto[]>;
  obtenerProductoPorId(id: string): Promise<IProducto | null>;
  crearProducto(data: Partial<IProducto>): Promise<IProducto>;
  actualizarProducto(
    id: string,
    data: Partial<IProducto>
  ): Promise<IProducto | null>;
  eliminarProducto(id: string): Promise<boolean>;
}

export class ProductoRepository implements IProductoRepository {
  async obtenerProductos(): Promise<IProducto[]> {
    try {
      return await Producto.find();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async obtenerProductoPorId(id: string): Promise<IProducto | null> {
    try {
      return await Producto.findById(id);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async crearProducto(data: Partial<IProducto>): Promise<IProducto> {
    try {
      const nuevoProducto = new Producto(data);
      return await nuevoProducto.save();
    } catch (error) {
      throw error;
    }
  }

  async actualizarProducto(
    id: string,
    data: Partial<IProducto>
  ): Promise<IProducto | null> {
    try {
      return await Producto.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async eliminarProducto(id: string): Promise<boolean> {
    try {
      const resultado = await Producto.findByIdAndDelete(id);
      return resultado !== null;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
