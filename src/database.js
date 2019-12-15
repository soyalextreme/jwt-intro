const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/intro-jtw", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((db) => console.log("database is connected "));
