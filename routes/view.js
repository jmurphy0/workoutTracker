// html endpoints:
// /exercise GET
// /stats GET
const router = require("express").Router();
//const { get } = require("http");
const path = require("path");
// create the read path to index.html
router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/exercise.html"));
});
// create the read path to stats.html
router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router;
