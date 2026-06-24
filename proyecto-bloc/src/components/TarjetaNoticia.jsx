import './TarjetaNoticia.css';

function TarjetaNoticia({ info }) {
  return (
    <div className="card">
      <span className="card-id">Noticia #{info.id}</span>
      <h3 className="card-titulo">{info.title}</h3>
      <p className="card-cuerpo">{info.body}</p>
      <button className="card-boton">Leer más</button>
    </div>
  );
}

export default TarjetaNoticia;
