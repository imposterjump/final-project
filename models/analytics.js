import mongoose from "mongoose";
const Schema = mongoose.Schema;
const analytics_schema = new Schema({
    numberoforders: { type: Number, required: true },
    numberofordersch: { type: Number, required: true },
    numberofvisitorstoday: { type: String  , required: true },
    numberofvisitorsch: { type: String  , required: true },
    totalSales: { type: Number,required: true },
    totalSalesch: { type: Number,required: true },
    registeredusers: { type: Number,required: true },
    registeredusersch: { type: Number,required: true },
    tobefulfilled: { type: Number, required: true },
    tobefulfilledch: { type: Number, required: true },
    topselling: { type: String , required:true},
}, { timestamps: true });

const analytics = mongoose.model('analytics', analytics_schema);
export default analytics;