import { useEffect, useState } from "react";
import PersonajeCard from "./components/PersonajeCard.jsx";

export default function App() {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarPersonajes = async () => {
      try {
        const respuesta = await fetch("https://rickandmortyapi.com/api/character");
        if (!respuesta.ok) {
          setError("No se pudo obtener la información de la API.");
          return;
        }
        const data = await respuesta.json();
        setPersonajes(data.results);
      } catch {
        setError("Error de conexión con la API.");
      } finally {
        setCargando(false);
      }
    };
    cargarPersonajes();
  }, []);

  return (
    <div className="app">
      <header className="cabecera">
        <span className="eyebrow">API Pública · rickandmortyapi.com</span>
        <h1>
          Rick <span className="portal">and</span> Morty
        </h1>
        <p className="subtitulo">
          Catálogo de personajes del multiverso consumido con fetch y useEffect
        </p>
      </header>
      <main>
        {cargando && <p className="estado">Abriendo el portal...</p>}
        {error && <p className="estado estado-error">{error}</p>}
        {!cargando && !error && (
          <section className="cuadricula">
            {personajes.map((personaje) => (
              <PersonajeCard key={personaje.id} personaje={personaje} />
            ))}
          </section>
        )}
      </main>
      <footer className="pie">
        {personajes.length > 0 && <span>{personajes.length} personajes cargados</span>}
      </footer>
    </div>
  );
}
