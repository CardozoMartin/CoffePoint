import { Router } from "express";
import { PromocionController } from "../controller/promocion.controller";
import validacionMiddleware from "../middleware/validate";
import crearPromocionSchema from "../utils/crearPromocionSchema";

const router = Router();
const promocionController = new PromocionController();

router.get("/mostrarpromocion", promocionController.obtenerPromociones);
router.get(
  "/promocionesvigentes",
  promocionController.obtenerPromocionesVigentes
);
router.get("/mostrarpromocion/:id", promocionController.obtenerPromocionPorId);
router.post(
  "/crearpromocion",
  validacionMiddleware.validacionSchema(crearPromocionSchema),
  promocionController.crearPromocion
);

router.put("/:id", promocionController.actualizarPromocion);
router.delete("/:id", promocionController.eliminarPromocion);

export default router;
