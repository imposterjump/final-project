import mongoose from "mongoose";
const Schema = mongoose.Schema;
const productSchema = new Schema({
    itemName: { type: String },
  
    Sales: { type: Number},
    description: { type: String},
    price_before: { type: Number },
    price_after: { type: Number },
    type: { type: String},
    images: [{ type: String  }]
  });
  
  const Product = mongoose.model('products', productSchema);

export default Product;