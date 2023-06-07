import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  itemName: { type: String, required: true },
  Sales: { type: Number, required: true },
  description: { type: String ,  required: true },
  price_before: { type: Number  , required: true },
  price_after: { type: Number ,  required: true},
  type: { type: String   ,required: true },
  images: [{ type: String ,  required: true}]
});

const Product = mongoose.model('products', productSchema);

export default Product;
