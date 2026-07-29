-- CreateTable
CREATE TABLE "Pelicula" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "anio" INTEGER NOT NULL,
    "foto" BYTEA,
    "mimetype" TEXT,

    CONSTRAINT "Pelicula_pkey" PRIMARY KEY ("id")
);
