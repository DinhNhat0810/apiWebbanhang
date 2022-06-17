const mongoose = require("mongoose")

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    img: { type: String, default :"https://thinkzone.vn/uploads/2022_01/blogging-1641375905.jpg" },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema)