const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  username: String,
  email: String,
  password: String
});

//extendiendo el schema para usar los metodos
//creando una funcion anonima para encripar
userSchema.methods.encryptPassword = async (password) => {
  //salt cantidad de veces que va a aplicar el algoritmo
  const salt = await bcrypt.genSalt(10);
  // hash recibe el salt y el password para encryptar
  return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = model("User", userSchema);
