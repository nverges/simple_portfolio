const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static('public'));


// SEND MAIL route
app.get('/send', function(req, res) {
    
        // Setup nodemailer smtp transport auth
        var smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                    user: 'shimonicampaignmailer',
                    pass: 'shimoni55!'
                }
        });
    
        var mailOptions= {
            to : 'nick.verges@gmail.com',
            name: req.query.name,
            subject : req.query.subject,
            text : req.query.text,
            sender : req.query.sender
         }
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response) {
            if (error) {
            console.log(error);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
         });
    });

    app.get('*', function(req, res) {
        res.sendFile(path.resolve(__dirname + '/public/index.html'));
    })


    app.listen(PORT, function() {
        console.log(`App Listening on PORT: ${PORT}`);
    });