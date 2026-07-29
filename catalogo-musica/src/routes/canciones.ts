import { Router } from "express";
import {
  crearCancion,
  obtenerCanciones,
  eliminarCancion,
} from "../controllers/cancion.controller";

const router = Router();

router.post("/", crearCancion);        // POST   /canciones
router.get("/", obtenerCanciones);     // GET    /canciones
router.delete("/:id", eliminarCancion); // DELETE /canciones/1

export default router;