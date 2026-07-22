import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/apiConfig";

function Registrar() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("USER");
  const [exito, setExito] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");
    setCargando(true);
    try {
      const respuesta = await fetch(`${API_BASE_URL}/auth/registrar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, rol }),
      });
      if (respuesta.status === 201) {
        setExito("Usuario registrado con éxito. Redirigiendo al login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        const texto = await respuesta.text();
        throw new Error(texto || "No se pudo registrar el usuario");
      }
    } catch (err) {
      setError(err.message === "Failed to fetch" ? "No se pudo conectar con el servidor" : err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="pantalla">
      <div className="tarjeta">
        <h1>Crear Cuenta</h1>
        <p className="subtitulo">Regístrate para acceder al sistema</p>
        <form onSubmit={manejarSubmit}>
          <label htmlFor="username">Nombre de usuario</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <label htmlFor="rol">Rol en el sistema</label>
          <select id="rol" value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          {exito && <p className="mensaje exito">{exito}</p>}
          {error && <p className="mensaje error">{error}</p>}
          <button type="submit" disabled={cargando}>
            {cargando ? "Registrando..." : "Registrarse"}
          </button>
        </form>
        <p className="enlace-pie">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Registrar;
