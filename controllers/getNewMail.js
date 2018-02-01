const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const s3etm = require('s3-emails-to-mongo');
const writeFileAsync = promisify(fs.writeFile);

// MAKE THIS PART DYNAMIC LATER
s3etm.configure({
    Bucket: 'zhillb-mail',
});

module.exports = async (req, res, next) => {
  try {
    const newMail = await s3etm();
    // check if new mail has attachment(s), if so save them
    await Promise.all(newMail.map((msg) => {
      if (msg.attachments.length) {
        return Promise.all(msg.attachments.map((attachment) => {
          const file = attachment.content;
          const cid = attachment.cid;
          const filePath = path.join(__dirname, '..', 'data/uploads', cid);
          return writeFileAsync(filePath, file).catch((err) => {
              throw err;
          });
        }));
      }
    }));
    res.json({
      new: newMail.length,
    });
  } catch(err) {
      next(err);
  }
};