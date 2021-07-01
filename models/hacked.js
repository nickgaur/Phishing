const mongoose = require("mongoose");
const { Schema } = mongoose;

const hackedSchema = new Schema({
  user: {
    type: String,
    required: [true],
  },
  password: {
    type: String,
    required: [true],
  },
});

module.exports = mongoose.model("Hacked", hackedSchema);