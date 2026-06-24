import { useNavigate } from 'react-router-dom';
import './TablaVideojuegos.css';

function TablaVideojuegos({ videojuegos, onEliminar }) {
  const navigate = useNavigate();

  function manejarEditar(juego) {
    navigate('/editar', { state: { juego } });
  }

  return (
    <div className="contenedor-tabla">
      <table className="tabla-videojuegos">
        <thead>
          <tr>
            <th>Título</th>
            <th>Género</th>
            <th>Plataforma</th>
            <th>Año</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Progreso de descarga</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {videojuegos.map((juego) => (
            <tr key={juego.id}>
              <td data-label="Título">{juego.titulo}</td>
              <td data-label="Género">{juego.genero}</td>
              <td data-label="Plataforma">{juego.plataforma}</td>
              <td data-label="Año">{juego.lanzamiento}</td>
              <td data-label="Precio">${juego.precio}</td>
              <td data-label="Disponible">{juego.disponible ? 'Sí' : 'No'}</td>
              <td data-label="Progreso">
                <progress value={juego.progreso} max="1"></progress>
                <span className="texto-progreso">{Math.round(juego.progreso * 100)}%</span>
              </td>
              <td data-label="Acciones">
                <div className="botones-acciones">
                  <button className="boton-editar" onClick={() => manejarEditar(juego)}>
                    Editar
                  </button>
                  <button className="boton-eliminar" onClick={() => onEliminar(juego.id)}>
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaVideojuegos;
