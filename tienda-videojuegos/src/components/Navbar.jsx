import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-titulo">🎮 Tienda de Videojuegos</h1>
      <div className="navbar-enlaces">
        <Link to="/" className="navbar-link">
          Inventario
        </Link>
        <Link to="/nuevo" className="navbar-link">
          Nuevo Juego
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
