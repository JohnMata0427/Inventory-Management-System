import { PrismaClient } from '@prisma/client';
import { validationResult } from 'express-validator';
import cloudinary from '../middlewares/cloudinary.js';

const prisma = new PrismaClient();

// Crear producto
export const crearProducto = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errors: errores.array() });
  }

  const { nombre, codigo, descripcion, unidad, categoria } = req.body;

  try {
    const existe = await prisma.producto.findUnique({ where: { codigo } });
    if (existe) {
      return res.status(400).json({ message: 'Código ya registrado' });
    }

    let imageUrl = '';
    let publicId = '';

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'inventory-project' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });

      imageUrl = uploadResult.secure_url;
      publicId = uploadResult.public_id;
    }

    const producto = await prisma.producto.create({
      data: {
        nombre,
        codigo,
        descripcion,
        unidad: Number(unidad),
        categoria,
        imagen: imageUrl,
        publicId 
      }
    });

    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto', error: error.message });
  }
};

// Obtener productos (con filtros opcionales por nombre o código)
export const obtenerProductos = async (req, res) => {
  const { nombre, codigo } = req.query;

  try {
    const productos = await prisma.producto.findMany({
      where: {
        AND: [
          nombre ? { nombre: { contains: nombre, mode: 'insensitive' } } : {},
          codigo ? { codigo: { equals: codigo } } : {}
        ]
      }
    });

    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
};

// Obtener un producto por ID
export const obtenerProductoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await prisma.producto.findUnique({
      where: { id: Number(id) }
    });

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producto', error: error.message });
  }
};

// Actualizar producto
export const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errors: errores.array() });
  }

  const { nombre, codigo, descripcion, unidad, categoria } = req.body;
  let imageUrl;

  try {
    const producto = await prisma.producto.findUnique({
      where: { id: Number(id) }
    });

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (codigo && codigo !== producto.codigo) {
      const existeCodigo = await prisma.producto.findUnique({ where: { codigo } });
      if (existeCodigo) {
        return res.status(400).json({ message: 'Código ya registrado' });
      }
    }

    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'inventory-project' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      imageUrl = uploadResult.secure_url;
    }

    const productoActualizado = await prisma.producto.update({
      where: { id: Number(id) },
      data: {
        nombre,
        codigo,
        descripcion,
        unidad: Number(unidad),
        categoria,
        imagen: imageUrl || producto.imagen  
      }
    });

    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
  }
};  

// Eliminar producto
export const eliminarProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await prisma.producto.findUnique({
      where: { id: Number(id) }
    });

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (producto.publicId) {
      await cloudinary.uploader.destroy(producto.publicId);
    }

    await prisma.producto.delete({
      where: { id: Number(id) }
    });

    res.json({ message: 'Producto e imagen eliminados correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
  }
};
