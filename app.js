const express = require("express");
const cors = require("cors");
const dbUrl = require("./db");
const router = require("./routes/authRoutes");
const routerNote = require("./routes/noteRoutes");
const path = require("path");
require("dotenv").config();

const app = express();

// middlewares
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(cors());
dbUrl();
app.use("/", router);
app.use("/", routerNote);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Server started at Port:" + process.env.PORT);
});
