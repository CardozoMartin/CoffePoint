import { Router } from "express";
import { SucursalController } from "../controller/sucursal.controller";
import validacionMiddleware from "../middleware/validate";
import schemaSucursal from "../utils/crearSucursalSchema";

const router = Router();
const sucursalController = new SucursalController();

router.get("/mostrarsucursal", sucursalController.obtenerSucursales);
router.get("/mostrarsucursal/:id", sucursalController.obtenerSucursalPorId);
router.post(
  "/crearsucursal",
  validacionMiddleware.validacionSchema(schemaSucursal),
  sucursalController.crearSucursal
);
router.put("/actualizarsucursal/:id", sucursalController.actualizarSucursal);
router.delete("/eliminarsucursal/:id", sucursalController.eliminarSucursal);

export default router;
