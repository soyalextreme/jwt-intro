const { Router } = require("express");
const router = Router();
const User = require("../models/User");

const jwt = require("jsonwebtoken");
const config = require("../config");

router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    username,
    email,
    password
  });

  //usamos el metodo creado del esquema desde la instancia no desde el objeto
  newUser.password = await newUser.encryptPassword(newUser.password);
  console.log(newUser);
  await newUser.save();

  const token = jwt.sign({ id: newUser._id }, config.secret, {
    expiresIn: 60 * 60 * 24
  });
  res.json({ auth: "true", token: token });
});

router.post("/login", (req, res, next) => {
  res.json({ req: "Login" });
});

router.get("/me", (req, res, next) => {
  res.json({ req: "my data" });
});

module.exports = router;
