import mongoose from "mongoose";
const Schema = mongoose.Schema;
const analytics_schema = new Schema({
    numberoforders: { type: String, required: true },
    numberofvisitorstoday: { type: String  , required: true },
    Sales: { type: Number,required: true },
    registeredusers: { type: number,required: true },
    tobefulfilled: { type: Number, required: true },
    topselling: { type: String , required:true},
}, { timestamps: true });

const analytics = mongoose.model('analytics', analytics_schema);
export default analytics;