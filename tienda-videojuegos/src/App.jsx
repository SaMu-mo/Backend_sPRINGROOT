import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TablaVideojuegos from './components/TablaVideojuegos';
import FormularioVideojuego from './components/FormularioVideojuego';
import PaginaNoEncontrada from './components/PaginaNoEncontrada';
import AlertaNotificacion from './components/AlertaNotificacion';
import videojuegosData from './data/videojuegos';

function App() {
  const [videojuegos, setVideojuegos] = useState(() => {
    const datosGuardados = localStorage.getItem('lista_videojuegos');
    return datosGuardados ? JSON.parse(datosGuardados) : videojuegosData;
  });

  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    localStorage.setItem('lista_videojuegos', JSON.stringify(videojuegos));
  }, [videojuegos]);

  function mostrarExito(texto) {
    setMensajeExito('');
    setTimeout(() => setMensajeExito(texto), 10);
  }

  function agregar(nuevoJuego) {
    setVideojuegos([...videojuegos, nuevoJuego]);
    mostrarExito('Videojuego registrado exitosamente');
  }

  function eliminar(id) {
    setVideojuegos(videojuegos.filter((juego) => juego.id !== id));
    mostrarExito('Videojuego eliminado correctamente');
  }

  function editar(juegoActualizado) {
    setVideojuegos(
      videojuegos.map((juego) =>
        juego.id === juegoActualizado.id ? juegoActualizado : juego
      )
    );
    mostrarExito('Videojuego actualizado correctamente');
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
      <Navbar />
      <AlertaNotificacion mensaje={mensajeExito} />
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
