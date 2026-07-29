import { Request, Response } from "express";
import { prisma } from "../database/prisma";

// Crear una canción (POST)
export const crearCancion = async (req: Request, res: Response) => {
  try {
    const { titulo, duracion, albumId } = req.body;

    const nuevaCancion = await prisma.cancion.create({
      data: { titulo, duracion, albumId },
    });

    res.status(201).json(nuevaCancion);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la canción" });
  }
};

// Obtener todas las canciones (GET)
export const obtenerCanciones = async (req: Request, res: Response) => {
  try {
    const canciones = await prisma.cancion.findMany();
    res.status(200).json(canciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las canciones" });
  }
};

// Eliminar una canción por ID (DELETE)
export const eliminarCancion = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.cancion.delete({
      where: { id },
    });

    res.status(200).json({ mensaje: "Canción eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la canción" });
  }
};