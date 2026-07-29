import express from "express";
import albumesRouter from "./routes/albumes";
import cancionesRouter from "./routes/canciones";

const app = express();
app.use(express.json());

app.use("/albumes", albumesRouter);
app.use("/canciones", cancionesRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});