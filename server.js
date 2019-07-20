// package used in creating this rest api in nodejs
var express = require('express');
// package used to invoke mpesa api's
const Mpesa = require("mpesa-api").Mpesa;
// used in storing the constant variables
var Constants = require('./lib/constants');
// package used in parsing the payloads
var bodyParser = require('body-parser');
// used for application logging for later troubleshooting
var morgan = require('morgan');
var winston = require('./lib/winston');
// create an instance of express package
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(morgan('combined', { stream: winston.stream }));

// listen to api requests
app.post('/mpesastkpush', function (req, res) {
    
    // credentials used in executing the mpesa api
    const credentials = {
    client_key: Constants.client_key,
    client_secret: Constants.client_secret,
    initiator_password: Constants.initiator_password,
    certificatepath: Constants.certificatepath
    };
    
    // the mpesa enrironment this api is pointing to
    const environment = Constants.environment;

    // create a new instance of the api
    const mpesa = new Mpesa(credentials, environment);
  
    // invoking the mpesa api
    mpesa
    .lipaNaMpesaOnline({
    BusinessShortCode: Constants.BusinessShortCode,
    Amount: req.body.Amount, 
    PartyA: req.body.PhoneNumber,
    PartyB: Constants.PartyB,
    PhoneNumber: req.body.PhoneNumber,
    CallBackURL: Constants.CallBackURL,
    AccountReference: Constants.AccountReference,
    passKey: Constants.passKey,
    TransactionType: Constants.TransactionType, // OPTIONAL 
    TransactionDesc: req.body.TransactionDesc // OPTIONAL 
    })
    .then(response => {
    //Do something with the response
    //eg
    console.log(response);
    /*
    logger.log({
        level: 'info',
        message: response
      }); */
    res.end( JSON.stringify(response));
    })
    .catch(error => {
    //Do something with the error;
    //eg
    console.error("ERROR"+error);
    /*logger.log({
        level: 'error',
        message: error
      }); */
    res.end( JSON.stringify(error));
    });
    
   console.log("Waiting for the next request!");
})

  //server listener
var server = app.listen(Constants.ServerPort, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})

