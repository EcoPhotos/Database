const mongoose = require("mongoose");

const ExampleSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model("Example", ExampleSchema);
