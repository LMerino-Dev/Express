const { Router } = require("express"); //importacion de express
const router = Router();

router.all("/about", (req, res) => {
  res.send("ABOUT PAGE");
});

router.get("/dashboard", (req, res) => {
  res.send("DASHBOARD PAGE");
});

module.exports = router;
