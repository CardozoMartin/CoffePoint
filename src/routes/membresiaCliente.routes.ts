import { Router } from "express";
import { MembresiaController } from "../controller/membresia.controller";
import validacionMiddleware from "../middleware/validate";
import crearMembresiaSchema from "../utils/crearMembresiaSchema";

const router = Router();
const membresiaController = new MembresiaController();

router.get("/", membresiaController.obtenerMembresias);
router.get("/:id", membresiaController.obtenerMembresiaPorId);
router.post(
  "/",
  validacionMiddleware.validacionSchema(crearMembresiaSchema),
  membresiaController.crearMembresia
);
router.put("/:id", membresiaController.actualizarMembresia);
router.delete("/:id", membresiaController.eliminarMembresia);

export default router;
