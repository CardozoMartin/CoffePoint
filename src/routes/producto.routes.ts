import { Router } from "express";
import { ProductoController } from "../controller/producto.controller";
import validacionMiddleware from "../middleware/validate";
import crearProducto from "../utils/crearProductoSchema";
import actualizarProducto from "../utils/actualizarProductoSchema";
import { ClienteController } from "../controller/cliente.controller";

const router = Router();
const productoController = new ProductoController();

router.get("/mostrarproducto", productoController.obtenerProductos);
router.get("/mostrarproducto/:id", productoController.obtenerProductoPorId);
router.post(
  "/crearproducto",
  validacionMiddleware.validacionSchema(crearProducto),
  productoController.crearProducto
);
router.put(
  "/actualizarproducto/:id",
  validacionMiddleware.validacionSchema(actualizarProducto),
  productoController.actualizarProducto
); //preguntar a Martin si esta bien

router.delete("/eliminarproducto/:id", productoController.eliminarProducto);

export default router;
