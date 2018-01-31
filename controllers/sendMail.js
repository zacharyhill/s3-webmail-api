const AWS = require('aws-sdk');

const credentials = new AWS.SharedIniFileCredentials({
    profile: 'default'
});
AWS.config.credentials = credentials;
AWS.config.update({
    region: 'us-west-2',
});
const ses = new AWS.SES({ apiVersion: '2010-12-01' });


module.exports = async (req, res, next) => {
  try {
    const from = 'zach@zacharyhill.xyz'; // make this dynamic later
    const to = [req.body.to];
    const cc = (req.body.cc) ? [req.body.cc] : [];
    const bcc = (req.body.bcc) ? [req.body.bcc] : [];
    const email = {
      Source: from,
      Destination: {
        ToAddresses: to,
        CcAddresses: cc,
        BccAddresses: bcc,
      },
      Message: {
        Subject: {
          Data: req.body.subject,
        },
        Body: {
          Text: {
            Data: req.body.text,
          }
        }
      }
    }
    const sentEmail = await ses.sendEmail(email).promise();
    res.json({
      sent: true,
      messageId: sentEmail.MessageId,
    });
  } catch(err) {
    next(err);
  }
};
