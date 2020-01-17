const { Schema, model } = require("mongoose");

const homeworkSchema = new Schema({
  title: { type: String, required: true, max: 8 },
  description: { type: String, required: true, max: 50 },
  dateEnd: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  done: { type: Boolean, default: false, require: false }
});

module.exports = model("Homework", homeworkSchema);
