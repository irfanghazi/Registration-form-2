var express = require("express");
var router = express.Router();
const userCtlr = require("../controller/userController");

router.post('/user-registration', userCtlr.userRegistration)
router.get('/get-all-country', userCtlr.getAllCountry)
router.get('/get-country-state', userCtlr.getSelectedState)
router.get('/get-state-city', userCtlr.getCityByState)

module.exports = router;
