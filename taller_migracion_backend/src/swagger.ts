import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const opciones: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Películas",
      version: "1.0.0",
      description: "Backend migrado a Node.js (Express + TypeScript + Prisma)",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  // Aquí Swagger buscará los comentarios @swagger que pondremos en las rutas
  apis: ["./src/routes/*.ts"],
};

const spec = swaggerJSDoc(opciones);

export function configurarSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));
}