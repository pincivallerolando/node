const winston = require('winston');

//middleware per gli errori
module.exports = function(err, req, res, next){
    winston.error(err.message, err);
    res.status(500).send('Qualcosa è andato storto.')
}