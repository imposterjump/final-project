import mongoose from "mongoose";
const Schema = mongoose.Schema;n
const products_schema = new Schema({
    itemName: { type: String, required: true },
    itemID: { type: String  , required: true },
    Sales: { type: Number,required: true },
    description: { type: String,required: true },
    price_before: { type: Number, required: true },
    price_after: { type: Number, required:true},
    type: { type: String , required:true},
    images: [{ type: String,required: true }]
}, { timestamps: true });

const products = mongoose.model('products', products_schema);
export default products;