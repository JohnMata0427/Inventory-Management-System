import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

console.log('Conexión a la base de datos establecida');