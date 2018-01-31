const Mail = require('../models/mail');

module.exports = async (req, res, next) => {
  try {
    const readStatus = req.params.read;
    const id = req.params.id;
    const mail = await Mail.findByIdAndUpdate(id, { read: readStatus });
    // mail.read = readStatus;
    // const response = await mail.save();
    res.json(mail);
  }
  catch(err) {
    next(err);
  }
};