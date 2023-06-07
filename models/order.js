import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true }
  }],
  totalPrice: { type: Number, required: true },
  username: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;