const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

// routes
app.use(require("./routes/view.js"));
app.use(require("./routes/api.js"));

// app.get("/exercise", (req, res) => {
//   res.sendFile("./public/exercise.html");
// });

// app.get("/stats", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/stats.html"));
// });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
