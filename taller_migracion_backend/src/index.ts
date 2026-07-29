import "dotenv/config";
import express from "express";
import cors from "cors";
import { login } from "./controllers/auth.controller";
import { verificarToken } from "./middlewares/auth.middleware";
import peliculasRouter from "./routes/peliculas";

const app = express();

app.use(cors());          // permite que el frontend React (otro puerto) llame a esta API
app.use(express.json());  // entiende JSON en el cuerpo de las peticiones

// Ruta publica de login (no necesita token)
app.post("/login", login);

// Todas las rutas de /auth requieren token JWT valido
app.use("/auth", verificarToken, peliculasRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
