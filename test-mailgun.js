function sendEmail(userEmail, admin_link, participant_link) {  
  const mailgun = require("mailgun-js");
  const api_key = '8f99504a1307b48bd3e0ab1a2e8444e8-e51d0a44-f0897a36';
  const DOMAIN = 'sandboxb9cce0deafc74d0ca9548d503a524d1e.mailgun.org';
  const mg = mailgun({apiKey: api_key, domain: DOMAIN});

  const data = {
    from: 'mailgun@sandboxb9cce0deafc74d0ca9548d503a524d1e.mailgun.org',
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
