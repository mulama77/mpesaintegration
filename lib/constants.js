module.exports = Object.freeze({
    paybill_client_key: 'rHdAnerOAQZI6ADeAWQ746eyYmlJJuUY',
    paybill_client_secret: '66VbkMxWHkGSGOBI',
    paybill_shortcode1: 603085,
    paybill_initiator_name: 'safaricom.g',
    paybill_security_credentials: 'Safaricom3085#',
    paybill_shortcode2: 600000,

    lipanampesa_client_key: 'rHdAnerOAQZI6ADeAWQ746eyYmlJJuUY',
    lipanampesa_client_secret: '66VbkMxWHkGSGOBI',
    lipanampesa_shortcode: 174379,
    lipanampesa_passkey: 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',

    AccountReference: 'Caby',
    TransactionType: 'CustomerPayBillOnline',
    CommandID: "BusinessPayment",
    certificatepath: 'lib/cert.cer',
    environment: 'sandbox', //production
    QueueTimeOutURL: "http://3.122.233.128:8081/stkCallback" ,
    ResultURL: "http://3.122.233.128:8081/c2bregister",
    ServerPort: 8081


});
