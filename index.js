// *-------------------------------------------------
// *CREACION DE UN SERVIDOR BASICO EN NODEJS
// *-------------------------------------------------

// // Importacion de modulos node
// const http = require("http");
// const fs = require("fs");

// // Creacion del servidor
// const server = http.createServer((req, res) => {
//   const read = fs.createReadStream("./static/index.html");
//   read.pipe(res);
// });

// server.listen(3000);
// console.log("Server on port 3000");

// *-------------------------------------------------
// *CREACION DE UN SERVIDOR CON EXPRESS
// *-------------------------------------------------

const express = require("express"); //importacion de express
const app = express(); //creacion de la app

// METODOS HTTP
// ------------
app.get("/products", (req, res) => {
  res.send("GET Products");
});

app.post("/products", (req, res) => {
  res.send("POST Products");
});

app.put("/products", (req, res) => {
  res.send("PUT Products");
});

app.delete("/products", (req, res) => {
  res.send("DELETE Products");
});

app.patch("/products", (req, res) => {
  res.send("PATCH Products");
});

app.listen(3000); //puerto de escucha
console.log("Server on port 3000");
