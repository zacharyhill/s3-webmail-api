const path = require('path');

module.exports = (req, res, next) => {
  const filePath = path.join(__dirname, '..', 'data/uploads', req.params.file);
  res.download(filePath);
}