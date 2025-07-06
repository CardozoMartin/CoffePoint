// src/controllers/producto.controller.ts
import { Request, Response } from "express";
import { ProductoServicio } from "../services/producto.servicio";

export class ProductoController {
  private productoServicio: ProductoServicio;

  constructor(productoServicio?: ProductoServicio) {
    this.productoServicio = productoServicio || new ProductoServicio();
  }

  obtenerProductos = async (req: Request, res: Response): Promise<void> => {
    try {
      const productos = await this.productoServicio.obtenerProductos();
      res.status(200).json({ productos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener productos" });
    }
  };

  obtenerProductoPorId = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const producto = await this.productoServicio.obtenerProductoPorId(id);
      if (!producto) {
        res.status(404).json({ message: "Producto no encontrado" });
        return;
      }
      res.status(200).json({ producto });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener producto" });
    }
  };

  crearProducto = async (req: Request, res: Response): Promise<void> => {
    try {
      const productoCreado = await this.productoServicio.crearProducto(
        req.body
      );
      res.status(201).json({ message: "Producto creado", productoCreado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear producto" });
    }
  };

  actualizarProducto = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const productoActualizado =
        await this.productoServicio.actualizarProducto(id, req.body);
      if (!productoActualizado) {
        res.status(404).json({ message: "Producto no encontrado" });
        return;
      }
      res
        .status(200)
        .json({ message: "Producto actualizado", productoActualizado });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al actualizar producto" });
    }
  };

  eliminarProducto = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const eliminado = await this.productoServicio.eliminarProducto(id);
      if (!eliminado) {
        res.status(404).json({ message: "Producto no encontrado" });
        return;
      }
      res.status(200).json({ message: "Producto eliminado" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar producto" });
    }
  };
}
