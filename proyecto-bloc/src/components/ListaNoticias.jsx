import { useState, useEffect } from 'react';
import TarjetaNoticia from './TarjetaNoticia';
import './ListaNoticias.css';

function ListaNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        setNoticias(data.slice(0, 12));
        setCargando(false);
      })
      .catch((error) => {
        console.error('Error fetching:', error);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p className="mensaje-carga">Cargando noticias...</p>;
  }

  return (
    <div className="grid-noticias">
      {noticias.map((noticia) => (
        <TarjetaNoticia key={noticia.id} info={noticia} />
      ))}
    </div>
  );
}

export default ListaNoticias;
