import { useEffect, useState } from "react";
import { login, obtenerPeliculas, eliminarPelicula } from "./api";

export default function App() {
  const [token, setToken] = useState(null);
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Al cargar la pagina: inicia sesion y trae las peliculas del backend de Node
  useEffect(() => {
    async function iniciar() {
      try {
        const t = await login();
        setToken(t);
        const data = await obtenerPeliculas(t);
        setPeliculas(data);
      } catch (e) {
        setError("No se pudo conectar con el backend. Revisa que el servidor este corriendo.");
      } finally {
        setCargando(false);
      }
    }
    iniciar();
  }, []);

  async function handleEliminar(id) {
    const status = await eliminarPelicula(id, token);
    if (status === 200) {
      setPeliculas((prev) => prev.filter((p) => p.id !== id));
    }
  }

  if (cargando) return <p className="aviso">Cargando...</p>;
  if (error) return <p className="aviso">{error}</p>;

  return (
    <div className="contenedor">
      <h1>Catalogo de Peliculas</h1>
      <p className="subtitulo">Datos servidos desde el backend de Node.js</p>

      <div className="grid">
        {peliculas.map((p) => (
          <div className="card" key={p.id}>
            {p.foto && <img src={p.foto} alt={p.titulo} />}
            <div className="card-body">
              <h3>{p.titulo}</h3>
              <p>
                {p.director} &middot; {p.anio}
              </p>
              <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
