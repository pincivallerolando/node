const winston = require('winston');
const express = require('express');




//aggiunta perchè avevo problemi con il CORS in quanto ho usato un "proxy" per la connessione
const app = express();

var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Expose-Headers", "x-auth-token");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control, x-auth-token, auth-user");

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
};
app.use(allowCrossDomain);

  

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3080;
app.listen(port, () => winston.info(`In ascolto sulla porta ${port}...`));