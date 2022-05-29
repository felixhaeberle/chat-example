const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "Sokcet.io server is live" }).status(200);
});

module.exports = router;