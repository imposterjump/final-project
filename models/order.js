import mongoose from "mongoose";
import { type } from "os";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
    }
  ],
  totalPrice: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  paymentMethod: { type: String, enum: ["cashOnDelivery", "visa"], required: true },
  dateOrdered: {
    type: Date,
    default: Date.now,
},
usernamee: { type: String, required: true }, 
status: {
  type: String,
  required: true,
  default: 'Pending',
},

});

const Order = mongoose.model('Order', orderSchema);

export default Order;
