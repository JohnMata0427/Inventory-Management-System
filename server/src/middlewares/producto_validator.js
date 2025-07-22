import { body } from 'express-validator';

export const crearProductoValidator = [
  body('nombre')
    .isString()
    .isLength({ min: 3, max: 20 })
    .withMessage('El nombre debe tener entre 3 y 20 caracteres y ser texto'),

  body('codigo')
    .matches(/^PROD\d{4}$/)
    .withMessage('El código debe tener el formato PROD####'),

  body('descripcion')
    .isLength({ min: 20, max: 200 })
    .withMessage('La descripción debe tener entre 20 y 200 caracteres'),

  body('unidad')
    .isInt({ gt: 0 })
    .withMessage('Unidad debe ser un número entero positivo'),

  body('categoria')
    .isIn(['Laptos', 'CPU', 'Mouses', 'Teclados'])
    .withMessage('Categoría inválida')
];

export const actualizarProductoValidator = [
  body('nombre')
    .optional()
    .isString()
    .isLength({ min: 3, max: 20 })
    .withMessage('El nombre debe tener entre 3 y 20 caracteres y ser texto'),

  body('codigo')
    .optional()
    .matches(/^PROD\d{4}$/)
    .withMessage('El código debe tener el formato PROD####'),

  body('descripcion')
    .optional()
    .isLength({ min: 20, max: 200 })
    .withMessage('La descripción debe tener entre 20 y 200 caracteres'),

  body('unidad')
    .optional()
    .isInt({ gt: 0 })
    .withMessage('Unidad debe ser un número entero positivo'),

  body('categoria')
    .optional()
    .isIn(['LAPTOS', 'CPU', 'MOUSES', 'TECLADOS'])
    .withMessage('Categoría inválida')
];
