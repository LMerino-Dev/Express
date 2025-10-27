//* ------------------------------
//* IMPORTACION DE DEPENDENCIAS
//* ------------------------------
import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

import { PORT, SECRET_KEY_JWT } from "./config.js";
import { UserRepository } from "./user-repository.js";

//* ------------------------------
//* CONFIGURACION DEL SERVIDOR
//* ------------------------------
const app = express();

//* ------------------------------
//* MIDDLEWARES
//* ------------------------------
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());

//* ------------------------------
//* RUTAS (ENDPOINTS)
//* ------------------------------
app.get("/", (req, res) => {
  res.send("Welcome to the JWT Auth API");
});

//? login de usuario
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserRepository.login([username, password]);

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      SECRET_KEY_JWT,
      { expiresIn: "1h" }
    ); // generar el token JWT con la informacion del usuario

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true, // evitar acceso desde JavaScript del lado del cliente
        secure: process.env.NODE_ENV === "production", // usar secure cookies en produccion
        sameSite: "strict", // prevenir ataques CSRF
        maxAge: 3600000, // 1 hora
      })
      .json({ user, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

//? registro de usuario
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const id = await UserRepository.create([username, password]);
    res.status(200).json({ id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.post("/logout", (req, res) => {});

app.get("/protected", (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(403).send("Access Denied: No Token Provided!");
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY_JWT);
    req.user = decoded; // Agregar la informacion del usuario al objeto de la solicitud
    res.render("protected", { username: req.user.username });
  } catch (error) {
    return res.status(401).send("Access Denied: Invalid Token!");
  }
});

//* ------------------------------
//* INICIAR EL SERVIDOR
//* ------------------------------
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
