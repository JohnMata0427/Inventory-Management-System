import { Router } from 'express';
import {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto
} from '../controllers/producto_controller.js';
import { validarUsuario } from '../middlewares/auth_middleware.js';
import {
  crearProductoValidator,
  actualizarProductoValidator
} from '../middlewares/producto_validator.js';
import { upload } from '../middlewares/upload.js';

const router = Router();

router
  .route('/')
  .post(validarUsuario, upload.single('imagen'), crearProductoValidator, crearProducto)
  .get(obtenerProductos);

router
  .route('/:id')
  .get(obtenerProductoPorId)
  .put(validarUsuario, upload.single('imagen'), actualizarProductoValidator, actualizarProducto)
  .delete(validarUsuario, eliminarProducto);

export default router;
