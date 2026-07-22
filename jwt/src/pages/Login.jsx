import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/apiConfig";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      const respuesta = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!respuesta.ok) {
        throw new Error("Credenciales incorrectas");
      }
      const data = await respuesta.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      navigate("/perfil");
    } catch (err) {
      setError(err.message === "Failed to fetch" ? "No se pudo conectar con el servidor" : err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="pantalla">
      <div className="tarjeta">
        <h1>Iniciar Sesión</h1>
        <p className="subtitulo">Taller JWT · Spring Boot + React</p>
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
            autoComplete="current-password"
          />
          {error && <p className="mensaje error">{error}</p>}
          <button type="submit" disabled={cargando}>
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
        <p className="enlace-pie">
          ¿No tienes una cuenta? <Link to="/registrar">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
