import { Request, Response } from "express";
import { prisma } from "../database/prisma";

// Crear un álbum (POST)
export const crearAlbum = async (req: Request, res: Response) => {
  try {
    const { titulo, artista, anio } = req.body;

    const nuevoAlbum = await prisma.album.create({
      data: { titulo, artista, anio },
    });

    res.status(201).json(nuevoAlbum);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el álbum" });
  }
};

// Obtener todos los álbumes (GET)
export const obtenerAlbumes = async (req: Request, res: Response) => {
  try {
    const albumes = await prisma.album.findMany();
    res.status(200).json(albumes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los álbumes" });
  }
};