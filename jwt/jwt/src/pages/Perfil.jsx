import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/apiConfig";

function Perfil() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const cerrarSesion = async () => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/login");
    }
  };

  return (
    <div className="pantalla">
      <div className="tarjeta centrada">
        <h1>Perfil de Usuario</h1>
        <p className="subtitulo">Bienvenido al sistema protegido por Spring Security</p>
        <p className="dato-usuario">{username}</p>
        <p className="mensaje exito">Autenticado exitosamente</p>
        <button onClick={cerrarSesion}>Cerrar Sesión</button>
      </div>
    </div>
  );
}

export default Perfil;
