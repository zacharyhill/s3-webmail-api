const s3etm = require('s3-emails-to-mongo');

// MAKE THIS PART DYNAMIC LATER
s3etm.configure({
  Bucket: 'zhillb-mail',
});

module.exports = async (req, res) => {
  try {
    const newMail = await s3etm();
    res.json(newMail);
  } catch(err) {
    net(err);
  }
};