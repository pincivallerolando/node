const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

//modulo per il logging delle exception
module.exports = function(){
    winston.handledException(
        new winston.transports.File({filename: 'uncaughtExcpetion.log'}));

    process.on('uncaughtException', (ex)=>{
        throw ex;
    });

    winston.add(winston.transports.File({filename: 'logfile.log'}));
    winston.add(winston.transports.MongoDB, { 
        db: 'mongodb://localhost/exercise-todo',
        level: 'info'
      });  
}