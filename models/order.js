import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
  
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
      
    paymentMethod: {
        type: String,
        required: true
    },
    itemsPrice: {
        type: Number,
        required: true
    },
    shippingPrice: {
        type: Number,
        required: true
    },
   
    totalPrice: {
        type: Number,
        required: true
    },
   
   
    isDelivered: {
        type: Boolean,
        default: false
    },
    
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
