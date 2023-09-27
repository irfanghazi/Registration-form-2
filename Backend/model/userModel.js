const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            default: false,
        },
        city: {
            type: String,
            default: false,
        },
        gender: {
            type: String,
          
        },
        dateOfBirth: {
            type: Date,
            default: false,
        },
        age: {
            type: String,
            default: false,
        },
    },
    { timestamps: true }
);

const UserModel = new mongoose.model("UserModel", registerSchema);

module.exports = UserModel;
