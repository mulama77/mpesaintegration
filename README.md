## Credentials

You Will need a few things from Safaricom before development.

1.  Consumer Key
2.  Consumer Secret
3.  Test Credentials for Development/Sanbox environment

- Login or Register as a Safaricom developer [here](https://developer.safaricom.co.ke/login-register) if you haven't.
- Add a new App [here](https://developer.safaricom.co.ke/user/me/apps)
- You will be issued with a Consumer Key and Consumer Secret. You will use these to initiate an Mpesa Instance.
- Obtain Test Credentials [here](https://developer.safaricom.co.ke/test_credentials).
  - The Test Credentials Obtained Are only valid in Sandbox/Development environment. Take note of them.
  - To run in Production Environment you will need real Credentials.
    - To go Live and be issued with real credentials,please refer to [this guide](https://developer.safaricom.co.ke/docs?javascript#going-live)
    
## Prerequisites
Ensure you have this installed before proceeding further
- Node v6+, 8+ recommended.  
- npm 5 or above,  
- git client, 
- Any console emulater or terminal

## About
This is a Node.js application with a RESTfull service implementation.
The goal of the project is to 
- Consume Safaricom M-Pesa APIs (https://developer.safaricom.co.ke/docs#introduction)

Ready Methods

- [ ] C2BSIMULATE
- [ ] B2B
- [ ] C2B
- [ ] B2C
- [ ] TRANSACTION STATUS
- [ ] ACCOUNT BALANCE
- [ ] REVERSAL
- [x] LIPA NA MPESA

### Getting started
```bash
# Clone the repo
git clone https://github.com/mulama77/mpesaintegration.git
```
### Installing nodejs packages
```bash
# Navigate to mpesaintegration/
cd mpesaintegration
#Then install node packages
npm install
```
### Start the API
```bash
# Before starting the API, ensure port 8081 is not being used.
# incase the port is being used, run the below command on linux
kill -9 $(lsof -t -i:8081)
# Then navigate to mpesaintegration/
# Then start the listener
npm run start
# port and other configurations for API server are in [./lib/constants.js]
# Thats it, the api is ready
```

### Accessing Application
Cpmponent         | URL                                      | Credentials
---               | ---                                      | ---
API (backend)     |  http://localhost:8081/mpesastkpush      | 

**Use any rest client application i.e. postman or install curl. (Below example uses curl)**
The below request will invoke the lipa na mpesa api when the correct parameters are used. Mpesa will then send an stkpush to the user's phone for authorization.
**N/B Please ensure a valid Safaricom phone number is used.**
```bash
#request POST application/x-www-form-urlencoded
curl -X POST --header 'Accept: application/json' --header "Content-Type: application/x-www-form-urlencoded" -d "Amount=10&PhoneNumber=2547xxxxxxxx&TransactionDesc=Cabpayment" 'http://localhost:8081/mpesastkpush'
#or POST application/json
curl -X POST --header 'Accept: application/json' --header "Content-Type: application/json" -d '{"Amount":"10", "PhoneNumber":"2547xxxxxxxx", "TransactionDesc":"Cabpayment"}' 'http://localhost:8081/mpesastkpush'

**N/B The application has already been deployed in the below dev server ip: 3.122.233.128**

#response
{"MerchantRequestID":"18438-5831326-1","CheckoutRequestID":"ws_CO_DMZ_540072342_20072019060327336","ResponseCode":"0","ResponseDescription":"Success. Request accepted for processing","CustomerMessage":"Success. Request accepted for processing"}
```

## Licensing
This project is licensed under MIT license. 
