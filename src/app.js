const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require("./contollers/auth.controller"));
app.use(require("./routes/userRoutes"));

module.exports = app;
