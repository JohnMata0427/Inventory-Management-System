import { body } from 'express-validator';

export const usuarioValidator = [
  body('nombre')
    .trim()
    .isLength({ min: 3, max: 20 }).withMessage('El nombre debe tener entre 3 y 20 caracteres')
    .matches(/^[A-Za-z\s]+$/).withMessage('El nombre solo puede contener caracteres alfabéticos y espacios'),

  body('email')
    .isEmail().withMessage('El email debe tener un formato válido'),

  body('password')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/\d/).withMessage('La contraseña debe contener al menos un número')
    .matches(/[A-Za-z]/).withMessage('La contraseña debe contener al menos una letra')
];

export const loginValidator = [
  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Formato de email inválido'),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
];
