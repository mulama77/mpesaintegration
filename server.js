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
// package used in managing http connections
var http = require('http');

// create an instance of express package
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(morgan('combined', { stream: winston.stream }));



// listen to api requests

///////////////////////////////////////////////////////////
// lipa na mpesa api requests
///////////////////////////////////////////////////////////
app.post('/mpesastkpush', function (req, res) {
    
    // credentials used in executing the mpesa api
    const credentials = {
    client_key: Constants.client_key,
    client_secret: Constants.client_secret,
    initiator_password: Constants.initiator_password,
    certificatepath: Constants.certificatepath
    };
    
    // the mpesa environnment this api is pointing to
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

///////////////////////////////////////////////////////////
// lipanampesa callback. 
// This is a callback from Mpesa informing us
// that a transaction we had earlier initiated has been approved successfully by the customer
///////////////////////////////////////////////////////////
app.post('/stkCallback', function (req, res) {

 winston.log('info', req.body.Body.stkCallback);
 res.end( JSON.stringify(req.body.Body.stkCallback.ResultCode));
 console.log("Waiting for the next request!");
})

///////////////////////////////////////////////////////////
// lipa na mpesa query requests
// This allows us to query Mpesa to check what is the status of a transaction 
// just incase Mpesa took time in sending us a call back after we had earlier initiated a 
// request. Typically we expect a callback not more than 15 seconds. 
///////////////////////////////////////////////////////////
app.post('/mpesastkquery', function (req, res) {
    
  // credentials used in executing the mpesa api
  const credentials = {
  client_key: Constants.client_key,
  client_secret: Constants.client_secret,
  initiator_password: Constants.initiator_password,
  certificatepath: Constants.certificatepath
  };
  
  // the mpesa environnment this api is pointing to
  const environment = Constants.environment;

  // create a new instance of the api
  const mpesa = new Mpesa(credentials, environment);

  // invoking the mpesa api
  mpesa
  .lipaNaMpesaQuery({
    BusinessShortCode: 123456,
    CheckoutRequestID: "Checkout Request ID",
    passKey: "Lipa Na Mpesa Pass Key"
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

///////////////////////////////////////////////////////////
// c2b register
// This API enables Paybill and Buy Goods merchants to 
// integrate to M-Pesa and receive real time payments notifications.
///////////////////////////////////////////////////////////
app.post('/c2bregister', function (req, res) {
    
  // credentials used in executing the mpesa api
  const credentials = {
  client_key: Constants.client_key,
  client_secret: Constants.client_secret,
  initiator_password: Constants.initiator_password,
  certificatepath: Constants.certificatepath
  };
  
  // the mpesa environnment this api is pointing to
  const environment = Constants.environment;

  // create a new instance of the api
  const mpesa = new Mpesa(credentials, environment);

  // invoking the mpesa api
  mpesa
  .c2bregister({
    ShortCode: "Short Code",
    ConfirmationURL: "Confirmation URL",
    ValidationURL: "Validation URL",
    ResponseType: "Response Type"
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

///////////////////////////////////////////////////////////
// c2b simulate
///////////////////////////////////////////////////////////
app.post('/c2bsimulate', function (req, res) {
    
  // credentials used in executing the mpesa api
  const credentials = {
  client_key: Constants.client_key,
  client_secret: Constants.client_secret,
  initiator_password: Constants.initiator_password,
  certificatepath: Constants.certificatepath
  };
  
  // the mpesa environnment this api is pointing to
  const environment = Constants.environment;

  // create a new instance of the api
  const mpesa = new Mpesa(credentials, environment);

  // invoking the mpesa api
  mpesa
  .c2bsimulate({
    ShortCode: 123456,
    Amount: 1000 /* 1000 is an example amount */,
    Msisdn: 254792123456,
    CommandID: "Command ID" /* OPTIONAL */,
    BillRefNumber: "Bill Reference Number" /* OPTIONAL */
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


///////////////////////////////////////////////////////////
// b2c requests
// This API enables the company to send funds to the customer
///////////////////////////////////////////////////////////
app.post('/b2c', function (req, res) {
    
  // credentials used in executing the mpesa api
  const credentials = {
  client_key: Constants.client_key,
  client_secret: Constants.client_secret,
  initiator_password: Constants.initiator_password,
  certificatepath: Constants.certificatepath
  };
  
  // the mpesa environnment this api is pointing to
  const environment = Constants.environment;

  // create a new instance of the api
  const mpesa = new Mpesa(credentials, environment);

  // invoking the mpesa api
  mpesa
  .b2c({
    InitiatorName: "Initiator Name",
    Amount: 1000 /* 1000 is an example amount */,
    PartyA: "Party A",
    PartyB: "Party B",
    QueueTimeOutURL: "Queue Timeout URL",
    ResultURL: "Result URL",
    CommandID: "Command ID" /* OPTIONAL */,
    Occasion: "Occasion" /* OPTIONAL */,
    Remarks: "Remarks" /* OPTIONAL */
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

///////////////////////////////////////////////////////////
// Transaction status
// Transaction Status API checks the status of a B2C and C2B APIs transactions.
///////////////////////////////////////////////////////////
app.post('/b2candc2bTransactionStatus', function (req, res) {
    
  // credentials used in executing the mpesa api
  const credentials = {
  client_key: Constants.client_key,
  client_secret: Constants.client_secret,
  initiator_password: Constants.initiator_password,
  certificatepath: Constants.certificatepath
  };
  
  // the mpesa environnment this api is pointing to
  const environment = Constants.environment;

  // create a new instance of the api
  const mpesa = new Mpesa(credentials, environment);

  // invoking the mpesa api
  mpesa
  .accountBalance({
    Initiator: "Initiator Name",
    PartyA: "Party A",
    IdentifierType: "Identifier Type",
    QueueTimeOutURL: "Queue Timeout URL",
    ResultURL: "Result URL",
    CommandID: "Command ID" /* OPTIONAL */,
    Remarks: "Remarks" /* OPTIONAL */
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

///////////////////////////////////////////////////////////
// Reversal
// Reverses a B2C or C2B M-Pesa transaction.
///////////////////////////////////////////////////////////
app.post('/b2candc2bReversal', function (req, res) {
    
  // credentials used in executing the mpesa api
  const credentials = {
  client_key: Constants.client_key,
  client_secret: Constants.client_secret,
  initiator_password: Constants.initiator_password,
  certificatepath: Constants.certificatepath
  };
  
  // the mpesa environnment this api is pointing to
  const environment = Constants.environment;

  // create a new instance of the api
  const mpesa = new Mpesa(credentials, environment);

  // invoking the mpesa api
  mpesa
  .reversal({
    Initiator: "Initiator",
    TransactionID: "Transaction ID",
    Amount: 1000 /* 1000 is an example amount */,
    ReceiverParty: "Reciever Party",
    ResultURL: "Result URL",
    QueueTimeOutURL: "Queue Timeout URL",
    CommandID: "Command ID" /* OPTIONAL */,
    RecieverIdentifierType: 11 /* OPTIONAL */,
    Remarks: "Remarks" /* OPTIONAL */,
    Occasion: "Ocassion" /* OPTIONAL */
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

///////////////////////////////////////////////////////////
// account balance
// The Account Balance API requests for the account balance of a shortcode.
///////////////////////////////////////////////////////////
app.post('/accountBalance', function (req, res) {
    
  // credentials used in executing the mpesa api
  const credentials = {
  client_key: Constants.client_key,
  client_secret: Constants.client_secret,
  initiator_password: Constants.initiator_password,
  certificatepath: Constants.certificatepath
  };
  
  // the mpesa environnment this api is pointing to
  const environment = Constants.environment;

  // create a new instance of the api
  const mpesa = new Mpesa(credentials, environment);

  // invoking the mpesa api
  mpesa
  .accountBalance({
    Initiator: "Initiator Name",
    PartyA: "Party A",
    IdentifierType: "Identifier Type",
    QueueTimeOutURL: "Queue Timeout URL",
    ResultURL: "Result URL",
    CommandID: "Command ID" /* OPTIONAL */,
    Remarks: "Remarks" /* OPTIONAL */
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
var server = http.createServer(app).listen(Constants.ServerPort, "0.0.0.0" , function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
});

