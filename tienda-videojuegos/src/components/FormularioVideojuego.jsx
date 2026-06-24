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
    progreso: 0,
    fechaLanzamiento: '',
    sinopsis: '',
    calificacion: ''
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (juegoAEditar) {
      setFormulario({
        fechaLanzamiento: '',
        sinopsis: '',
        calificacion: '',
        ...juegoAEditar
      });
    }
  }, [juegoAEditar]);

  function manejarCambio(e) {
    const { name, value, type, checked } = e.target;
    setFormulario({
      ...formulario,
      [name]: type === 'checkbox' ? checked : value
    });
  }

  function validarFormulario() {
    const erroresActivos = {};
    const hoy = new Date().toISOString().split('T')[0];

    if (!formulario.titulo || formulario.titulo.trim() === '') {
      erroresActivos.titulo = 'El título no puede estar vacío ni contener solo espacios.';
    }

    if (
      formulario.calificacion === '' ||
      Number(formulario.calificacion) < 1 ||
      Number(formulario.calificacion) > 100
    ) {
      erroresActivos.calificacion = 'La calificación debe estar entre 1 y 100.';
    }

    if (!formulario.sinopsis || formulario.sinopsis.trim().length < 10) {
      erroresActivos.sinopsis = 'La sinopsis debe tener al menos 10 caracteres.';
    } else if (formulario.sinopsis.trim().length > 250) {
      erroresActivos.sinopsis = 'La sinopsis no puede superar los 250 caracteres.';
    }

    if (!formulario.fechaLanzamiento) {
      erroresActivos.fechaLanzamiento = 'Debes indicar la fecha de lanzamiento.';
    } else if (formulario.fechaLanzamiento > hoy) {
      erroresActivos.fechaLanzamiento = 'La fecha no puede ser futura.';
    }

    if (!formulario.precio || Number(formulario.precio) <= 0) {
      erroresActivos.precio = 'El precio debe ser mayor a 0.';
    }

    if (!formulario.lanzamiento) {
      erroresActivos.lanzamiento = 'Debes indicar el año de lanzamiento.';
    }

    return erroresActivos;
  }

  function manejarEnvio(e) {
    e.preventDefault();

    const erroresActivos = validarFormulario();

    if (Object.keys(erroresActivos).length > 0) {
      setErrores(erroresActivos);
      return;
    }

    setErrores({});

    const datosFinales = {
      ...formulario,
      lanzamiento: Number(formulario.lanzamiento),
      precio: Number(formulario.precio),
      progreso: Number(formulario.progreso),
      calificacion: Number(formulario.calificacion)
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
          />
          {errores.titulo && <span className="error-mensaje">{errores.titulo}</span>}
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
          />
          {errores.lanzamiento && <span className="error-mensaje">{errores.lanzamiento}</span>}
        </label>

        <label>
          Fecha de lanzamiento
          <input
            type="date"
            name="fechaLanzamiento"
            value={formulario.fechaLanzamiento}
            onChange={manejarCambio}
            max={new Date().toISOString().split('T')[0]}
          />
          {errores.fechaLanzamiento && (
            <span className="error-mensaje">{errores.fechaLanzamiento}</span>
          )}
        </label>

        <label>
          Precio
          <input
            type="number"
            step="0.01"
            name="precio"
            value={formulario.precio}
            onChange={manejarCambio}
          />
          {errores.precio && <span className="error-mensaje">{errores.precio}</span>}
        </label>

        <label>
          Calificación de la crítica (1 a 100)
          <input
            type="number"
            min="1"
            max="100"
            name="calificacion"
            value={formulario.calificacion}
            onChange={manejarCambio}
          />
          {errores.calificacion && <span className="error-mensaje">{errores.calificacion}</span>}
        </label>

        <label>
          Sinopsis / Descripción
          <textarea
            name="sinopsis"
            value={formulario.sinopsis}
            onChange={manejarCambio}
            maxLength={250}
            rows={4}
          />
          <span className="contador-caracteres">
            {formulario.sinopsis.length}/250
          </span>
          {errores.sinopsis && <span className="error-mensaje">{errores.sinopsis}</span>}
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
