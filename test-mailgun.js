const mailgun = require("mailgun-js");
const api_key = '1b55f1ba840b0e3ba742b39f6811bfe1-e51d0a44-705723d4';
const DOMAIN = 'sandbox9f50a03bac7f4d0ea70fd0fe5095b553.mailgun.org';
const mg = mailgun({apiKey: api_key, domain: DOMAIN});

const data = {
  from: 'mailgun@sandbox9f50a03bac7f4d0ea70fd0fe5095b553.mailgun.org',
  to: 'bleung9@gmail.com',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomness!'
};

mg.messages().send(data, function (error, body) {
  console.log(error);
  console.log(body);
});
