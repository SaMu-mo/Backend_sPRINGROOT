import "dotenv/config";
import { prisma } from "./database/prisma";

// Genera un "poster" SVG con el titulo, para tener imagenes de ejemplo sin archivos externos
function poster(titulo: string, color: string): Buffer {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="440">
  <rect width="300" height="440" fill="${color}"/>
  <circle cx="150" cy="170" r="70" fill="rgba(255,255,255,0.10)"/>
  <rect x="0" y="360" width="300" height="80" fill="rgba(0,0,0,0.45)"/>
  <text x="150" y="408" fill="#ffffff" font-size="26" font-family="Arial" font-weight="bold" text-anchor="middle">${titulo}</text>
</svg>`;
  return Buffer.from(svg);
}

async function main() {
  // Limpia y vuelve a cargar datos de ejemplo
  await prisma.pelicula.deleteMany();

  await prisma.pelicula.create({
    data: {
      titulo: "Inception",
      director: "Christopher Nolan",
      anio: 2010,
      foto: poster("Inception", "#1f3a5f"),
      mimetype: "image/svg+xml",
    },
  });

  await prisma.pelicula.create({
    data: {
      titulo: "Interstellar",
      director: "Christopher Nolan",
      anio: 2014,
      foto: poster("Interstellar", "#3d2b56"),
      mimetype: "image/svg+xml",
    },
  });

  await prisma.pelicula.create({
    data: {
      titulo: "Matrix",
      director: "Wachowski",
      anio: 1999,
      foto: poster("Matrix", "#14532d"),
      mimetype: "image/svg+xml",
    },
  });

  console.log("Datos de ejemplo insertados correctamente (3 peliculas con imagen).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
