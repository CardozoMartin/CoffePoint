import { Router } from "express";
import { ClienteController } from "../controller/cliente.controller";
import validacionMiddleware from "../middleware/validate";
import schemaCliente from "../utils/crearClienteSchema";

const router = Router();
const clienteController = new ClienteController();

router.get("/mostrarusuario", clienteController.obtenerTodosLosClientes);
router.get("/mostrarusuario/:id", clienteController.obtenerClientePorID);
router.post(
  "/crearcliente",
  validacionMiddleware.validacionSchema(schemaCliente),
  clienteController.cargarNuevoCliente
);

router.put("/actualizarcliente/:id", clienteController.actualizarCliente);
router.delete("/eliminarcliente/:id", clienteController.eliminarCliente);

export default router;
