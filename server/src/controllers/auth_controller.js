import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "secreto";

// Registro de usuario
export const register = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    const existe = await prisma.usuario.findUnique({ where: { email } });
    if (existe) {
      return res.status(400).json({ message: "Email ya registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.usuario.create({
      data: { nombre, email, password: hashedPassword }
    });

    res.status(201).json({ message: "Usuario creado", userId: user.id });
  } catch (error) {
    res.status(500).json({ message: "Error en registro", error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error en login", error: error.message });
  }
};

// Perfil
export const perfil = async (req, res) => {
  try {
    const user = await prisma.usuario.findUnique({
      where: { id: req.userId },
      select: { id: true, nombre: true, email: true }
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener perfil", error: error.message });
  }
};
