//* ------------------------------
//* IMPORTACION DE DEPENDENCIAS
//* ------------------------------
import express from "express";
import { PORT } from "./config.js";
import { UserRepository } from "./user-repository.js";

//* ------------------------------
//* CONFIGURACION DEL SERVIDOR
//* ------------------------------
const app = express();

//* ------------------------------
//* MIDDLEWARES
//* ------------------------------
app.use(express.json());

//* ------------------------------
//* RUTAS (ENDPOINTS)
//* ------------------------------
app.get("/", (req, res) => {
  res.send("<h1>Hola, mundo!</h1>");
});

//? login de usuario
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserRepository.login([username, password]);
    res.status(200).json({ user });
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

app.post("/protected", (req, res) => {});

//* ------------------------------
//* INICIAR EL SERVIDOR
//* ------------------------------
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
