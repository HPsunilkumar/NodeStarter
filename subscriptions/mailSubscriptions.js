var nodemailer = require('nodemailer');

const sendMail = ({ email, subject, html_template }) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'help.mysalescompanion@gmail.com',
      pass: 'salescompanion@1'
    }
  });
  var mailOptions = {
    from: 'help.mysalescompanion@gmail.com',
    to: email,
    subject: subject,
    html: html_template
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    }
    else {
      console.log('Email sent: ' + info.response);
    }
  });
};
module.exports = {
  sendMail
};