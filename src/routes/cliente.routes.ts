import { Router } from 'express';
import { ClienteController } from '../controller/cliente.controller';
import {
     validarCrearCliente,
     validarActualizarCliente,
     validarIdCliente,
     validarBodyNoVacio
} from '../middleware/validateCliente';
import { isAuthenticated } from '../middleware/verificarAutenticacion'; // Use consistent middleware

const router = Router();
const clienteController = new ClienteController();

// Ruta para obtener todos los clientes (protected)
router.get('/mostrarusuario', 
    isAuthenticated,
    clienteController.obtenerTodosLosClientes
);

// Ruta para obtener un cliente por ID (with ID validation and auth)
router.get('/mostrarusuario/:id',
    validarIdCliente,
    isAuthenticated,
    clienteController.obtenerClientePorID
);

// Ruta para crear un nuevo cliente (with complete validation and auth)
router.post('/crearcliente',
    isAuthenticated,
    validarBodyNoVacio,
    validarCrearCliente,
    clienteController.cargarNuevoCliente
);

// Ruta para actualizar un cliente (with validation and auth)
router.put('/actualizarcliente/:id',
    isAuthenticated,
    validarIdCliente,
    validarBodyNoVacio,
    validarActualizarCliente,
    clienteController.actualizarCliente
);

// Ruta para eliminar un cliente (with validation and auth)
router.delete('/eliminarcliente/:id',
    isAuthenticated,
    validarIdCliente,
    clienteController.eliminarCliente
);

export default router;