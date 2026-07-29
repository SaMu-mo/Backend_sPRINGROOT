// URL del backend de Node.js (antes apuntaba a Java en el puerto 8080)
const API = "http://localhost:3000";

// Inicia sesion y devuelve el token JWT
export async function login() {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario: "admin", password: "admin123" }),
  });
  const data = await res.json();
  return data.token;
}

// Trae todas las peliculas (protegido con token)
export async function obtenerPeliculas(token) {
  const res = await fetch(`${API}/auth/peliculas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

// Elimina una pelicula por id (protegido con token)
export async function eliminarPelicula(id, token) {
  const res = await fetch(`${API}/auth/peliculas/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.status;
}
