function sendEmail(userEmail, admin_link, participant_link) {  
  const mailgun = require("mailgun-js");
  const api_key = 'ea5ae1f5025219eddf957bc4fbe14806-e51d0a44-41b79a83';
  const DOMAIN = 'sandbox58be632dee7f45dc834070a88856e971.mailgun.org';
  const mg = mailgun({apiKey: api_key, domain: DOMAIN});

  const data = {
    from: 'mailgun@sandbox58be632dee7f45dc834070a88856e971.mailgun.org',
    to: 'lhlmidterm2019@gmail.com',
    subject: 'Your Poll Links',
    html: `Admin link: <html><a href="http://localhost:8080/a/${admin_link}">${admin_link}</a> Participant link: <a href="http://localhost:8080/u/${participant_link}">${participant_link}</a></html>.` 
  };

  mg.messages().send(data, function (error, body) {
    console.log(error);
    console.log(body);
  });
}

module.exports = {sendEmail:sendEmail}
