const Mail = require('../models/mail');

module.exports = async (req, res, next) => {
  try {
    const deletedMail = await Mail.findByIdAndRemove(req.params.id);
    res.json({
      deleted: deletedMail._id,
    });
  } catch(err) {
    next(err); // pass onto next middleware function
  }
}