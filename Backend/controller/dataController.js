const fs = require('fs-extra');
const CountryModel = require('../model/countryModel');
const StateModel = require('../model/StateModel');
const CityModel = require("../model/cityModels")

const insertData = async () => {
    try {

        // inserting country
        const countriesData = await fs.readJson('country.json');
        countriesData.map(async (ele) => {
            await CountryModel.insertMany({ name: ele.name, code: ele.code })
        })
        
        // inserting state
        const stateData = await fs.readJson('state.json')
        stateData.map(async(state) => {
            const countryData = await CountryModel.findOne({code: state.countryCode})
            if(countryData){
                await StateModel.insertMany({name:state.name, code: state.code, country_id: countryData._id, country_code: state.countryCode})
            }
        })

        // inserting city
        const cityData = await fs.readJson('city.json')
        cityData.map(async(city) => {
            const stateData = await StateModel.findOne({code:city.stateCode})
            if(stateData){
                await CityModel.insertMany({name: city.name, stateCode: city.stateCode,countryCode: city.countryCode, country_id:stateData.country_id, state_id: stateData._id })
            }
        })
    } catch (error) {
        console.error(error);
    }
}

// insertData()