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

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/index.html"); //ruta del archivo html
});

app.listen(3000); //puerto de escucha
console.log("Server on port 3000");
