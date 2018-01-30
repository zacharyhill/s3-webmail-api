const Mail = require('../models/mail');

module.exports = async (req, res, next) => {
  try {
    const allMail = await Mail.find({});
    res.json(allMail);
  } catch(err) {
    next(err); // pass onto next middleware function
  }
}