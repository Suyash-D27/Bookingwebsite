const mongoose = require("mongoose");

const monasterySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  location: { type: String, required: true },
  description: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Monastery", monasterySchema);

