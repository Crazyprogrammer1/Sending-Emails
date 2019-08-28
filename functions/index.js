const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const mailgun = require("mailgun-js");
const DOMAIN = 'YOUR_DOMAIN';
const api_key = 'YOUR_API_KEY';
const mg = mailgun({apiKey: api_key, domain: DOMAIN});

exports.contactUs = functions.https.onRequest((req,res) => {

    return cors(req, res, () => {  

        var reciepentAddress = req.body.recieveCopy ? req.body.email : 'DEFAULT_RECIEPIENTS_EMAIL';
               
          const data = {
                    from: req.body.email,
                    to: reciepentAddress,
                    subject: req.body.subject,
                    message: req.body.message
            };

            mg.messages().send(data, (error, body) => {
               body ? res.status(200).send('Email Sent Successfullly !') : res.status(500).send(error);
            });
    });
});