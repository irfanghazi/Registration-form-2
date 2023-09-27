const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema(
    {   
        country_id: mongoose.Types.ObjectId,
        country_code:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        code:{
            type: String,
            required:true
        },
    },
    { timestamps: true }
);

const StateModel = new mongoose.model("StateModel", stateSchema);

module.exports = StateModel;
