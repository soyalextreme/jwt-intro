const { Router } = require("express");
const router = Router();
const User = require("../models/User");

const jwt = require("jsonwebtoken");
const config = require("../config");
const verifyToken = require("./verifyToken");

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

router.get("/me", verifyToken, async (req, res, next) => {
  const userFind = await User.findById(req.userId, { password: 0 });
  if (!userFind) {
    res.status(404).json({ status: "user non finded" });
  }
  res.json(userFind);

  res.json({ req: "my data" });
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send("email no registed");
  }
  const validPasswordBool = await user.validatePassword(password);
  if (!validPasswordBool) {
    return res.status(404).json({ auth: "false token null" });
  }

  const token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: 60 * 60 * 24
  });

  res.json({ auth: "true", token });
});

module.exports = router;
