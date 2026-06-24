import { Link } from 'react-router-dom';

function PaginaNoEncontrada() {
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '80px',
        color: '#ffffff',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <h1 style={{ fontSize: '64px', color: '#6c3ce0', margin: 0 }}>404</h1>
      <p style={{ fontSize: '18px', color: '#a78bfa' }}>
        La página que buscas no existe.
      </p>
      <Link
        to="/"
        style={{
          color: '#ffffff',
          backgroundColor: '#6c3ce0',
          padding: '10px 20px',
          borderRadius: '8px',
          textDecoration: 'none',
          display: 'inline-block',
          marginTop: '16px'
        }}
      >
        Volver al inicio
      </Link>
    </div>
  );
}

export default PaginaNoEncontrada;
