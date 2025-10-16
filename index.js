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
const morgan = require("morgan"); //importacion de morgan

const app = express(); //creacion de la app
app.use(express.json()); // define el tipo de request que va a recibir

//* ------------
//* MiddleWare
//* ------------

//? ____________
//? Logger manual
// app.use((req, res, next) => {
//   console.log(`INFO ROUTE:
//     DATE: [${new Date().toLocaleDateString()}]
//     METHOD: [${req.method}]
//     ROUTE: [${req.url}]
//     BODY: [${JSON.stringify(req.body)}]
//     QUERY: [${JSON.stringify(req.query)}]`);
//   next();
// });

//? ____________
//? Logger morgan
app.use(morgan("dev"));

//* ------------
//* RUTAS
//* ------------
app.get("/test", (req, res) => {
  res.send("TEST PAGE");
});

app.get("/test-two", (req, res) => {
  res.send("TEST-TWO PAGE");
});

app.listen(3000); //puerto de escucha
console.log("Server on port 3000");
