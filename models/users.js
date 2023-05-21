import mongoose from "mongoose";
const Schema = mongoose.Schema;
const users_schema = new Schema({
    username: {
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

    type: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true

    },
}, { timestamps: true });

const users = mongoose.model('users', users_schema);
export default users;