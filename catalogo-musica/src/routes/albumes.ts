import { Router } from "express";
import { crearAlbum, obtenerAlbumes } from "../controllers/album.controller";

const router = Router();

router.post("/", crearAlbum);
router.get("/", obtenerAlbumes);

export default router;