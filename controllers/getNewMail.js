const s3etm = require('s3-emails-to-mongo');

module.exports = async (req, res) => {
  try {
    const newMail = await s3etm();
    res.json(newMail);
  } catch(err) {
    net(err);
  }
};