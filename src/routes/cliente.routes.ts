import { Router} from 'express';
import { ClienteController } from '../controller/cliente.controller';
import { validarCliente } from '../middleware/validateCliente';


const router = Router();
const clienteController = new ClienteController();


router.get('/mostrarusuario',clienteController.obtenerTodosLosClientes)
router.get('/mostrarusuario/:id',clienteController.obtenerClientePorID)
router.post('/crearcliente', clienteController.cargarNuevoCliente)
router.put('/actualizarcliente/:id',clienteController.actualizarCliente)
router.delete('/eliminarcliente/:id',clienteController.eliminarCliente)







export default router;
