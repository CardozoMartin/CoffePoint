import { Router} from 'express';
import { ClienteController } from '../controller/cliente.controller';


const router = Router();
const clienteController = new ClienteController();


router.get('/mostrarusuario',clienteController.obtenerTodosLosClientes)







export default router;
