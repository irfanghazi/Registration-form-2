const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
    {
        country_id: mongoose.Types.ObjectId,
        state_id: mongoose.Types.ObjectId,

        countryCode: {
            type: String,
            required: true
        },
        stateCode: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const CityModel = new mongoose.model("CityModel", citySchema);

module.exports = CityModel;
