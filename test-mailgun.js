function sendEmail(userEmail, admin_link, participant_link) {  
  const mailgun = require("mailgun-js");
  const api_key = 'a1bf973d5fa8a7a5d63cb26ac216299-e51d0a44-9058a772';
  const DOMAIN = 'sandbox8e7c2926a76f4bbab06525d76094051f.mailgun.org';
  const mg = mailgun({apiKey: api_key, domain: DOMAIN});

  const data = {
    from: 'mailgun@sandbox8e7c2926a76f4bbab06525d76094051f.mailgun.org',
    to: userEmail,
    subject: 'Your Poll Links',
    text: `Admin link: <a href="localhost:8080/a/${admin_link}"></a>. Participant link: <a href="localhost:8080/u/${participant_link}></a>.` 
  };

  mg.messages().send(data, function (error, body) {
    console.log(error);
    console.log(body);
  });
}

module.exports = {sendEmail:sendEmail}
