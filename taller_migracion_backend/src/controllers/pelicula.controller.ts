import { Request, Response } from "express";
import { prisma } from "../database/prisma";

// Convierte los bytes de la foto guardados en la base a un data URL usable por <img>
function aDataUrl(foto: Buffer | Uint8Array | null, mimetype: string | null): string | null {
  if (!foto) return null;
  const base64 = Buffer.from(foto).toString("base64");
  return `data:${mimetype ?? "image/png"};base64,${base64}`;
}

// GET /auth/peliculas  -> lista todas las peliculas (con su foto como data URL)
export const listar = async (_req: Request, res: Response) => {
  try {
    const peliculas = await prisma.pelicula.findMany({ orderBy: { id: "asc" } });
    const resultado = peliculas.map((p) => ({
      id: p.id,
      titulo: p.titulo,
      director: p.director,
      anio: p.anio,
      foto: aDataUrl(p.foto, p.mimetype),
    }));
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Error al listar las peliculas" });
  }
};

// GET /auth/peliculas/:id  -> una sola pelicula
export const obtener = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const p = await prisma.pelicula.findUnique({ where: { id } });
    if (!p) {
      res.status(404).json({ error: "Pelicula no encontrada" });
      return;
    }
    res.status(200).json({
      id: p.id,
      titulo: p.titulo,
      director: p.director,
      anio: p.anio,
      foto: aDataUrl(p.foto, p.mimetype),
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la pelicula" });
  }
};

// POST /auth/peliculas  -> crea una pelicula (con foto opcional via multipart)
export const crear = async (req: Request, res: Response) => {
  try {
    const { titulo, director, anio } = req.body;
    const file = req.file;

    const nueva = await prisma.pelicula.create({
      data: {
        titulo,
        director,
        anio: Number(anio),
        foto: file ? file.buffer : null,
        mimetype: file ? file.mimetype : null,
      },
    });

    res.status(201).json({
      id: nueva.id,
      titulo: nueva.titulo,
      director: nueva.director,
      anio: nueva.anio,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la pelicula" });
  }
};

// PUT /auth/peliculas/:id  -> edita textos y, si suben foto nueva, la reemplaza;
// si NO suben foto, conserva la que ya estaba guardada.
export const actualizar = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { titulo, director, anio } = req.body;
    const file = req.file;

    const existente = await prisma.pelicula.findUnique({ where: { id } });
    if (!existente) {
      res.status(404).json({ error: "Pelicula no encontrada" });
      return;
    }

    const actualizada = await prisma.pelicula.update({
      where: { id },
      data: {
        titulo: titulo ?? existente.titulo,
        director: director ?? existente.director,
        anio: anio ? Number(anio) : existente.anio,
        foto: file ? file.buffer : existente.foto,
        mimetype: file ? file.mimetype : existente.mimetype,
      },
    });

    res.status(200).json({
      id: actualizada.id,
      titulo: actualizada.titulo,
      mensaje: "Pelicula actualizada correctamente",
    });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la pelicula" });
  }
};

// DELETE /auth/peliculas/:id  -> elimina y responde 200 OK con confirmacion JSON
export const eliminar = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await prisma.pelicula.delete({ where: { id } });
    res.status(200).json({ mensaje: "Pelicula eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la pelicula" });
  }
};
