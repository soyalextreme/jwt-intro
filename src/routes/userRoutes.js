const { Router } = require("express");
const hwRotes = Router();

const Homework = require("../models/Homework");

const verifyToken = require("../contollers/verifyToken");

hwRotes.get("/homework/:id", verifyToken, (req, res) => {
  res.send("ALL MY HOMEWORKS");
});

module.exports = hwRotes;
