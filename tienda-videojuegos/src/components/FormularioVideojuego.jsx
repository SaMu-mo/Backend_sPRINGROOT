import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FormularioVideojuego.css';

function FormularioVideojuego({ onAgregar, onEditar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const juegoAEditar = location.state?.juego || null;

  const [formulario, setFormulario] = useState({
    titulo: '',
    genero: 'Aventura',
    plataforma: 'PC',
    lanzamiento: '',
    precio: '',
    disponible: true,
    progreso: 0
  });

  useEffect(() => {
    if (juegoAEditar) {
      setFormulario(juegoAEditar);
    }
  }, [juegoAEditar]);

  function manejarCambio(e) {
    const { name, value, type, checked } = e.target;
    setFormulario({
      ...formulario,
      [name]: type === 'checkbox' ? checked : value
    });
  }

  function manejarEnvio(e) {
    e.preventDefault();

    const datosFinales = {
      ...formulario,
      lanzamiento: Number(formulario.lanzamiento),
      precio: Number(formulario.precio),
      progreso: Number(formulario.progreso)
    };

    if (juegoAEditar) {
      onEditar({ ...datosFinales, id: juegoAEditar.id });
    } else {
      onAgregar({ ...datosFinales, id: Date.now() });
    }

    navigate('/');
  }

  return (
    <div className="contenedor-formulario">
      <h2>{juegoAEditar ? 'Editar Videojuego' : 'Registrar Nuevo Videojuego'}</h2>

      <form onSubmit={manejarEnvio} className="formulario-videojuego">
        <label>
          Título
          <input
            type="text"
            name="titulo"
            value={formulario.titulo}
            onChange={manejarCambio}
            required
          />
        </label>

        <label>
          Género
          <select name="genero" value={formulario.genero} onChange={manejarCambio}>
            <option value="Aventura">Aventura</option>
            <option value="Acción">Acción</option>
            <option value="RPG">RPG</option>
            <option value="Plataformas">Plataformas</option>
            <option value="Carreras">Carreras</option>
            <option value="Estrategia">Estrategia</option>
          </select>
        </label>

        <label>
          Plataforma
          <select name="plataforma" value={formulario.plataforma} onChange={manejarCambio}>
            <option value="PC">PC</option>
            <option value="PS5">PS5</option>
            <option value="Xbox Series X">Xbox Series X</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
          </select>
        </label>

        <label>
          Año de lanzamiento
          <input
            type="number"
            name="lanzamiento"
            value={formulario.lanzamiento}
            onChange={manejarCambio}
            required
          />
        </label>

        <label>
          Precio
          <input
            type="number"
            step="0.01"
            name="precio"
            value={formulario.precio}
            onChange={manejarCambio}
            required
          />
        </label>

        <label>
          Progreso de descarga (0 a 1)
          <input
            type="number"
            step="0.01"
            min="0"
            max="1"
            name="progreso"
            value={formulario.progreso}
            onChange={manejarCambio}
          />
        </label>

        <label className="label-checkbox">
          <input
            type="checkbox"
            name="disponible"
            checked={formulario.disponible}
            onChange={manejarCambio}
          />
          Disponible
        </label>

        <div className="botones-formulario">
          <button type="submit" className="boton-guardar">
            {juegoAEditar ? 'Guardar Cambios' : 'Registrar Juego'}
          </button>
          <button type="button" className="boton-cancelar" onClick={() => navigate('/')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioVideojuego;
