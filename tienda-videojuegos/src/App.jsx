import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TablaVideojuegos from './components/TablaVideojuegos';
import FormularioVideojuego from './components/FormularioVideojuego';
import PaginaNoEncontrada from './components/PaginaNoEncontrada';
import videojuegosData from './data/videojuegos';

function App() {
  const [videojuegos, setVideojuegos] = useState(videojuegosData);

  function agregar(nuevoJuego) {
    setVideojuegos([...videojuegos, nuevoJuego]);
  }

  function eliminar(id) {
    setVideojuegos(videojuegos.filter((juego) => juego.id !== id));
  }

  function editar(juegoActualizado) {
    setVideojuegos(
      videojuegos.map((juego) =>
        juego.id === juegoActualizado.id ? juegoActualizado : juego
      )
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<TablaVideojuegos videojuegos={videojuegos} onEliminar={eliminar} />}
        />
        <Route
          path="/nuevo"
          element={<FormularioVideojuego onAgregar={agregar} onEditar={editar} />}
        />
        <Route
          path="/editar"
          element={<FormularioVideojuego onAgregar={agregar} onEditar={editar} />}
        />
        <Route path="*" element={<PaginaNoEncontrada />} />
      </Routes>
    </div>
  );
}

export default App;
