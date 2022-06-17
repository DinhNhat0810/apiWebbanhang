const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    img: { type: String },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema)