const s3etm = require('s3-emails-to-mongo');

// MAKE THIS PART DYNAMIC LATER
s3etm.configure({
    Bucket: 'zhillb-mail',
});

module.exports = async (req, res, next) => {
  try {
    const newMail = await s3etm();
    res.json({
      new: newMail.length,
      emails: newMail,
    });
  } catch(err) {
      next(err);
  }
};