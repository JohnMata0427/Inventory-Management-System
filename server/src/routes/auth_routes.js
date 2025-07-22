import { Router } from 'express';
import { register, login, perfil } from '../controllers/auth_controller.js';
import { validarUsuario } from '../middlewares/auth_middleware.js';
import { usuarioValidator, loginValidator } from '../middlewares/usuario_validator.js';

const router = Router();

router.post('/register', usuarioValidator, register);
router.post('/login', loginValidator,login);
router.get('/perfil', validarUsuario, perfil);

export default router;
