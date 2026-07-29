import "dotenv/config";
import express from "express";
import cors from "cors";
import { login } from "./controllers/auth.controller";
import { verificarToken } from "./middlewares/auth.middleware";
import peliculasRouter from "./routes/peliculas";
import { configurarSwagger } from "./swagger";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/login", login);
app.use("/auth", verificarToken, peliculasRouter);

configurarSwagger(app); // habilita http://localhost:3000/api-docs

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});