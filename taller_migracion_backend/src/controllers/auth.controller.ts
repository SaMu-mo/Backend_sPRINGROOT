import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "mi_secreto_super_seguro";

// Login simple: valida un usuario fijo y devuelve un token JWT
export const login = (req: Request, res: Response) => {
  const { usuario, password } = req.body;

  if (usuario === "admin" && password === "admin123") {
    const token = jwt.sign({ usuario }, JWT_SECRET, { expiresIn: "2h" });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ error: "Credenciales invalidas" });
  }
};
