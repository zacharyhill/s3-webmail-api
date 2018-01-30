module.exports = (req, res) => {
  /*
 ** this will only be reached if our middleware calls
 ** the next() argument - as it does when the token is
 ** set and verified
 */
 res.json({
   verified: true,
 });
}