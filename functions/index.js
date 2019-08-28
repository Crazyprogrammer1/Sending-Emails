const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const mailgun = require("mailgun-js");
const DOMAIN = 'www.stylemirror.in';
const api_key = 'key-e587290afb3907443663f648060b4b86';
const mg = mailgun({apiKey: api_key, domain: DOMAIN});

exports.contactUs = functions.https.onRequest((req,res) => {

    return cors(req, res, () => {  

        var reciepentAddress = req.body.recieveCopy ? req.body.email : 'abdulrauf76143@gmail.com';
                const data = {
                from: 'Angular Geeks <abdulrauf76143@gmail.com>',
                to: reciepentAddress,
                subject: 'Your copy of Mail is here !',
                template: "email-demo",
                "v:name": req.body.name,
                "v:email": req.body.email,
                "v:mobile": req.body.mobileNumber,
                "v:city": req.body.city,
                "v:message": req.body.message
            };

            mg.messages().send(data, (error, body) => {
               body ? res.status(200).send('Email Sent Successfullly !') : res.status(500).send(error);
            });
    });
});