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

// ROUTING
// ------------
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(3000); //puerto de escucha
console.log("Server on port 3000");
