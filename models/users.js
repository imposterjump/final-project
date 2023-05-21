import mongoose from "mongoose";
const Schema = mongoose.Schema;
const users_schema = new Schema({
    UserName: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    Type: {
        type: String,
        required: true
    },
}, { timestamps: true });

const users = mongoose.model('users', users_schema);
export default users;