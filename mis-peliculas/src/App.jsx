import { useState } from 'react';

function Pelicula({ titulo, esFavorita, onClick }) {
  return (
    <li
      onClick={onClick}
      style={{
        cursor: 'pointer',
        fontSize: '16px',
        padding: '12px 16px',
        backgroundColor: esFavorita ? '#fff8e6' : '#ffffff',
        border: esFavorita ? '1px solid #f0c419' : '1px solid #e0e0e0',
        marginBottom: '10px',
        borderRadius: '8px',
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.2s'
      }}
    >
      <span>{titulo}</span>
      {esFavorita && <span style={{ color: '#f0c419', fontSize: '18px' }}>⭐</span>}
    </li>
  );
}

function App() {
  const [peliculas, setPeliculas] = useState([
    { titulo: 'El Padrino', esFavorita: false },
    { titulo: 'Matrix', esFavorita: false },
    { titulo: 'Inception', esFavorita: false },
    { titulo: 'Interstellar', esFavorita: false }
  ]);

  const [nuevaPelicula, setNuevaPelicula] = useState('');

  function marcarFavorita(indice) {
    const nuevasPeliculas = peliculas.map((pelicula, i) => {
      if (i === indice) {
        return { ...pelicula, esFavorita: !pelicula.esFavorita };
      }
      return pelicula;
    });
    setPeliculas(nuevasPeliculas);
  }

  function agregarPelicula() {
    if (nuevaPelicula.trim() === '') return;
    setPeliculas([...peliculas, { titulo: nuevaPelicula, esFavorita: false }]);
    setNuevaPelicula('');
  }

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '480px',
        margin: '60px auto',
        backgroundColor: '#f5f5f5',
        borderRadius: '16px',
        padding: '32px'
      }}
    >
      <h1 style={{ textAlign: 'center', fontSize: '22px', marginBottom: '24px', color: '#222' }}>
        Mis Películas Favoritas
      </h1>

      <ul style={{ padding: 0, margin: '0 0 24px 0' }}>
        {peliculas.map((pelicula, indice) => (
          <Pelicula
            key={indice}
            titulo={pelicula.titulo}
            esFavorita={pelicula.esFavorita}
            onClick={() => marcarFavorita(indice)}
          />
        ))}
      </ul>

      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={nuevaPelicula}
          onChange={(e) => setNuevaPelicula(e.target.value)}
          placeholder="Nueva película"
          style={{
            flex: 1,
            padding: '10px 12px',
            fontSize: '15px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            outline: 'none'
          }}
        />
        <button
          onClick={agregarPelicula}
          style={{
            padding: '10px 18px',
            fontSize: '15px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#333',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}

export default App;