import { Router } from "express";
import multer from "multer";
import {
  listar,
  obtener,
  crear,
  actualizar,
  eliminar,
} from "../controllers/pelicula.controller";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

/**
 * @swagger
 * /auth/peliculas:
 *   get:
 *     summary: Obtiene la lista de todas las películas
 *     tags: [Películas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de películas obtenida correctamente
 */
router.get("/peliculas", listar);

/**
 * @swagger
 * /auth/peliculas/{id}:
 *   get:
 *     summary: Obtiene una película por su ID
 *     tags: [Películas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la película
 *     responses:
 *       200:
 *         description: Película encontrada
 *       404:
 *         description: Película no encontrada
 */
router.get("/peliculas/:id", obtener);

/**
 * @swagger
 * /auth/peliculas:
 *   post:
 *     summary: Crea una nueva película (con foto opcional)
 *     tags: [Películas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               director:
 *                 type: string
 *               anio:
 *                 type: integer
 *               foto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Película creada correctamente
 */
router.post("/peliculas", upload.single("foto"), crear);

/**
 * @swagger
 * /auth/peliculas/{id}:
 *   put:
 *     summary: Actualiza una película (la foto es opcional)
 *     tags: [Películas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la película a actualizar
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               director:
 *                 type: string
 *               anio:
 *                 type: integer
 *               foto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Película actualizada correctamente
 *       404:
 *         description: Película no encontrada
 */
router.put("/peliculas/:id", upload.single("foto"), actualizar);

/**
 * @swagger
 * /auth/peliculas/{id}:
 *   delete:
 *     summary: Elimina una película por su ID
 *     tags: [Películas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la película a eliminar
 *     responses:
 *       200:
 *         description: Película eliminada correctamente
 */
router.delete("/peliculas/:id", eliminar);

export default router;