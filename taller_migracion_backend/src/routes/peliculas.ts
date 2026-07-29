import { Router } from "express";
import multer from "multer";
import {
  listar,
  obtener,
  crear,
  actualizar,
  eliminar,
} from "../controllers/pelicula.controller";

// Multer guarda el archivo subido en memoria (req.file.buffer)
const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.get("/peliculas", listar);
router.get("/peliculas/:id", obtener);
router.post("/peliculas", upload.single("foto"), crear);
router.put("/peliculas/:id", upload.single("foto"), actualizar);
router.delete("/peliculas/:id", eliminar);

export default router;
