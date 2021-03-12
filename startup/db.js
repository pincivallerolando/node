const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function(){
    mongoose.connect("mongodb://localhost/exercisetodo")
    .then(()=>winston.info("Connesso al database..."))
}