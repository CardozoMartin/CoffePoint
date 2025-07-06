import { Router } from "express";
import { PromocionController } from "../controller/promocion.controller";
import validacionMiddleware from "../middleware/validate";
import schemaPromocion from "../utils/crearPromocionSchema";

const router = Router();
const promocionController = new PromocionController();

router.get("/", promocionController.obtenerPromociones);
router.get("/vigentes", promocionController.obtenerPromocionesVigentes);
router.get("/:id", promocionController.obtenerPromocionPorId);

router.post(
  "/",
  validacionMiddleware.validacionSchema(schemaPromocion),
  promocionController.crearPromocion
);

router.put("/:id", promocionController.actualizarPromocion);
router.delete("/:id", promocionController.eliminarPromocion);

export default router;
