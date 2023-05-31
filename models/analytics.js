import mongoose from "mongoose";
const Schema = mongoose.Schema;
const analytics_schema = new Schema({
    orderno: { type: String, required: true },
    visitors: { type: String  , required: true },
    Sales: { type: Number,required: true },
    ROI: { type: number,required: true },
    unfulfilled: { type: Number, required: true },
    topselling: { type: String , required:true},
}, { timestamps: true });

const analytics = mongoose.model('analytics', analytics_schema);
export default analytics;