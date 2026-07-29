# Backend - Catalogo de Peliculas (Node + Express + TypeScript + Prisma)

## Pasos para correr
1. npm install
2. npm install prisma@6 @prisma/client@6   (asegura Prisma 6)
3. Crear la base "peliculas_db" en pgAdmin.
4. Revisar el archivo .env (usuario/contraseña de PostgreSQL).
5. npx prisma migrate dev --name init     (crea la tabla)
6. npm run seed                            (carga 3 peliculas de ejemplo con imagen)
7. npm run dev                             (enciende el servidor en http://localhost:3000)

## Login de prueba
usuario: admin
password: admin123
