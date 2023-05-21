import mongoose from "mongoose";
const Schema = mongoose.Schema;
const products_schema = new Schema({
    itemName: { type: String, required: true },
    itemID: { type: String  , required: true },
    Sales: { type: Number,required: true },
    description: { type: String,required: true },
    price: { type: Number, required: true },
    type: { type: String , required:true},
    images: [{ type: String,required: true }]
}, { timestamps: true });

const products = mongoose.model('products', products_schema);
export default products;