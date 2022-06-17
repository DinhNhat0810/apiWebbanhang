const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true , unique: true},
    desc: { type: String, required: true },
    img: { type: String, required: true },
    subImg: { type: String },
    categories: { type: Array },
    size: { type: Array },
    price: { type: Number, required: true },
    discount: { type: Number },
    rate: { type: Number, default: 0 },
    sold : { type: Number, default: 0 }
  },

  { timestamps: true }
);


ProductSchema.index({title: 'text'})

const Product = mongoose.model('Product', ProductSchema)

Product.createIndexes({title: 'text'})

module.exports = {Product}

