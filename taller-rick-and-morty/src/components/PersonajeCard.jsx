export default function PersonajeCard({ personaje }) {
  const estadoClase =
    personaje.status === "Alive"
      ? "vivo"
      : personaje.status === "Dead"
      ? "muerto"
      : "desconocido";

  const estadoTexto =
    personaje.status === "Alive"
      ? "Vivo"
      : personaje.status === "Dead"
      ? "Muerto"
      : "Desconocido";

  return (
    <article className="tarjeta">
      <div className="tarjeta-imagen">
        <img src={personaje.image} alt={personaje.name} loading="lazy" />
        <span className={`estado-pill ${estadoClase}`}>
          <span className="punto"></span>
          {estadoTexto}
        </span>
      </div>
      <div className="tarjeta-cuerpo">
        <h2>{personaje.name}</h2>
        <dl className="datos">
          <div className="dato">
            <dt>Especie</dt>
            <dd>{personaje.species}</dd>
          </div>
          <div className="dato">
            <dt>Género</dt>
            <dd>{personaje.gender}</dd>
          </div>
          <div className="dato">
            <dt>Origen</dt>
            <dd>{personaje.origin.name}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
