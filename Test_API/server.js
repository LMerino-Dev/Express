//* IMPORTING MODULES
//* ----------------------------------
const express = require("express");
const morgan = require("morgan");

//* SERVER CONFIGURATION
//* ----------------------------------
const app = express();
const port = 3000;
app.use(express.json());

const products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
  { id: 3, name: "Product 3", price: 300 },
  { id: 4, name: "Product 4", price: 400 },
  { id: 5, name: "Product 5", price: 500 },
  { id: 6, name: "Product 6", price: 600 },
  { id: 7, name: "Product 7", price: 700 },
  { id: 8, name: "Product 8", price: 800 },
  { id: 9, name: "Product 9", price: 900 },
  { id: 10, name: "Product 10", price: 1000 },
];

//* MIDDLEWARES
//* ----------------------------------
app.use(morgan("dev"));

//* ROUTES
//* ----------------------------------
app.get("/products", (req, res) => {
  res.json(products);
}); //? List all products

app.post("/products", (req, res) => {
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  res.send(`Product added: ${JSON.stringify(newProduct)}`);
}); //? Add a new product (example body: { "name": "Product 11", "price": 1100})

app.put("/products/:id", (req, res) => {
  const productFound = products.find((p) => p.id === parseInt(req.params.id));
  if (!productFound) return res.status(204).end();
  const index = products.indexOf(productFound);
  const updatedProduct = { ...productFound, ...req.body };
  products[index] = updatedProduct;
  res.send(
    `Product with ID: ${req.params.id} updated to ${JSON.stringify(
      updatedProduct
    )}`
  );
}); //? Update a product by ID (example body: { "name": "Updated Product", "price": 1500})

app.delete("/products/:id", (req, res) => {
  const productFound = products.find((p) => p.id === parseInt(req.params.id));
  if (!productFound) return res.status(204).end();
  const index = products.indexOf(productFound);
  products.splice(index, 1);
  res.send(`Product with ID: ${req.params.id} deleted.`);
}); //? Delete a product by ID

app.get("/products/:id", (req, res) => {
  const productFound = products.find((p) => p.id === parseInt(req.params.id));
  if (!productFound) return res.status(204).end();
  res.send(
    `Product details for ID: ${req.params.id} - ${JSON.stringify(productFound)}`
  );
}); //? Get product details by ID

//* SERVER RUNNING
//* ----------------------------------
app.listen(port);
console.log(`Server running at http://localhost:${port}/`);
