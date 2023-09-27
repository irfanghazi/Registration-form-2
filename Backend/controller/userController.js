const { validationResult } = require("express-validator");
const UserModel = require('../model/userModel')
const CountryModel = require('../model/countryModel');
const StateModel = require('../model/StateModel');
const CityModel = require("../model/cityModels")



exports.getAllCountry = async(req, res) => {
    console.log("hittt")
    try {
        const country = await CountryModel.find()
        if(country){
            res.status(200).json({message:'Success', allCountry : country})
        }else{
            res.status(200).json({message:'Data not found'})
        }
    } catch (error) {
        res.status(400).json({message:"Something went wrong"})
    }
}

exports.getSelectedState = async(req, res) => {
    try {
        const _id = req.query._id
        const states = await StateModel.find({country_id :_id})
        res.status(200).json({message:'Success', states})
    } catch (error) {
        
    }
}

exports.getCityByState = async(req, res) => {
    try {
        const _id = req.query
        console.log("eeeeeee", _id)
        const city = await CityModel.find({state_id :_id})
        console.log("wwwwwwwwww", city)
        res.status(200).json({message:'Success', city})
    } catch (error) {
        
    }
}
// exports.getAllCountry()
exports.userRegistration = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const data = req.body
    console.log("first", data)
    const { first_name, last_name, email, country, state, city, gender, dateOfBirth, age } = req.body
    try {
        const user = new UserModel({
            first_name,
            last_name,
            email,
            country,
            state,
            city,
            gender,
            dateOfBirth,
            age,
        });
        await user.save();
        res.status(201).json({ message: 'successfully registered', data: user });
    } catch (error) {
        res.status(400).json({
            error,
            message: "Something went wrong",
        });
    }

}
