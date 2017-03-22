const nodemailer = require('nodemailer')

module.exports = (req, res) => {
  console.log(req.body)
  let { groupId, address } = req.body

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'trackmii.noreply@gmail.com',
      pass: 'TrackMiiSupport99$'
    }
  })

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"trackMii - Your Dinamic Geo Tracker" <trackmii.noreply@gmail.com>',
    to: address,
    subject: 'trackMii - New Invitation',
    text: 'You have an invitation to join a trackMii group, this is the password to join it: ' + groupId,
    html: '<b>You have an invitation to join a trackMii group, this is the password to join it: ' + groupId + '</b>'
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message %s sent: %s', info.messageId, info.response)
  })
}
